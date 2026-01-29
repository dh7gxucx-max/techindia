import fs from 'fs';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'telegram-subscribers.json');

interface OrderData {
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

// Load subscribers from file
function loadSubscribers(): Set<string> {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
      return new Set(JSON.parse(data));
    }
  } catch (error) {
    console.error('Error loading subscribers:', error);
  }
  return new Set();
}

// Save subscribers to file
function saveSubscribers(subscribers: Set<string>) {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([...subscribers]), 'utf-8');
  } catch (error) {
    console.error('Error saving subscribers:', error);
  }
}

// Add subscriber
export async function addSubscriber(chatId: string) {
  const subscribers = loadSubscribers();
  subscribers.add(chatId);
  saveSubscribers(subscribers);
  console.log(`Subscriber added: ${chatId}`);
}

// Remove subscriber
export async function removeSubscriber(chatId: string) {
  const subscribers = loadSubscribers();
  subscribers.delete(chatId);
  saveSubscribers(subscribers);
  console.log(`Subscriber removed: ${chatId}`);
}

// Send message to Telegram
async function sendTelegramMessage(chatId: string, message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN not set');
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(`Telegram API error: ${result.description}`);
    }

    return result;
  } catch (error) {
    console.error(`Failed to send message to ${chatId}:`, error);
    throw error;
  }
}

// Send order notification to all subscribers
export async function sendOrderNotification(orderData: OrderData) {
  console.log('sendOrderNotification: Starting...');

  const subscribers = loadSubscribers();
  console.log(`Found ${subscribers.size} subscribers`);

  if (subscribers.size === 0) {
    console.warn('No subscribers to notify');
    return;
  }

  const finalTotal = orderData.total + orderData.shipping + orderData.tax;

  // Format items list
  const itemsList = orderData.items
    .map((item, index) =>
      `${index + 1}. ${item.name}\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n\n');

  // Create message
  const message = `
🛒 <b>New Order from INTech</b>

👤 <b>Customer Information:</b>
Name: ${orderData.firstName} ${orderData.lastName}
Phone: ${orderData.phone}${orderData.email ? `\nEmail: ${orderData.email}` : ''}

📦 <b>Shipping Address:</b>
${orderData.addressLine1}${orderData.addressLine2 ? `\n${orderData.addressLine2}` : ''}
${orderData.city}, ${orderData.state} ${orderData.zip}
${orderData.country}

💳 <b>Payment Method:</b>
${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod}

📋 <b>Order Items:</b>
${itemsList}

💰 <b>Order Summary:</b>
Subtotal: ₹${orderData.total.toLocaleString('en-IN')}
Tax (18%): ₹${orderData.tax.toLocaleString('en-IN')}
Shipping: ${orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping.toLocaleString('en-IN')}`}
<b>TOTAL: ₹${finalTotal.toLocaleString('en-IN')}</b>
`.trim();

  // Send to all subscribers
  const results = await Promise.allSettled(
    [...subscribers].map(chatId => sendTelegramMessage(chatId, message))
  );

  // Log results
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  console.log(`Notifications sent: ${successful} successful, ${failed} failed`);

  return { successful, failed };
}

// Handle incoming webhook updates
export async function handleTelegramWebhook(update: any) {
  console.log('Received Telegram update:', JSON.stringify(update, null, 2));

  if (update.message && update.message.text) {
    const chatId = update.message.chat.id.toString();
    const text = update.message.text.trim();

    if (text === '/start' || text.toLowerCase() === 'start') {
      await addSubscriber(chatId);
      await sendTelegramMessage(
        chatId,
        '✅ Welcome! You have subscribed to order notifications from INTech.\n\nYou will receive a message every time a new order is placed.'
      );
    } else if (text === '/stop' || text.toLowerCase() === 'stop') {
      await removeSubscriber(chatId);
      await sendTelegramMessage(
        chatId,
        '❌ You have unsubscribed from order notifications.'
      );
    } else if (text === '/help' || text.toLowerCase() === 'help') {
      await sendTelegramMessage(
        chatId,
        `📖 <b>Available commands:</b>

/start - Subscribe to order notifications
/stop - Unsubscribe from notifications
/help - Show this help message

You will receive detailed information about every new order.`
      );
    }
  }
}
