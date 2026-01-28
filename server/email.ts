import nodemailer from 'nodemailer';

interface OrderEmailData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shipping: number;
  tax: number;
}

async function sendViaElasticAPI(orderData: OrderEmailData) {
  console.log("sendViaElasticAPI: Starting...");

  const apiKey = process.env.ELASTIC_API_KEY;
  const toEmail = process.env.ORDER_EMAIL || process.env.SMTP_USER;

  console.log("sendViaElasticAPI: API Key configured:", !!apiKey);
  console.log("sendViaElasticAPI: To:", toEmail);

  const finalTotal = orderData.total + orderData.shipping + orderData.tax;

  const itemsHtml = orderData.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: bold; margin-bottom: 10px; font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .total-row { font-weight: bold; background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order from INTech</h1>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">Customer Information:</div>
              <p>
                <strong>Name:</strong> ${orderData.firstName} ${orderData.lastName}<br>
                <strong>Phone:</strong> ${orderData.phone}<br>
                ${orderData.email ? `<strong>Email:</strong> ${orderData.email}<br>` : ''}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Shipping Address:</div>
              <p>
                ${orderData.addressLine1}<br>
                ${orderData.addressLine2 ? `${orderData.addressLine2}<br>` : ''}
                ${orderData.city}, ${orderData.state} ${orderData.zip}<br>
                ${orderData.country}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Payment Method:</div>
              <p>${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod}</p>
            </div>

            <div class="section">
              <div class="section-title">Order Items:</div>
              <table>
                <thead>
                  <tr style="background-color: #4F46E5; color: white;">
                    <th style="padding: 8px; text-align: left;">Product</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px; text-align: right;">Price</th>
                    <th style="padding: 8px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Subtotal:</td>
                    <td style="padding: 8px; text-align: right;">₹${orderData.total.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Tax (18%):</td>
                    <td style="padding: 8px; text-align: right;">₹${orderData.tax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Shipping:</td>
                    <td style="padding: 8px; text-align: right;">${orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping.toLocaleString('en-IN')}`}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right; font-size: 18px;">TOTAL:</td>
                    <td style="padding: 12px; text-align: right; font-size: 18px;">₹${finalTotal.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.elasticemail.com/v2/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        apikey: apiKey!,
        from: process.env.SMTP_USER!,
        fromName: 'INTech Orders',
        to: toEmail!,
        subject: `New Order from ${orderData.firstName} ${orderData.lastName}`,
        bodyHtml: htmlContent,
        isTransactional: 'true',
      }),
    });

    const result = await response.text();
    console.log("sendViaElasticAPI: Response:", result);

    if (!response.ok) {
      throw new Error(`Elastic Email API error: ${result}`);
    }

    console.log("sendViaElasticAPI: Email sent successfully!");
    return { messageId: result };
  } catch (error) {
    console.error("sendViaElasticAPI: Failed to send email:", error);
    throw error;
  }
}

export async function sendOrderEmail(orderData: OrderEmailData) {
  console.log("sendOrderEmail: Starting...");

  // Check if we should use Elastic Email API instead of SMTP
  const useElasticAPI = process.env.ELASTIC_API_KEY;

  if (useElasticAPI) {
    console.log("sendOrderEmail: Using Elastic Email API");
    return sendViaElasticAPI(orderData);
  }

  console.log("sendOrderEmail: Using SMTP");
  const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.elasticemail.com',
    port: parseInt(process.env.SMTP_PORT || '2525'),
    secure: false, // use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  console.log("sendOrderEmail: Creating transporter with config:", {
    ...smtpConfig,
    auth: { user: smtpConfig.auth.user, pass: smtpConfig.auth.pass ? '***' : 'NOT SET' }
  });

  // Elastic Email SMTP on port 2525 - works better on Railway
  const transporter = nodemailer.createTransport(smtpConfig);

  console.log("sendOrderEmail: Verifying SMTP connection...");

  const finalTotal = orderData.total + orderData.shipping + orderData.tax;

  const itemsHtml = orderData.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: bold; margin-bottom: 10px; font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .total-row { font-weight: bold; background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order from INTech</h1>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">Customer Information:</div>
              <p>
                <strong>Name:</strong> ${orderData.firstName} ${orderData.lastName}<br>
                <strong>Phone:</strong> ${orderData.phone}<br>
                ${orderData.email ? `<strong>Email:</strong> ${orderData.email}<br>` : ''}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Shipping Address:</div>
              <p>
                ${orderData.addressLine1}<br>
                ${orderData.addressLine2 ? `${orderData.addressLine2}<br>` : ''}
                ${orderData.city}, ${orderData.state} ${orderData.zip}<br>
                ${orderData.country}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Payment Method:</div>
              <p>${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod}</p>
            </div>

            <div class="section">
              <div class="section-title">Order Items:</div>
              <table>
                <thead>
                  <tr style="background-color: #4F46E5; color: white;">
                    <th style="padding: 8px; text-align: left;">Product</th>
                    <th style="padding: 8px; text-align: center;">Qty</th>
                    <th style="padding: 8px; text-align: right;">Price</th>
                    <th style="padding: 8px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Subtotal:</td>
                    <td style="padding: 8px; text-align: right;">₹${orderData.total.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Tax (18%):</td>
                    <td style="padding: 8px; text-align: right;">₹${orderData.tax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Shipping:</td>
                    <td style="padding: 8px; text-align: right;">${orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping.toLocaleString('en-IN')}`}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right; font-size: 18px;">TOTAL:</td>
                    <td style="padding: 12px; text-align: right; font-size: 18px;">₹${finalTotal.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ORDER_EMAIL || process.env.SMTP_USER,
    subject: `Новый заказ от ${orderData.firstName} ${orderData.lastName}`,
    html: htmlContent,
  };

  console.log("sendOrderEmail: Sending email from", mailOptions.from, "to", mailOptions.to);

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("sendOrderEmail: Email sent successfully!", result.messageId);
    return result;
  } catch (error) {
    console.error("sendOrderEmail: Failed to send email:", error);
    throw error;
  }
}
