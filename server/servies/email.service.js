import nodemailer from 'nodemailer';
import { SMTPConfigs } from '../../../../../Mern Learning/node-js/src/config/config.js';

class EmailService {
  #transporter;
  constructor() {
    try {
      this.#transporter = nodemailer.createTransport({
        host: SMTPConfigs.host,
        port: SMTPConfigs.port,
        secure: false,
        auth: {
          user: SMTPConfigs.user,
          pass: SMTPConfigs.password,
        },
      });
      console.log(
        '*****                SMTP Connected                     ****'
      );
    } catch (error) {
      throw error;
    }
  }

  async SendMail({ to, subject, message }) {
    try {
      return await this.#transporter.sendMail({
        from: SMTPConfigs.from,
        to: to,
        subject: subject,
        html: message,
      });
    } catch (error) {
      throw error;
    }
  }
  htmlBody(emailaddress) {
    return `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
      </head>
      <body style="margin:0;padding:0;background:#f4f6f6;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f6;padding:20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
                <!-- Header -->
                <tr>
                  <td style="background:#318039;padding:20px 24px;color:#ffffff;">
                    <table width="100%" role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:20px;font-weight:700;">Green Basket</td>
                        <td align="right" style="font-size:12px;opacity:0.95;">
                          <span style="display:inline-block;background:#ffffff;color:#318039;padding:6px 10px;border-radius:18px;font-weight:600;">Online Grocery</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Hero / Greeting -->
                <tr>
                  <td style="padding:28px 24px 8px 24px;color:#0b2a10;">
                    <h1 style="margin:0;font-size:22px;color:#0b2a10;">Thanks for subscribing,</h1>
                    <p style="margin:8px 0 0 0;color:#3b3b3b;font-size:15px;line-height:1.4;">
                      You're now part of the Green Basket family! We'll send you fresh deals, seasonal picks, and exclusive discounts straight to your inbox.
                    </p>
                  </td>
                </tr>
                <!-- CTA -->
                <tr>
                  <td align="center" style="padding:16px 24px 24px 24px;">
                    <a href="https://green-basket-egji.vercel.app" target="_blank" style="display:inline-block;text-decoration:none;background:#318039;color:#ffffff;padding:12px 22px;border-radius:6px;font-weight:700;">
                      Shop Fresh Now
                    </a>
                  </td>
                </tr>

                <!-- Interactive-ish section (supported in many clients): quick links -->
                <tr>
                  <td style="padding:0 24px 18px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:33%;padding:8px;">
                          <a href="https://green-basket-egji.vercel.app/products" target="_blank" style="display:block;text-align:center;padding:12px;border-radius:6px;border:1px solid #e6f1ea;text-decoration:none;color:#318039;font-weight:700;background:#ffffff;">
                            Fresh Picks
                          </a>
                        </td>
                        <td style="width:33%;padding:8px;">
                          <a href="https://green-basket-egji.vercel.app/products" target="_blank" style="display:block;text-align:center;padding:12px;border-radius:6px;border:1px solid #e6f1ea;text-decoration:none;color:#318039;font-weight:700;background:#ffffff;">
                            Today's Offers
                          </a>
                        </td>
                        <td style="width:33%;padding:8px;">
                          <a href="https://green-basket-egji.vercel.app/my-orders" target="_blank" style="display:block;text-align:center;padding:12px;border-radius:6px;border:1px solid #e6f1ea;text-decoration:none;color:#318039;font-weight:700;background:#ffffff;">
                            Your Account
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f7faf7;padding:18px 24px;color:#6b6b6b;font-size:13px;">
                    <p style="margin:0 0 8px 0;">
                      Need help? Reply to this email or visit our <a href="https://greenbasket.example.com/help" style="color:#318039;text-decoration:none;">help center</a>.
                    </p>
                    <p style="margin:0;color:#9aa79a;">
                      Green Basket • Fresh groceries delivered • <a href="https://greenbasket.example.com/unsubscribe?email=${encodeURIComponent(
                        emailaddress
                      )}" style="color:#318039;text-decoration:none;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>

              <div style="font-size:12px;color:#9aa79a;margin-top:12px;">
                <span>© ${new Date().getFullYear()} Green Basket</span>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }
}

const email = new EmailService();
export default email;
