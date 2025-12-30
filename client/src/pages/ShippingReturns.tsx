export default function ShippingReturns() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Shipping & Returns Policy</h1>
        <p className="text-muted-foreground mt-2">Last updated: December 2025</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Shipping */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Shipping Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Delivery Timeline</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>Metro Cities: 3-5 business days</li>
                <li>Tier 2 Cities: 5-7 business days</li>
                <li>Remote Areas: 7-14 business days</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Shipping Charges</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>FREE on orders above 5000</li>
                <li>99 for orders below 5000</li>
                <li>Express: 199 (1-2 days metro)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Courier Partners</h3>
              <p className="text-muted-foreground text-sm">Blue Dart, Delhivery, India Post</p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Track Your Order</h3>
            <p className="text-muted-foreground text-sm">
              Receive tracking SMS/Email after dispatch. Track using Order ID in your account.
            </p>
          </div>
        </div>
        
        {/* Returns */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Returns & Refunds</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Return Eligibility</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>7 days: Damaged/Defective (CPA 2019)</li>
                <li>30 days: Size/Fit issues</li>
                <li>Product unused + original tags</li>
                <li>Original packaging required</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Return Process</h3>
              <ol className="space-y-1 text-muted-foreground text-sm list-decimal list-inside">
                <li>Raise request from account dashboard</li>
                <li>Pickup within 2-3 days</li>
                <li>Quality check (1-2 days)</li>
                <li>Refund in 7-10 business days</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Refund Methods</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>Original payment (UPI/Card)</li>
                <li>Bank transfer (COD orders)</li>
                <li>Instant store credit</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
            <h3 className="font-semibold text-foreground mb-2">Non-Returnable Items</h3>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>Opened electronics</li>
              <li>Personal care products</li>
              <li>Intimate wear</li>
              <li>Perishables</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3 text-lg">Shipping Summary</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Pan India delivery</li>
              <li>Free shipping above 5000</li>
              <li>Track via SMS/Email</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3 text-lg">Returns Summary</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>7-30 days return window</li>
              <li>Free pickup</li>
              <li>7-10 days refund</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6 text-sm text-muted-foreground">
        Policies governed by Consumer Protection Act 2019. Contact Support@intch.com for assistance.
      </div>
    </div>
  );
}
