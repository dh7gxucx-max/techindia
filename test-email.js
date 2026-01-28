import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

async function testEmail() {
  console.log('📧 Тестирование отправки email...\n');

  console.log('Настройки:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'не установлен');
  console.log('ORDER_EMAIL:', process.env.ORDER_EMAIL);
  console.log('');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const testOrderData = {
    firstName: 'Иван',
    lastName: 'Петров',
    phone: '+7 999 123-45-67',
    email: 'test@example.com',
    addressLine1: 'ул. Ленина, д. 10, кв. 5',
    addressLine2: '',
    city: 'Москва',
    state: 'Московская область',
    zip: '123456',
    country: 'Россия',
    paymentMethod: 'cod',
    items: [
      { id: 1, name: 'iPhone 15 Pro', price: 89990, quantity: 1 },
      { id: 2, name: 'AirPods Pro', price: 19990, quantity: 2 },
    ],
    total: 129970,
    shipping: 0,
    tax: 23394,
  };

  const finalTotal = testOrderData.total + testOrderData.shipping + testOrderData.tax;

  const itemsHtml = testOrderData.items
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
            <h1>🧪 Тестовый заказ от INTech</h1>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">Информация о клиенте:</div>
              <p>
                <strong>Имя:</strong> ${testOrderData.firstName} ${testOrderData.lastName}<br>
                <strong>Телефон:</strong> ${testOrderData.phone}<br>
                <strong>Email:</strong> ${testOrderData.email}<br>
              </p>
            </div>

            <div class="section">
              <div class="section-title">Адрес доставки:</div>
              <p>
                ${testOrderData.addressLine1}<br>
                ${testOrderData.city}, ${testOrderData.state} ${testOrderData.zip}<br>
                ${testOrderData.country}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Способ оплаты:</div>
              <p>Наложенный платеж (Cash on Delivery)</p>
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
                    <td style="padding: 8px; text-align: right;">₹${testOrderData.total.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Налог (18%):</td>
                    <td style="padding: 8px; text-align: right;">₹${testOrderData.tax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 8px; text-align: right;">Доставка:</td>
                    <td style="padding: 8px; text-align: right;">Бесплатно</td>
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

  try {
    console.log('Отправка тестового письма...');

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ORDER_EMAIL || process.env.SMTP_USER,
      subject: `🧪 Тестовый заказ от ${testOrderData.firstName} ${testOrderData.lastName}`,
      html: htmlContent,
    });

    console.log('✅ Письмо успешно отправлено!');
    console.log('Message ID:', info.messageId);
    console.log('\n📬 Проверьте почту:', process.env.ORDER_EMAIL);
    console.log('\nЕсли письмо не пришло, проверьте папку "Спам"');
  } catch (error) {
    console.error('❌ Ошибка при отправке письма:');
    console.error(error.message);
    if (error.code) {
      console.error('Код ошибки:', error.code);
    }
  }
}

testEmail();
