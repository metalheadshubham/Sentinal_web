import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Council } from "@/components/sections/Council";
import { Process } from "@/components/sections/Process";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground film-grain relative">
      <Navbar />
      <main>
        <Hero />
        <Council />
        <Process />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
