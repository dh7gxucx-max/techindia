export default function Warranty() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Warranty Policy</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive warranty coverage for all products sold in India
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Manufacturer Warranty</h2>
          <p className="text-muted-foreground mb-4">
            All products come with manufacturer warranty valid across India. Warranty period varies by product category.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Electronics: 6-12 months manufacturer warranty</li>
            <li>• Home Appliances: 1-2 years warranty</li>
            <li>• Mobile Accessories: 6 months warranty</li>
            <li>• Fashion Items: Manufacturing defects covered for 30 days</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Warranty Coverage</h2>
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Covered Under Warranty</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Manufacturing defects</li>
                <li>• Material defects</li>
                <li>• Workmanship issues</li>
                <li>• Functional failures</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-foreground">NOT Covered</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Physical damage</li>
                <li>• Water damage</li>
                <li>• Misuse or abuse</li>
                <li>• Unauthorized repairs</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Warranty Claim Process</h2>
          <ol className="space-y-3 text-muted-foreground list-decimal list-inside bg-muted/30 p-6 rounded-lg">
            <li>Contact customer support with Order ID and issue description</li>
            <li>Submit product photos/videos if requested</li>
            <li>Ship product to service center (pickup arranged for bulky items)</li>
            <li>Service center assessment within 5-7 business days</li>
            <li>Repair/replacement as per warranty terms</li>
          </ol>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Important Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Keep invoice and warranty card for claims</li>
              <li>• Warranty valid only in India</li>
              <li>• Courier charges covered by us</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Original packaging not required</li>
              <li>• Warranty starts from delivery date</li>
              <li>• Pan-India service network</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Need Help with Warranty?</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Our support team is ready to assist with warranty claims and service center coordination across India.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-1">Email:</p>
              <p>Support@intch.com</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Phone:</p>
              <p>+91 7432 7431</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Mon-Sat 9AM-7PM IST
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6 text-sm text-muted-foreground">
        Warranty claims governed by Consumer Protection Act 2019. All repairs covered under manufacturer warranty terms.
      </div>
    </div>
  );
}
