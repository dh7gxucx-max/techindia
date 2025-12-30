import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faqs() {
  const faqs = [
    {
      question: "What is your return and refund policy?",
      answer: "As per Consumer Protection Act 2019, you can return products within 7 days of delivery for a full refund if the product is defective or damaged. For other cases, returns are accepted within 30 days with product in original condition. Refunds are processed within 7-10 business days to your original payment method."
    },
    {
      question: "How long does delivery take in India?",
      answer: "Metro cities (Delhi, Mumbai, Bangalore, Hyderabad): 3-5 business days. Tier 2 cities: 5-7 business days. Remote areas: 7-14 business days. We ship via Blue Dart, Delhivery, and India Post."
    },
    {
      question: "Do you deliver to all pin codes in India?",
      answer: "Yes, we deliver across India including remote areas. Standard delivery is available for all serviceable pin codes. You can check serviceability by entering your pin code at checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, Wallets, and Cash on Delivery (COD) for orders under Rs. 50,000."
    },
    {
      question: "How can I track my order?",
      answer: "You will receive tracking details via SMS and email once your order is shipped. You can also track orders from your account dashboard using your Order ID."
    },
    {
      question: "What is your warranty policy?",
      answer: "All products come with manufacturer warranty valid across India. Electronics: 6-12 months, Home Appliances: 1-2 years. Contact support for warranty claims."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 30 minutes of placement if not yet processed. After processing, cancellation is not possible but returns are accepted as per policy."
    }
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions about orders, shipping, payments, and returns in India.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="border-t pt-6">
        <p className="text-muted-foreground text-center">
          Still have questions? <a href="/contact" className="text-primary hover:underline font-medium">Contact our support team</a>
        </p>
      </div>
    </div>
  );
}
