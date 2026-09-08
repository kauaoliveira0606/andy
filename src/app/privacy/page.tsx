import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--lg-font" });

export const metadata: Metadata = {
  title: "Privacy Policy — EcomSimulation",
  description: "How EcomSimulation collects, uses and protects your information.",
};

const LAST_UPDATED = "February 9, 2026";

/*
 * NOTE: Structural template, not legal advice. Before publishing:
 *  - replace every [bracketed] placeholder (entity name, retention periods,
 *    trackers actually used, contact details)
 *  - confirm the CCPA / GDPR / PIPEDA language and retention schedule with counsel
 */

type Block = { h?: string; p?: string; ul?: string[] };
type Section = { n: number; title: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    n: 1,
    title: "Introduction",
    blocks: [
      {
        p: `This Privacy Policy (the "Policy") explains how EcomSimulation ([legal entity name] — "we," "us," "our," or "Company") collects, uses, discloses and protects your information when you visit our website, landing pages and related digital properties (together, the "Site"), and when you interact with our information products, memberships, coaching, workshops and services (together, the "Services").`,
      },
      {
        p: `Please read this Policy carefully. If you do not agree with it, please do not use the Site or the Services.`,
      },
    ],
  },
  {
    n: 2,
    title: "Information We Collect",
    blocks: [
      {
        h: "2.1 Information You Provide",
        p: "We collect information you give us directly, including:",
        ul: [
          "Registration and lead capture: name, email address, phone number, and any details you submit through forms, applications, surveys or questionnaires",
          "Event registration: your registration details, attendance and engagement, questions asked during live sessions, and feedback",
          "Purchase and payment: billing name and address, purchase history and transaction records, and refund requests (card details are handled by our third-party payment processors, not stored by us)",
          "Communications: your email, chat and support messages, and any testimonials, reviews or feedback you choose to provide",
        ],
      },
      {
        h: "2.2 Information Collected Automatically",
        p: "When you use the Site we automatically collect:",
        ul: [
          "Usage data: IP address and device identifiers, browser and operating system, pages viewed, time on page, click patterns, referral source and exit pages",
          "Cookies and similar technologies: session and persistent cookies, pixel tags and web beacons, and local storage",
          "Analytics and performance: scroll and click data, video engagement, form completion and abandonment, and error data",
          "Email engagement: opens, clicks, delivery and bounce status, and unsubscribe or preference changes",
        ],
      },
    ],
  },
  {
    n: 3,
    title: "How We Use Your Information",
    blocks: [
      {
        h: "3.1 Primary Uses",
        ul: [
          "Deliver the Services: process registrations and orders, give you access to products and calls, and provide support",
          "Communicate with you: send transactional messages, program updates, educational content and marketing",
          "Personalise your experience and tailor content to your interests",
          "Analyse usage, identify trends and improve the Site and Services",
          "Segment audiences and send relevant follow-up communications",
          "Meet legal obligations and protect against fraud and abuse",
        ],
      },
      {
        h: "3.2 Marketing Uses",
        ul: [
          "Send promotional email about new products, events and offers",
          "Build audience segments for our advertising and measure campaign performance",
          "Run A/B tests on our emails and landing pages",
          "Track conversions and attribution across our marketing channels",
        ],
      },
    ],
  },
  {
    n: 4,
    title: "Information Sharing & Disclosure",
    blocks: [
      {
        h: "4.1 We Do Not Sell Your Data",
        p: `We do not sell, rent or trade your personal information, and we do not share it with third parties for their own marketing — including affiliates. SMS/text-messaging consent and the phone numbers collected for messaging are never shared with or sold to any third party.`,
      },
      {
        h: "4.2 Limited Sharing",
        p: "We share personal information only in these situations:",
        ul: [
          "Service providers: with vendors who help us run the business — email and marketing platforms, payment processors, analytics tools, event-hosting platforms, support systems and cloud hosting — under contracts that limit their use of the data",
          "Legal requirements: when required by law, court order or government authority, or to enforce our Terms of Service or protect against fraud, harm or illegal activity",
          "Business transfers: in connection with a merger, acquisition, financing or sale of assets, with notice before your information becomes subject to a different policy",
          "With your consent: when you have specifically authorised a disclosure",
        ],
      },
      {
        h: "4.3 Aggregated & De-Identified Data",
        p: `We may use and share aggregated or de-identified data that cannot reasonably be used to identify you for research, analytics and marketing.`,
      },
    ],
  },
  {
    n: 5,
    title: "Data Retention",
    blocks: [
      {
        p: `We keep personal information only as long as needed for the purposes described in this Policy or as required by law. As a general guide: lead data is kept for [retention period, e.g. 3 years] from your last engagement or until you unsubscribe; customer data is kept for the length of our relationship plus [retention period, e.g. 7 years] for legal and accounting purposes; email-engagement and support records are kept for [retention period, e.g. 2 years]; and website analytics are kept for [retention period, e.g. 26 months].`,
      },
      {
        p: `You may ask us to delete your personal information at any time, and we will do so within [response window, e.g. 30 days] except where the law requires us to keep it.`,
      },
    ],
  },
  {
    n: 6,
    title: "Your Privacy Rights & Choices",
    blocks: [
      {
        h: "6.1 Access, Correction & Portability",
        p: `You may ask for a copy of the personal information we hold about you, ask us to correct inaccurate information, and ask to receive your data in a portable format.`,
      },
      {
        h: "6.2 Opt-Out",
        ul: [
          "Email: use the unsubscribe link in any marketing email, or contact us",
          "SMS: reply STOP to any message",
          "Cookies: change your browser settings to block or delete cookies",
          "Targeted advertising: use the opt-out tools offered by the relevant ad networks and industry programmes",
        ],
      },
      {
        h: "6.3 California Residents (CCPA/CPRA)",
        p: `If you are a California resident, you have the right to know what personal information we collect and how we use it, to request deletion, to opt out of any "sale" or "sharing" of personal information (we do not sell or share it as those terms are defined), and not to be discriminated against for exercising your rights.`,
      },
      {
        h: "6.4 EU/EEA & UK Residents (GDPR)",
        p: `If you are in the EU, EEA or UK, you have the right to access, correct and delete your personal information, to restrict or object to processing, to data portability, to withdraw consent at any time, and to complain to your local data protection authority. Our legal bases for processing are consent, performance of a contract, compliance with a legal obligation, and our legitimate interests.`,
      },
      {
        h: "6.5 How to Exercise Your Rights",
        p: `Contact us at [support email] to make any of these requests. We may need to verify your identity before we act.`,
      },
    ],
  },
  {
    n: 7,
    title: "Data Security",
    blocks: [
      {
        p: `We use reasonable, industry-standard safeguards — including encryption in transit (SSL/TLS), access controls, and staff training on data protection — to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a breach affects your personal information, we will notify you and any regulators as required by applicable law.`,
      },
    ],
  },
  {
    n: 8,
    title: "Cookies & Tracking Technologies",
    blocks: [
      {
        p: "We use the following categories of cookies and similar technologies:",
        ul: [
          "Essential: session management, security and core site functionality",
          "Performance: analytics, optimisation and error tracking",
          "Marketing: retargeting, audience building and conversion tracking",
          "Third-party: [list the tools you actually use, e.g. Google Analytics, Meta Pixel, TikTok Pixel]",
        ],
      },
      {
        p: `By using the Site you consent to our use of cookies as described here. You can withdraw consent at any time through your browser settings or any cookie controls we provide.`,
      },
    ],
  },
  {
    n: 9,
    title: "Third-Party Links & Services",
    blocks: [
      {
        p: `The Site may link to websites and services we do not operate. This Policy does not cover them. Please review their own privacy policies before giving them your information.`,
      },
    ],
  },
  {
    n: 10,
    title: "Changes to This Policy",
    blocks: [
      {
        p: `We may update this Policy from time to time. We will post the updated version on the Site, change the "Last Updated" date, and, for material changes, provide additional notice. Your continued use of the Site after an update means you accept the revised Policy.`,
      },
    ],
  },
  {
    n: 11,
    title: "Jurisdiction-Specific Provisions",
    blocks: [
      {
        h: "United States",
        p: `This Policy is intended to comply with applicable U.S. federal and state privacy laws, including the CCPA/CPRA, COPPA and CAN-SPAM.`,
      },
      {
        h: "EU / EEA / UK",
        p: `Where the GDPR or UK GDPR applies, we process personal information on the legal bases listed in Section 6.4 and honour the rights described there.`,
      },
      {
        h: "Canada",
        p: `This Policy is intended to comply with PIPEDA and applicable provincial privacy legislation.`,
      },
    ],
  },
  {
    n: 12,
    title: "Contact",
    blocks: [
      {
        p: `Questions or requests about this Policy or your personal information can be sent to [support email] or [company mailing address].`,
      },
    ],
  },
];

const CSS = `
.legal-page{
  --bg:#05080f; --border:rgba(74,158,255,.16); --blue:#4a9eff;
  --text:#fff; --text-dim:rgba(255,255,255,.82); --text-mut:rgba(255,255,255,.55);
  background:var(--bg); color:var(--text-dim);
  font-family:var(--lg-font),-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:15.5px; line-height:1.75; -webkit-font-smoothing:antialiased; min-height:100vh;
}
.legal-page *{box-sizing:border-box;margin:0;padding:0;}
.legal-page ::selection{background:var(--blue);color:#fff;}
.legal-page .lg-wrap{max-width:780px;margin:0 auto;padding:72px 24px 96px;}
.legal-page .lg-eyebrow{font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);}
.legal-page h1{font-size:clamp(30px,5vw,42px);font-weight:900;letter-spacing:-.02em;color:#fff;margin:14px 0 10px;}
.legal-page .lg-updated{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-mut);}
.legal-page section{margin-top:40px;}
.legal-page section h2{font-size:19px;font-weight:800;letter-spacing:-.01em;color:#fff;margin-bottom:14px;}
.legal-page section h2 .n{color:var(--blue);font-family:var(--lg-font);margin-right:8px;}
.legal-page section h3{font-size:14.5px;font-weight:800;color:#fff;margin:18px 0 6px;}
.legal-page section p{margin-bottom:12px;}
.legal-page section ul{margin:8px 0 12px;padding-left:20px;}
.legal-page section li{margin-bottom:8px;}
.legal-page .lg-foot{margin-top:64px;padding-top:24px;border-top:1px solid var(--border);display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:space-between;}
.legal-page .lg-foot a{color:var(--text-dim);text-decoration:none;font-size:13.5px;}
.legal-page .lg-foot a:hover{color:var(--blue);}
.legal-page .lg-copy{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);}
`;

export default function PrivacyPage() {
  return (
    <div className={`legal-page ${font.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lg-wrap">
        <span className="lg-eyebrow">EcomSimulation</span>
        <h1>Privacy Policy</h1>
        <div className="lg-updated">Last Updated: {LAST_UPDATED}</div>

        {SECTIONS.map((s) => (
          <section key={s.n}>
            <h2>
              <span className="n">{s.n}.</span>
              {s.title}
            </h2>
            {s.blocks.map((b, i) => (
              <div key={i}>
                {b.h && <h3>{b.h}</h3>}
                {b.p && <p>{b.p}</p>}
                {b.ul && (
                  <ul>
                    {b.ul.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}

        <div className="lg-foot">
          <div style={{ display: "flex", gap: 18 }}>
            <a href="/home">Home</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="lg-copy">© {new Date().getFullYear()} EcomSimulation. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
