import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground film-grain">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-serif italic tracking-tighter">404</h1>
        <p className="text-muted-foreground mb-8">Agent disconnected. Sector not found.</p>
        <Link href="/" className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
