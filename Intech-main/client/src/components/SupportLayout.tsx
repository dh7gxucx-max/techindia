import React from "react";  // ← КЛЮЧЕВОЙ ИМПОРТ!
import { Link, useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";

const supportPages = [
  { path: "/contact", name: "Contact Us" },
  { path: "/faqs", name: "FAQs" },
  { path: "/shipping-returns", name: "Shipping & Returns" },
  { path: "/warranty", name: "Warranty Policy" },
  { path: "/privacy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms of Service" },
];

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex-grow flex max-w-6xl mx-auto px-6 py-8 gap-8">
        <nav className="w-64 flex-shrink-0 hidden md:block">
          <h3 className="font-semibold text-lg mb-6 text-foreground">Support</h3>
          <ul className="space-y-2">
            {supportPages.map((page) => (
              <Link 
                key={page.path}
                href={page.path}
                className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                  location === page.path 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {page.name}
              </Link>
            ))}
          </ul>
        </nav>
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Ваш footer контент */}
        </div>
      </footer>
    </div>
  );
}
