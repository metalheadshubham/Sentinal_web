export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[13px] font-medium tracking-wide">
        <div className="text-muted-foreground mb-4 md:mb-0">
          Made by Shubham
        </div>
        <a 
          href="https://github.com/metalheadshubham/Sentinal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
