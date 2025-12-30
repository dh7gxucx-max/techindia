import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Catalog() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    search: initialSearch,
    sort: 'popular' as const
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with URL params on mount/change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters(prev => ({
      ...prev,
      category: params.get("category") || "",
      search: params.get("search") || "",
    }));
  }, [location]);

  const { data: products, isLoading } = useProducts(filters);

  const categories = ["Smartphones", "Laptops", "Audio", "Accessories"];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === "all" ? "" : value }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Catalog</h1>
            <p className="text-muted-foreground">
              {filters.search 
                ? `Searching for "${filters.search}"` 
                : filters.category 
                  ? `${filters.category} Collection` 
                  : "All Products"}
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 bg-card border-white/10"
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
             </div>
             <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
               <Filter className="w-4 h-4" />
             </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-xl border border-white/5 p-6 sticky top-24 space-y-8">
              <div>
                <h3 className="font-bold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  <div 
                    onClick={() => handleFilterChange("category", "")}
                    className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors ${!filters.category ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                  >
                    All Categories
                  </div>
                  {categories.map(cat => (
                    <div 
                      key={cat}
                      onClick={() => handleFilterChange("category", cat)}
                      className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors ${filters.category === cat ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4">Sort By</h3>
                <Select 
                  value={filters.sort || "popular"} 
                  onValueChange={(val) => handleFilterChange("sort", val)}
                >
                  <SelectTrigger className="w-full bg-background border-white/10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground hover:text-white"
                onClick={() => setFilters({ category: "", search: "", sort: 'popular' })}
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-xl border border-white/5">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                <Button 
                  className="mt-6" 
                  onClick={() => setFilters({ category: "", search: "", sort: 'popular' })}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
