// lib/resend.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({
  email,
  signInUrl,
  credits,
  planName,
}: {
  email: string;
  signInUrl: string;
  credits: number;
  planName: string;
}) {
  await resend.emails.send({
    from: 'DocNeat <noreply@docneat.com>',
    to: email,
    subject: 'Welcome to DocNeat — Set Up Your Account',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a;padding:32px 40px;border-radius:16px 16px 0 0;text-align:center;">
              <p style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                DOCNEAT<span style="font-weight:400;">.com</span>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#34d399;letter-spacing:0.15em;font-weight:600;">
                SECURE | FAST | ACCURATE
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:48px 40px;">
              
              <!-- Success icon -->
              <div style="text-align:center;margin-bottom:32px;">
                <div style="display:inline-block;background-color:#d1fae5;border-radius:50%;padding:20px;">
                  <span style="font-size:36px;">✅</span>
                </div>
              </div>

              <h1 style="margin:0 0 16px;font-size:28px;font-weight:800;color:#111729;text-align:center;">
                Welcome to DocNeat!
              </h1>
              
              <p style="margin:0 0 24px;font-size:16px;color:#475569;line-height:1.6;text-align:center;">
                Your payment was successful. Your <strong>${planName}</strong> plan is active 
                and you have <strong>${credits} page credits</strong> ready to use.
              </p>

              <!-- Credits box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:13px;color:#059669;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Your Plan</p>
                    <p style="margin:0 0 4px;font-size:32px;font-weight:800;color:#111729;">${credits}</p>
                    <p style="margin:0;font-size:14px;color:#64748b;">page credits per month</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 32px;font-size:16px;color:#475569;line-height:1.6;text-align:center;">
                To access your account and start converting bank statements, 
                click the button below to set your password.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${signInUrl}" 
                       style="display:inline-block;background-color:#10b981;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;">
                      Set Up My Account →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-align:center;">
                This link expires in 7 days. If you have any issues, contact us at 
                <a href="mailto:support@docneat.com" style="color:#10b981;">support@docneat.com</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px 40px;border-radius:0 0 16px 16px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;">
                DocNeat.com — Easy. Fast. Accurate.
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Engaging Enterprises Ltd · London, UK
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });
}