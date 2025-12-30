export default function Privacy() {
  return (
    <div className="space-y-8 max-w-4xl prose prose-neutral dark:prose-invert">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">Effective Date: December 29, 2025</p>
      </div>
      
      <p className="text-muted-foreground">
        This Privacy Policy describes how we collect, use, and protect your personal information in compliance with the Information Technology Act, 2000 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
      </p>
      
      <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
      <ul className="space-y-2 text-muted-foreground">
        <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
        <li><strong>Payment Information:</strong> Credit/debit card details, UPI ID, net banking information (processed securely through payment gateways)</li>
        <li><strong>Transaction Data:</strong> Order history, purchase records, GST details</li>
        <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
      <ul className="space-y-2 text-muted-foreground">
        <li>Process and fulfill your orders</li>
        <li>Send order confirmations, shipping updates, and delivery notifications</li>
        <li>Process payments and generate GST invoices</li>
        <li>Provide customer support</li>
        <li>Send promotional offers (with your consent)</li>
        <li>Improve our website and services</li>
        <li>Comply with legal obligations under Indian law</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
      <p className="text-muted-foreground">
        We do not sell your personal information. We may share data with:
      </p>
      <ul className="space-y-2 text-muted-foreground">
        <li><strong>Service Providers:</strong> Payment processors, shipping partners, cloud hosting</li>
        <li><strong>Legal Requirements:</strong> Government authorities when required by Indian law</li>
        <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
      <p className="text-muted-foreground">
        We implement reasonable security practices including SSL encryption, secure servers, and restricted access to personal data. Payment information is processed through PCI-DSS compliant payment gateways.
      </p>
      
      <h2 className="text-2xl font-semibold text-foreground">5. Your Rights</h2>
      <p className="text-muted-foreground">You have the right to:</p>
      <ul className="space-y-2 text-muted-foreground">
        <li>Access your personal information</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your account</li>
        <li>Opt-out of marketing communications</li>
        <li>Withdraw consent for data processing</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-foreground">6. Cookies</h2>
      <p className="text-muted-foreground">
        We use cookies to enhance user experience, remember preferences, and analyze website traffic. You can disable cookies in your browser settings.
      </p>
      
      <h2 className="text-2xl font-semibold text-foreground">7. Data Retention</h2>
      <p className="text-muted-foreground">
        We retain your personal information as long as necessary for order fulfillment and legal compliance (minimum 3 years as per GST regulations).
      </p>
      
      <h2 className="text-2xl font-semibold text-foreground">8. Grievance Officer</h2>
      <p className="text-muted-foreground">
        As per IT Act 2000, for privacy concerns contact:<br />
        <strong>Name:</strong> Privacy Officer<br />
        <strong>Email:</strong> Support@intch.com<br />
        <strong>Phone:</strong> +91 7432 7431
      </p>
      
      <h2 className="text-2xl font-semibold text-foreground">9. Changes to Policy</h2>
      <p className="text-muted-foreground">
        We may update this policy periodically. Changes will be posted on this page with updated effective date.
      </p>
      
      <div className="border-t pt-6 text-sm text-muted-foreground">
        For questions about this Privacy Policy, contact: Support@intch.com
      </div>
    </div>
  );
}
