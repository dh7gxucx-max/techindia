import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Search, Phone, Tablet, Laptop, Headphones, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "Mobiles", href: "/catalog?category=Smartphones", icon: <Phone className="w-4 h-4" /> },
    { name: "Laptops", href: "/catalog?category=Laptops", icon: <Laptop className="w-4 h-4" /> },
    { name: "Audio", href: "/catalog?category=Audio", icon: <Headphones className="w-4 h-4" /> },
    { name: "Accessories", href: "/catalog?category=Accessories", icon: <Tablet className="w-4 h-4" /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleNavClick = (href: string) => {
  console.log("Клик по навигации, href:", href);
  window.location.href = href;  // ← ЭТА строка вместо setLocation(href)
  setIsMenuOpen(false);
};

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer">
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              INTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/auth">
              <button className="hidden sm:flex p-2 text-muted-foreground hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </button>
            </Link>

            <Link href="/cart">
              <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary rounded-full ring-2 ring-background">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-card border-b border-white/10 p-4"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-2">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..." 
                className="bg-background/50 border-white/10 focus:border-primary"
                autoFocus
              />
              <Button type="submit">Search</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 cursor-pointer"
                >
                  {link.icon}
                  {link.name}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link href="/auth">
                  <div 
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-white/5 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Login / Register
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
