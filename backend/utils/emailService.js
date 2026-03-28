const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  connectionUrl: `smtp://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`,
  debug: true,
  logger: true
});

const generateOrderConfirmationHTML = (order, items) => {
  const itemsHTML = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product_name || 'Product'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${parseFloat(item.price_at_purchase).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const shippingAddress = order.shipping_address || {};

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; }
        .header { background: #1F77DB; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .order-id { color: #FFB800; font-weight: bold; font-size: 18px; }
        .section { margin: 20px 0; }
        .section h2 { color: #1F77DB; font-size: 16px; border-bottom: 2px solid #1F77DB; padding-bottom: 10px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0; }
        .info-item { background: #f9f9f9; padding: 10px; border-radius: 4px; }
        .info-item label { color: #666; font-size: 12px; font-weight: bold; }
        .info-item value { color: #333; font-size: 14px; display: block; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table th { background: #f0f0f0; padding: 10px; text-align: left; font-weight: bold; color: #333; }
        .total-row { background: #f9f9f9; font-weight: bold; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        .btn { background: #1F77DB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p class="order-id">Order #${order.id}</p>
        </div>

        <div class="section">
          <p>Hello ${shippingAddress.firstName || 'Valued Customer'},</p>
          <p>Thank you for your order! Your order has been successfully placed and confirmed.</p>
        </div>

        <div class="section">
          <h2>Order Details</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Order Date</label>
              <value>${new Date(order.created_at).toLocaleDateString('en-IN')}</value>
            </div>
            <div class="info-item">
              <label>Order Total</label>
              <value>₹${parseFloat(order.total_amount).toFixed(2)}</value>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Ordered Items</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
              <tr class="total-row">
                <td colspan="2" style="padding: 10px; text-align: right;">Total:</td>
                <td style="padding: 10px; text-align: right;">₹${parseFloat(order.total_amount).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Shipping Address</h2>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong>${shippingAddress.firstName} ${shippingAddress.lastName}</strong></p>
            <p style="margin: 5px 0;">${shippingAddress.address}</p>
            <p style="margin: 5px 0;">${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pincode}</p>
            <p style="margin: 5px 0;">📞 ${shippingAddress.phoneNumber}</p>
          </div>
        </div>

        <div class="section">
          <h2>Next Steps</h2>
          <p>Your order is being prepared for shipment. You will receive a shipping confirmation email with tracking details soon.</p>
          <p>Estimated delivery: 5-7 business days</p>
        </div>

        <div class="footer">
          <p>If you have any questions, please contact our support team at support@flipkart.com</p>
          <p>&copy; 2025 Flipkart Clone. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendOrderConfirmationEmail = async (order, items, customerEmail) => {
  try {
    if (!customerEmail) {
      console.log('No customer email provided, skipping email sending');
      return;
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
      to: customerEmail,
      subject: `Order Confirmation - Order #${order.id}`,
      html: generateOrderConfirmationHTML(order, items)
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${customerEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
};

module.exports = { sendOrderConfirmationEmail };
