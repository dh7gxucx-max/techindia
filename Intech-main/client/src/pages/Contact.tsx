export default function Contact() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground mt-2">
          Our customer support team is available to assist you with any queries.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Your name" className="h-12 px-4 rounded-lg border bg-background" />
              <input type="email" placeholder="Your email" className="h-12 px-4 rounded-lg border bg-background" />
            </div>
            <input placeholder="Order ID (optional)" className="h-12 px-4 rounded-lg border bg-background" />
            <textarea placeholder="Your message" rows={5} className="w-full px-4 py-3 rounded-lg border bg-background" />
            <button className="w-full h-12 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-muted-foreground">Support@intch.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+91 7432 7431</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Saturday: 9:00 AM - 7:00 PM IST<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
