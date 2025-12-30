import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ShieldCheck, Banknote } from "lucide-react";

export default function Checkout() {
  const { total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartTotal = total();
  const shipping = cartTotal > 5000 ? 0 : 350;
  const tax = Math.floor(cartTotal * 0.18);
  const finalTotal = cartTotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description:
          "Thank you for shopping with INTech. We will call you shortly to confirm your order.",
      });
      setLocation("/");
    }, 2000);
  };

  if (cartTotal === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side - form */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-card border border-white/5 rounded-xl p-6">
              <h2 className="font-semibold text-white mb-4">
                Contact & Shipping Details
              </h2>

              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    placeholder="House / Flat / Building, Street"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
                  <Input
                    id="addressLine2"
                    placeholder="Area / Locality / Landmark"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / PIN Code</Label>
                    <Input
                      id="zip"
                      inputMode="numeric"
                      placeholder="560001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="India" required />
                  </div>
                </div>

                {/* Payment method */}
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    defaultValue="cod"
                    className="grid grid-cols-1 gap-3"
                  >
                    <Label
                      htmlFor="cod"
                      className="flex items-center gap-3 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-primary"
                    >
                      <RadioGroupItem
                        value="cod"
                        id="cod"
                        className="mt-0.5"
                      />
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            Cash on Delivery
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Pay when you receive the order
                          </div>
                        </div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-card border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-white text-lg mb-4">
                Order Summary
              </h3>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-500">
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold"
              >
                {isProcessing
                  ? "Processing..."
                  : `Pay ₹${finalTotal.toLocaleString("en-IN")}`}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Secure Encrypted Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
