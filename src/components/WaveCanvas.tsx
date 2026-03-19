import { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute float a_opacity;
  attribute float a_size;
  varying float v_opacity;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = a_size;
    v_opacity = a_opacity;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying float v_opacity;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    float alpha = smoothstep(0.5, 0.1, dist) * v_opacity;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const PARTICLE_COUNT = 3800;
const WAVE_SPEEDS   = [0.00028, 0.00042, 0.00035, 0.00018];
const AMPLITUDES    = [0.10,   0.07,   0.06,   0.09];
const FREQUENCIES   = [1.2,   2.1,   1.7,   2.8];
const NUM_WAVES     = 4;

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;
    const program = createProgram(gl, vs, fs);
    if (!program) return;

    const posLoc  = gl.getAttribLocation(program, 'a_position');
    const opLoc   = gl.getAttribLocation(program, 'a_opacity');
    const sizeLoc = gl.getAttribLocation(program, 'a_size');

    const posBuf  = gl.createBuffer();
    const opBuf   = gl.createBuffer();
    const sizeBuf = gl.createBuffer();

    // Seeded random so layout is stable across frames
    const seed = (s: number) => () => {
      s = Math.sin(s) * 43758.5453123;
      return s - Math.floor(s);
    };
    const rand = seed(42);

    // Pre-assign each particle to a wave index and a base x in [0,1]
    const particleWave   = new Uint8Array(PARTICLE_COUNT);
    const particleX      = new Float32Array(PARTICLE_COUNT);
    const particleXOffset = new Float32Array(PARTICLE_COUNT);  // slight spread along x
    const particleYNoise  = new Float32Array(PARTICLE_COUNT);  // perpendicular jitter
    const particleBaseOp  = new Float32Array(PARTICLE_COUNT);
    const particleSize    = new Float32Array(PARTICLE_COUNT);
    const particlePhase   = new Float32Array(PARTICLE_COUNT);  // per-particle drift phase

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particleWave[i]    = Math.floor(rand() * NUM_WAVES);
      particleX[i]       = rand();
      particleXOffset[i] = (rand() - 0.5) * 0.012;  // tiny x spread
      particleYNoise[i]  = (rand() - 0.5) * 0.022;  // perpendicular scatter
      particleBaseOp[i]  = 0.12 + rand() * 0.28;    // 0.12 – 0.40
      particleSize[i]    = 0.8 + rand() * 1.6;       // 0.8 – 2.4 px
      particlePhase[i]   = rand() * Math.PI * 2;
    }

    const positions = new Float32Array(PARTICLE_COUNT * 2);
    const opacities  = new Float32Array(PARTICLE_COUNT);
    const sizes      = new Float32Array(PARTICLE_COUNT);

    let animId: number;

    const render = (now: number) => {
      const t = now;

      const dw = canvas.clientWidth;
      const dh = canvas.clientHeight;
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width  = dw;
        canvas.height = dh;
        gl.viewport(0, 0, dw, dh);
      }

      gl.clearColor(15 / 255, 15 / 255, 15 / 255, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);   // additive — brighter where waves overlap

      gl.useProgram(program);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const wi  = particleWave[i];
        const px  = particleX[i] + particleXOffset[i];
        const nx  = px * 12.0;   // same x scale as original

        const waveY = Math.sin(nx * FREQUENCIES[wi] + t * WAVE_SPEEDS[wi]) * AMPLITUDES[wi];

        // Slow per-particle vertical drift to make the cloud feel alive
        const drift = Math.sin(t * 0.00008 + particlePhase[i]) * 0.006;

        const clipX = px * 2.0 - 1.0;
        const clipY = (0.5 + waveY + particleYNoise[i] + drift) * 2.0 - 1.0;

        positions[i * 2]     = clipX;
        positions[i * 2 + 1] = clipY;

        // Opacity pulses slightly with time for shimmer
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.0006 + particlePhase[i] * 3.1);
        opacities[i] = particleBaseOp[i] * (0.7 + 0.3 * pulse);
        sizes[i]     = particleSize[i];
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, opBuf);
      gl.bufferData(gl.ARRAY_BUFFER, opacities, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(opLoc);
      gl.vertexAttribPointer(opLoc, 1, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(sizeLoc);
      gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(opBuf);
      gl.deleteBuffer(sizeBuf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: '#0f0f0f' }}
    />
  );
}
