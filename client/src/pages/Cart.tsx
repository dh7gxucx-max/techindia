  import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const cartTotal = total();

  const shipping = cartTotal > 5000 ? 0 : 350;
  const tax = Math.floor(cartTotal * 0.18);
  const grandTotal = cartTotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mb-6 border border-white/10">
          <Trash2 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/catalog">
          <Button size="lg" className="bg-primary text-white">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-24 h-24 bg-background rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-white text-lg mb-1">{item.name}</h3>
                  <p className="text-primary font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full border-white/10"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full border-white/10"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-card border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-white text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-500">
                {shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
                </div>
                
                  <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18%)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
             </div>   
              
              <div className="border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-white">
                  </span>
                    <span className="text-2xl font-bold text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

              <Link href="/checkout">
                <Button className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white">
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
