import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const id = parseInt(params?.id || "0");

  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    setLocation("/cart");
  };

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-3">
            {product.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`aspect-square w-20 rounded-xl overflow-hidden border ${
                  activeImage === index
                    ? "border-primary"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">
                {typeof product.rating === "number"
                  ? product.rating.toFixed(1)
                  : product.rating}
              </span>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold">
            {product.name}
          </h1>

          <p className="text-muted-foreground max-w-xl">
            {product.description}
          </p>

          {/* Price & Actions */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.oldPrice && (
                <span className="text-muted-foreground line-through">
                  ₹{product.oldPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.discount && (
                <span className="text-sm text-green-400 font-medium">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              <Button
                className="flex-1 bg-black text-white hover:bg-black/80 border border-white/20"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
              <Truck className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium text-white text-xs">
                  Free Delivery
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Within 2-4 days
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
              <Shield className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium text-white text-xs">
                  1 Year Warranty
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Official support
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
              <RotateCcw className="w-4 h-4 text-primary" />
              <div>
                <div className="font-medium text-white text-xs">
                  Easy Returns
                </div>
                <div className="text-[11px] text-muted-foreground">
                  7-day replacement
                </div>
              </div>
            </div>
          </div>

          {/* Specs – ИСПРАВЛЁННЫЙ БЛОК */}
          {product.specifications && (
            <div className="mt-6 border-t border-white/10 pt-6 space-y-4 text-sm">
              <h2 className="font-semibold text-white">Specifications</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.specifications}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
