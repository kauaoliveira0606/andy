import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--lg-font" });

export const metadata: Metadata = {
  title: "Privacy Policy — EcomSimulation",
  description: "How EcomSimulation collects, uses and protects your information.",
};

const LAST_UPDATED = "September 8, 2026";

/* NOTE: still to confirm before publishing — legal entity name (§1),
   company mailing address (§12), and whether GA / LinkedIn Insight Tag
   should be listed alongside the Meta Pixel in §8. */

type Block = { h?: string; sub?: string; p?: string; ul?: string[] };
type Section = { n: number; title: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    n: 1,
    title: "Introduction",
    blocks: [
      {
        p: `This Privacy Policy (the "Policy") explains how EcomSimulation ([legal entity name] — "we," "us," "our," or "Company") collects, uses, discloses and safeguards your information when you visit our website, landing pages and related digital properties (together, the "Site"), and when you interact with our information products, webinars, workshops and services (together, the "Services").`,
      },
      {
        p: `Please read this Policy carefully. If you do not agree with our policies and practices, please do not use our Site or Services.`,
      },
    ],
  },
  {
    n: 2,
    title: "Information We Collect",
    blocks: [
      { h: "2.1 Information You Provide Directly" },
      {
        sub: "Registration & Lead Capture",
        ul: [
          "Name, email address, phone number",
          "Company name and industry",
          "Job title and experience level",
          "Any information you submit through forms, surveys, or questionnaires",
        ],
      },
      {
        sub: "Webinar & Workshop Registration",
        ul: [
          "Registration details (name, email, company)",
          "Attendance and engagement data",
          "Questions submitted during live events",
          "Feedback and survey responses",
        ],
      },
      {
        sub: "Purchase & Payment Information",
        ul: [
          "Billing name and address",
          "Payment method details (processed securely through third-party payment processors)",
          "Purchase history and transaction records",
          "Refund requests and related communications",
        ],
      },
      {
        sub: "Communications",
        ul: [
          "Email inquiries and support requests",
          "Chat messages and customer service interactions",
          "Feedback, testimonials, and reviews you voluntarily provide",
          "Survey responses",
        ],
      },
      { h: "2.2 Information Collected Automatically" },
      {
        sub: "Website Usage Data",
        ul: [
          "IP address and device identifiers",
          "Browser type, operating system, and device type",
          "Pages visited, time spent on pages, and click patterns",
          "Referral source and exit pages",
          "Search queries and interaction history",
        ],
      },
      {
        sub: "Cookies & Tracking Technologies",
        ul: [
          "Session cookies (temporary, deleted when browser closes)",
          "Persistent cookies (remain on your device for specified periods)",
          "Pixel tags and web beacons",
          "Local storage and similar technologies",
        ],
      },
      {
        sub: "Analytics & Performance",
        ul: [
          "Heatmaps showing where users click and scroll",
          "Video engagement metrics (if applicable)",
          "Form completion rates and abandonment data",
          "Device and browser performance data",
        ],
      },
      {
        sub: "Email Engagement",
        ul: [
          "Email open rates and click-through rates",
          "Delivery status and bounce information",
          "Unsubscribe and preference data",
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
          "Deliver Services: Process registrations, deliver webinars, provide access to information products, and fulfill orders",
          "Communication: Send transactional emails, marketing emails, and educational content",
          "Personalization: Customize your experience and tailor content to your interests",
          "Analytics & Improvement: Analyze user behavior, identify trends, and improve Services",
          "Lead Nurturing: Segment audiences and send targeted follow-up communications",
          "Customer Support: Respond to inquiries and provide technical assistance",
          "Legal Compliance: Fulfill legal obligations and protect against fraud",
        ],
      },
      {
        h: "3.2 Marketing & Promotional Uses",
        ul: [
          "Send promotional emails about new products, webinars, and special offers",
          "Create audience segments for targeted advertising",
          "Conduct A/B testing on email subject lines and landing page copy",
          "Build lookalike audiences for paid advertising campaigns",
          "Track conversion paths and attribution across marketing channels",
        ],
      },
    ],
  },
  {
    n: 4,
    title: "Information Sharing & Disclosure",
    blocks: [
      {
        h: "4.0 No Sale or Transfer of Personal Data",
        p: `We do not sell, share, rent, or transfer your personal information to third parties for their own marketing purposes, including affiliates. Your data is never used for any purpose beyond what is described in this Policy. SMS/text messaging consent and phone numbers collected for communication purposes will not be shared with or sold to any third party. All the above categories exclude text messaging originator opt-in data and consent; this information won't be shared with any third parties.`,
      },
      {
        p: "We only share your personal information in the following limited circumstances:",
        ul: [
          "Service Fulfillment: With service providers that help us deliver our products or services (for example, a shipping partner that sends a physical order you placed).",
          "Business Transfers: In connection with a merger, acquisition, or sale of our business assets.",
          "Law Enforcement: When required by applicable law, court order, or government authority.",
          "With Your Consent: When you have explicitly authorized us to share your information for a specific purpose.",
        ],
      },
      {
        h: "4.1 Third-Party Service Providers",
        p: `We share information with trusted vendors who assist in our operations, including email and marketing automation platforms, payment processors, analytics and tracking tools, webinar and event hosting platforms, customer support systems, and cloud hosting providers.`,
      },
      {
        h: "4.2 Legal Requirements & Protection",
        p: `We may disclose information when required by law, to enforce our Terms of Service, protect against fraud or illegal activity, or protect the rights and safety of our Company, users, and the public.`,
      },
      {
        h: "4.3 Business Transfers",
        p: `If our Company is involved in a merger, acquisition, bankruptcy, or asset sale, your information may be transferred as part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.`,
      },
      {
        h: "4.4 Aggregated & De-Identified Data",
        p: `We may share aggregated, anonymized data that cannot identify you personally with partners and advertisers for research, marketing, and analytics purposes.`,
      },
    ],
  },
  {
    n: 5,
    title: "Data Retention",
    blocks: [
      {
        ul: [
          "Lead Data: Retained for 3 years from last engagement, or until you unsubscribe",
          "Customer Data: Retained for the duration of our relationship plus 7 years for legal compliance",
          "Email Engagement Data: Retained for 2 years for analytics purposes",
          "Website Analytics: Retained for 26 months",
          "Support Communications: Retained for 2 years after resolution",
        ],
      },
      {
        p: `You may request deletion of your personal information at any time. We will comply within 30 days, except where retention is required by law.`,
      },
    ],
  },
  {
    n: 6,
    title: "Your Privacy Rights & Choices",
    blocks: [
      {
        h: "6.1 Access & Portability",
        p: `You have the right to request a copy of the personal information we hold about you, receive your data in a portable format, and request correction of inaccurate information.`,
      },
      {
        h: "6.2 Opt-Out & Unsubscribe",
        ul: [
          "Email Marketing: Click the unsubscribe link in any marketing email or contact us",
          "Cookies: Adjust browser settings to disable cookies",
          "Targeted Advertising: Opt out through industry opt-out tools",
        ],
      },
      {
        h: "6.3 California Privacy Rights (CCPA)",
        p: `If you are a California resident, you have the right to know what personal information is collected, delete personal information, opt-out of the sale of personal information, and non-discrimination for exercising your rights.`,
      },
      {
        h: "6.4 European Privacy Rights (GDPR)",
        p: `If you are located in the EU/EEA, you have the right to access, correct, and delete your personal information, restrict or object to processing, data portability, withdraw consent at any time, and lodge a complaint with your local data protection authority.`,
      },
    ],
  },
  {
    n: 7,
    title: "Data Security",
    blocks: [
      {
        p: `We implement industry-standard security measures including SSL/TLS encryption, secure password hashing, regular security audits, access controls, firewalls, and employee training on data protection.`,
      },
      {
        p: `While we strive to protect your information, no security system is impenetrable. We cannot guarantee absolute security. In the event of a data breach, we will notify you within 30 days as required by law.`,
      },
    ],
  },
  {
    n: 8,
    title: "Cookies & Tracking Technologies",
    blocks: [
      {
        sub: "Types of Cookies We Use",
        ul: [
          "Essential Cookies: Session management, security, and site functionality",
          "Performance Cookies: Analytics, site optimization, and error tracking",
          "Marketing Cookies: Retargeting, audience segmentation, and conversion tracking",
          "Third-Party Cookies: Meta Pixel (Facebook/Instagram) and related advertising networks",
        ],
      },
      {
        p: `By using our Site, you consent to our use of cookies as described in this Policy. You can withdraw consent at any time through your browser settings.`,
      },
    ],
  },
  {
    n: 9,
    title: "Third-Party Links & Services",
    blocks: [
      {
        p: `Our Site may contain links to third-party websites and services not operated by us. This Privacy Policy does not apply to third-party services. We encourage you to review their privacy policies before providing personal information.`,
      },
    ],
  },
  {
    n: 10,
    title: "Policy Updates",
    blocks: [
      {
        p: `We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our Site, updating the "Last Updated" date, and sending email notifications for significant changes. Your continued use of our Site after updates constitutes your acceptance of the revised Privacy Policy.`,
      },
    ],
  },
  {
    n: 11,
    title: "Jurisdiction-Specific Provisions",
    blocks: [
      {
        sub: "United States",
        p: `This Policy complies with applicable U.S. federal and state privacy laws, including CCPA, COPPA, and CAN-SPAM.`,
      },
      {
        sub: "European Union / EEA",
        p: `Our legal basis for processing personal information includes consent, contract performance, legal obligation, and legitimate interests.`,
      },
      {
        sub: "Canada",
        p: `This Policy complies with PIPEDA and applicable provincial privacy laws.`,
      },
    ],
  },
  {
    n: 12,
    title: "Contact",
    blocks: [
      {
        p: `Questions or requests about this Policy or your personal information can be sent to info@ecomsimulation.io or [company mailing address].`,
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
.legal-page .lg-sub{display:block;font-weight:800;color:#fff;font-size:13.5px;margin:14px 0 4px;}
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
                {b.sub && <span className="lg-sub">{b.sub}</span>}
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
