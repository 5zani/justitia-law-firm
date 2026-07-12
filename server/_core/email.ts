import nodemailer from "nodemailer";
import { ENV } from "./env";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!ENV.smtpHost || !ENV.smtpUser || !ENV.smtpPass) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: ENV.smtpHost,
      port: parseInt(ENV.smtpPort, 10),
      secure: parseInt(ENV.smtpPort, 10) === 465,
      auth: {
        user: ENV.smtpUser,
        pass: ENV.smtpPass,
      },
    });
  }
  return transporter;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const t = getTransporter();
  const to = ENV.contactNotifyEmail;

  if (!t || !to) {
    console.warn(
      "[Email] SMTP not configured or CONTACT_NOTIFY_EMAIL missing; skipping email send."
    );
    return false;
  }

  try {
    await t.sendMail({
      from: `"Justitia Law Firm Website" <${ENV.smtpUser}>`,
      to,
      replyTo: data.email,
      subject: `New Contact Form Submission: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("[Email] Failed to send contact notification:", error);
    return false;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
export async function sendArticleNotification(
  article: { title: string; slug: string; excerpt: string | null },
  recipients: string[]
): Promise<void> {
  const t = getTransporter();

  if (!t || recipients.length === 0) {
    console.warn(
      "[Email] SMTP not configured or no recipients; skipping article notification."
    );
    return;
  }

  const articleUrl = `${ENV.siteUrl}/articles/${article.slug}`;

  const results = await Promise.allSettled(
    recipients.map((to) =>
      t.sendMail({
        from: `"Justitia Law Firm" <${ENV.smtpUser}>`,
        to,
        subject: `New Article: ${article.title}`,
        text: `We've published a new article: ${article.title}\n\n${article.excerpt ?? ""}\n\nRead it here: ${articleUrl}`,
        html: `
          <h2>New Article Published</h2>
          <h3>${escapeHtml(article.title)}</h3>
          ${article.excerpt ? `<p>${escapeHtml(article.excerpt)}</p>` : ""}
          <p><a href="${articleUrl}">Read the full article</a></p>
          <hr/>
          <p style="color:#888;font-size:12px;">You're receiving this because you contacted Justitia Law Firm through our website.</p>
        `,
      })
    )
  );

  const failed = results.filter((r) => r.status === "rejected").length;
  if (failed > 0) {
    console.warn(`[Email] ${failed} of ${recipients.length} article notification emails failed to send.`);
  }
}