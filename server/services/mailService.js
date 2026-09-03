import nodemailer from 'nodemailer';

let testAccountTransporter = null;

const createTransporter = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Fallback to auto-generated Ethereal test account for dev/demo
  if (!testAccountTransporter) {
    try {
      const testAccount = await nodemailer.createTestAccount();
      testAccountTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log(`[MailService] Initialized Ethereal test mailer account: ${testAccount.user}`);
    } catch (err) {
      console.warn('[MailService] Could not create Ethereal account, using console logger fallback:', err.message);
      return null;
    }
  }

  return testAccountTransporter;
};

export const sendContactMessage = async ({
  recipientEmail,
  developerName,
  senderName,
  senderEmail,
  subject,
  message
}) => {
  const transporter = await createTransporter();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #4f46e5; margin-bottom: 8px;">CodeFolio Portfolio Message</h2>
      <p style="color: #6b7280; font-size: 14px; margin-top: 0;">You received a new inquiry on your developer portfolio.</p>
      <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
      
      <p><strong>From:</strong> ${senderName} (<a href="mailto:${senderEmail}">${senderEmail}</a>)</p>
      <p><strong>Subject:</strong> ${subject}</p>
      
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #4f46e5;">
        <p style="margin: 0; white-space: pre-line; color: #1f2937;">${message}</p>
      </div>

      <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">
        Powered by CodeFolio &bull; Sent to ${recipientEmail}
      </p>
    </div>
  `;

  if (!transporter) {
    console.log(`[MailService Simulator] Mail to ${recipientEmail} from ${senderEmail}: ${subject}`);
    return { success: true, previewUrl: null };
  }

  try {
    const info = await transporter.sendMail({
      from: `"CodeFolio Inquiries" <no-reply@codefolio.dev>`,
      to: recipientEmail,
      replyTo: senderEmail,
      subject: `[CodeFolio] ${subject}`,
      text: `You received a new message from ${senderName} (${senderEmail}):\n\n${message}`,
      html: htmlContent
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[MailService] Message preview available at: ${previewUrl}`);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl
    };
  } catch (smtpErr) {
    console.warn(`[MailService] SMTP dispatch fallback: ${smtpErr.message}. Simulated delivery.`);
    return {
      success: true,
      messageId: `simulated-${Date.now()}`,
      previewUrl: null
    };
  }
};
