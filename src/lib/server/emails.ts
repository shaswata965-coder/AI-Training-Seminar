import "server-only";
import type { SiteSettings } from "@/lib/content/types";
import { replyBy } from "@/lib/copy";
import { venueLine } from "@/lib/training";
import { absoluteUrl } from "@/lib/paths";
import type { MailInput } from "./mail";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout(s: SiteSettings, title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f8fc;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e1e7f1">
<tr><td style="padding:28px 32px;background:linear-gradient(135deg,#eaf5ff,#f2eeff);">
<p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5b3cc4;font-weight:700">${esc(s.programmeName)}</p>
<h1 style="margin:8px 0 0;font-size:24px;line-height:1.25">${esc(title)}</h1></td></tr>
<tr><td style="padding:28px 32px;font-size:15px;line-height:1.6;color:#334155">${body}</td></tr>
<tr><td style="padding:20px 32px;background:#f3f6fb;font-size:13px;color:#64748b">
${esc(s.organisedBy || "Daffodil International University")} · ${esc(venueLine(s))}<br/><a href="${absoluteUrl("/")}" style="color:#3b5bdb">${esc(absoluteUrl("/").replace(/^https?:\/\//, ""))}</a>
</td></tr></table></td></tr></table></body></html>`;
}

const box = (inner: string) => `<div style="margin:18px 0;padding:16px 18px;border-radius:14px;background:#f3f6fb;border:1px solid #e1e7f1">${inner}</div>`;
const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;margin-top:8px;padding:12px 20px;border-radius:999px;background:#3b5bdb;color:#ffffff;text-decoration:none;font-weight:600">${esc(label)}</a>`;

/** The confirmation of a training request (the Contact us form). */
export function registrationEmail(s: SiteSettings, r: { name: string; email: string; regId: string }): MailInput {
  const next = `The organising team reads every request and will get back to you ${replyBy(s)} to agree the focus, length and format of your training, and to design the sessions around your team.`;
  const body = `<p>Hi ${esc(r.name)},</p>
<p>Thank you for contacting <strong>${esc(s.programmeName)}</strong> about a custom AI training. ${esc(next)}</p>
${box(`<p style="margin:0;font-size:13px;color:#64748b">Your reference number</p><p style="margin:4px 0 0;font-size:22px;font-weight:700;letter-spacing:.06em;color:#3b5bdb">${esc(r.regId)}</p>`)}
<p>Please quote this reference number when you write to us. Every session is hands-on, so everyone taking part brings a charged laptop; for sessions on campus, they also carry a valid photo ID to the gate.</p>
${s.confirmationNote ? `<p>${esc(s.confirmationNote)}</p>` : ""}
<p>While you wait, the sample plan shows what a training can include.</p>
<p>${button(absoluteUrl("/programme"), "See the sample plan")}</p>
<p style="margin-top:24px">Best wishes,<br/>The organising team</p>`;
  const text = `Hi ${r.name},

Thank you for contacting ${s.programmeName} about a custom AI training. ${next}

Your reference number: ${r.regId}

Please quote this reference number when you write to us. Every session is hands-on, so everyone taking part brings a charged laptop; for sessions on campus, they also carry a valid photo ID to the gate.
${s.confirmationNote ? `\n${s.confirmationNote}\n` : ""}
Sample plan: ${absoluteUrl("/programme")}

The organising team`;
  return {
    to: r.email,
    subject: `Training request received: ${s.programmeName} (${r.regId})`,
    html: layout(s, "We've received your training request", body),
    text,
    replyTo: s.contactEmail || undefined,
    visitor: true,
  };
}

const ENQUIRY_LABEL = { contact: "message", sponsor: "partnership enquiry" } as const;

/**
 * The acknowledgement goes to whatever address was typed into the form, so it
 * repeats nothing the visitor wrote: it can't be used to send someone else a
 * message from the site's address.
 */
export function enquiryAckEmail(s: SiteSettings, e: { email: string; type: keyof typeof ENQUIRY_LABEL }): MailInput {
  const label = ENQUIRY_LABEL[e.type];
  const body = `<p>Hello,</p><p>Thanks for your ${label}. The organising team has received it and will get back to you soon.</p><p>If you didn't send it, you can ignore this e-mail.</p><p>The organising team</p>`;
  return {
    to: e.email,
    subject: `We received your ${label} · ${s.programmeName}`,
    html: layout(s, "Thanks for getting in touch", body),
    text: `Hello,\n\nThanks for your ${label}. The organising team will get back to you soon.\n\nIf you didn't send it, you can ignore this e-mail.\n\nThe organising team`,
    replyTo: s.contactEmail || undefined,
    visitor: true,
  };
}

export function organiserNotice(s: SiteSettings, to: string, subject: string, rows: [string, string][], replyTo?: string): MailInput {
  const table = rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join("");
  return {
    to,
    subject,
    html: layout(s, subject, `<table role="presentation" cellpadding="0" cellspacing="0">${table}</table><p>${button(absoluteUrl("/admin"), "Open the admin panel")}</p>`),
    text: `${subject}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${absoluteUrl("/admin")}`,
    replyTo,
  };
}

export function notifyAddress(s: SiteSettings) {
  return s.notifyEmail || process.env.NOTIFY_EMAIL || s.contactEmail || "";
}
