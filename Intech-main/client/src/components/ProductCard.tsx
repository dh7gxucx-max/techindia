import { Product } from "@shared/routes";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="block h-full group">
      <div className="h-full bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col relative">
        <div className="relative aspect-square overflow-hidden bg-white/5">
          {/* Unsplash tech product placeholder */}
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white border border-white/10">
            {product.brand}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground line-through">₹{Math.floor(product.price * 1.2)}</span>
              <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            
            <Button 
              size="icon" 
              className="rounded-full w-10 h-10 bg-white/10 hover:bg-primary hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
