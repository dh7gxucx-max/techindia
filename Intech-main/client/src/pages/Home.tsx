import { useProducts, useSeedProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Truck, ShieldCheck, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading } = useProducts({ sort: 'popular' });
  const { mutate: seed, isPending: isSeeding } = useSeedProducts();

const categories = [
  { name: 'Smartphones', image: 'https://s5.stc.all.kpcdn.net/expert/wp-content/uploads/2021/08/shutterstock_1736005427-960x540.jpg' },
  { name: 'Laptops', image: 'https://i.rtings.com/assets/pages/KSgFV72t/best-laptops-for-working-from-home-20250522-medium.jpg' },
  { name: 'Audio', image: 'https://cdn.thewirecutter.com/wp-content/media/2025/09/BEST-WIRELESS-WIRED-HEADSETS-8962.jpg' },
  { name: 'Accessories', image: 'https://www.xcom-shop.ru/upload/medialibrary/17e/hh2w6g7lq4k1y341aortxg90tz6jh1vs/1.jpg' },
];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Hero background: futuristic tech abstract */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary font-medium text-sm mb-6 backdrop-blur-sm">
              New Arrival: Horizon Series
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              Future Tech <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                In Your Hands
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Experience the cutting edge of technology. Best prices on smartphones, laptops, and premium audio gear in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <Button size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders over ₹5000" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: Clock, title: "Fast Delivery", desc: "2-3 business days across India" },
              { icon: Zap, title: "Official Warranty", desc: "Original manufacturer warranty" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
            <Link href="/catalog">
              <span className="text-primary hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors">
                View All <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/catalog?category=${cat.name}`}>
                <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                    <span className="text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Trending Now</h2>
            <p className="text-muted-foreground">Top selling products selected for you</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

    
​
<footer className="border-t border-neutral-800 bg-black/40">
  <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
      {/* Brand */}
      <div>
        <h3 className="text-lg font-semibold tracking-[0.25em]">
          INTECH
        </h3>
        <p className="mt-3 max-w-xs text-sm text-neutral-400">
          Your premier destination for high-end electronics and gadgets.
          Bringing the future of technology to your doorstep.
        </p>
      </div>

      {/* Shop */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-200">Shop</h4>
        <ul className="mt-3 space-y-2 text-sm text-neutral-400">
          <li>
            <Link
              href="/catalog?category=Smartphones"
              className="transition hover:text-white"
            >
              Smartphones
            </Link>
          </li>
          <li>
            <Link
              href="/catalog?category=Laptops"
              className="transition hover:text-white"
            >
              Laptops
            </Link>
          </li>
          <li>
            <Link
              href="/catalog?category=Audio"
              className="transition hover:text-white"
            >
              Audio
            </Link>
          </li>
          <li>
            <Link
              href="/catalog?category=Accessories"
              className="transition hover:text-white"
            >
              Accessories
            </Link>
          </li>
        </ul>
      </div>

<div> {/* Support */}
  <h4 className="text-sm font-semibold text-neutral-200">Support</h4>
  <ul className="mt-3 space-y-2 text-sm text-neutral-400">
    <li><Link to="/contact" className="transition hover:text-white block">Contact Us</Link></li>
    <li><Link to="/faqs" className="transition hover:text-white block">FAQs</Link></li>
    <li><Link to="/shipping-returns" className="transition hover:text-white block">Shipping & Returns</Link></li>
    <li><Link to="/warranty" className="transition hover:text-white block">Warranty Policy</Link></li>
  </ul>
</div>

      {/* Newsletter */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-200">
          Newsletter
        </h4>
        <p className="mt-3 text-sm text-neutral-400">
          Subscribe for latest updates and offers.
        </p>
        <form className="mt-4 flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>

    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row">
      <p>© 2024 Intech Electronics. All rights reserved.</p>
      <div className="flex gap-4">
        <Link href="/privacy" className="transition hover:text-white">
          Privacy Policy
        </Link>
        <Link href="/terms" className="transition hover:text-white">
          Terms of Service
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}
