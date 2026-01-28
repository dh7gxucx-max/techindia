import { Resend } from 'resend';

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

export async function sendOrderEmail(orderData: OrderEmailData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

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
            <h1>Новый заказ от INTech</h1>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">Информация о клиенте:</div>
              <p>
                <strong>Имя:</strong> ${orderData.firstName} ${orderData.lastName}<br>
                <strong>Телефон:</strong> ${orderData.phone}<br>
                ${orderData.email ? `<strong>Email:</strong> ${orderData.email}<br>` : ''}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Адрес доставки:</div>
              <p>
                ${orderData.addressLine1}<br>
                ${orderData.addressLine2 ? `${orderData.addressLine2}<br>` : ''}
                ${orderData.city}, ${orderData.state} ${orderData.zip}<br>
                ${orderData.country}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Способ оплаты:</div>
              <p>${orderData.paymentMethod === 'cod' ? 'Наложенный платеж (Cash on Delivery)' : orderData.paymentMethod}</p>
            </div>

            <div class="section">
              <div class="section-title">Заказанные товары:</div>
              <table>
                <thead>
                  <tr style="background-color: #4F46E5; color: white;">
                    <th style="padding: 8px; text-align: left;">Товар</th>
                    <th style="padding: 8px; text-align: center;">Кол-во</th>
                    <th style="padding: 8px; text-align: right;">Цена</th>
                    <th style="padding: 8px; text-align: right;">Итого</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Товары:</td>
                    <td style="padding: 8px; text-align: right;">₹${orderData.total.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Налог (18%):</td>
                    <td style="padding: 8px; text-align: right;">₹${orderData.tax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Доставка:</td>
                    <td style="padding: 8px; text-align: right;">${orderData.shipping === 0 ? 'Бесплатно' : `₹${orderData.shipping.toLocaleString('en-IN')}`}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 12px; text-align: right; font-size: 18px;">ИТОГО:</td>
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

  await resend.emails.send({
    from: 'orders@intechshop.in',
    to: process.env.ORDER_EMAIL || 'dh7gxucx@gmail.com',
    subject: `Новый заказ от ${orderData.firstName} ${orderData.lastName}`,
    html: htmlContent,
  });
}
