import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--lg-font" });

export const metadata: Metadata = {
  title: "Terms of Service — EcomSimulation",
  description: "The terms that govern your use of the EcomSimulation website and services.",
};

const LAST_UPDATED = "February 9, 2026";

/*
 * NOTE: This is a structural template, not legal advice. Before publishing:
 *  - replace every [bracketed] placeholder with EcomSimulation's real details
 *  - confirm the refund policy, governing law and SMS terms with counsel
 */

type Block = { h?: string; p?: string; ul?: string[] };
type Section = { n: number; title: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    n: 1,
    title: "Agreement to Terms",
    blocks: [
      {
        p: `By accessing or using this website, its landing pages and related digital properties (together, the "Site"), and by purchasing or using our information products, memberships, coaching, workshops, courses and related services (together, the "Services"), you agree to be bound by these Terms of Service (the "Terms"). If you do not agree, do not use the Site or the Services.`,
      },
      {
        p: `EcomSimulation ([legal entity name] — "Company," "we," "us," or "our") may update these Terms at any time. Changes take effect when posted. Your continued use of the Site or Services after a change means you accept the updated Terms.`,
      },
      {
        p: `By joining a program, you agree that we may reference your participation and results as a testimonial in our marketing.`,
      },
    ],
  },
  {
    n: 2,
    title: "Licence & Restrictions",
    blocks: [
      {
        h: "2.1 Limited Licence",
        p: `We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Site and Services for your own personal, non-commercial use, subject to these Terms.`,
      },
      {
        h: "2.2 Prohibited Uses",
        p: "You agree not to:",
        ul: [
          "Use the Site or Services for any unlawful purpose or in breach of any applicable law, or engage in fraud, misrepresentation or deceptive conduct",
          "Infringe the intellectual property, privacy or other rights of any person",
          "Attempt to gain unauthorised access to the Site, the Services or any related systems, or bypass security or authentication measures",
          "Transmit viruses or harmful code, attempt to disrupt or overload the Services, or scrape or automatically extract data without our permission",
          "Spam, harass, threaten or abuse others, or post obscene, defamatory or abusive content",
          "Resell, redistribute, sub-licence or commercially exploit the Services, or create derivative works, without our prior written permission",
          "Share your login credentials or account access with anyone else",
          "Use the Services to build or assist a competing offering",
          "Reproduce, distribute or publicly display our Content, or remove or alter any copyright notice, trademark or proprietary marking",
        ],
      },
    ],
  },
  {
    n: 3,
    title: "Intellectual Property",
    blocks: [
      {
        h: "3.1 Our Ownership",
        p: `All material on the Site and within the Services — including text, graphics, logos, images, video, audio, code and design (the "Content") — is owned by the Company or its licensors and is protected by copyright, trademark and other laws.`,
      },
      {
        h: "3.2 Your Rights",
        p: `You may view, download and print Content solely for your own personal, non-commercial use. You may not modify, reproduce, distribute, transmit, display or perform the Content without our prior written permission.`,
      },
      {
        h: "3.3 Content You Submit",
        p: `If you submit testimonials, reviews, feedback or other material ("User Content"), you grant us a worldwide, royalty-free, perpetual and irrevocable licence to use, reproduce, modify, distribute and display it in any medium. You confirm that you own or have the right to grant that licence and that your User Content does not infringe anyone's rights.`,
      },
      {
        h: "3.4 Third-Party Content",
        p: `The Site and Services may include material from third parties. We do not endorse it and are not responsible for it; its use is governed by the relevant third party's own terms.`,
      },
    ],
  },
  {
    n: 4,
    title: "Information Products & Services",
    blocks: [
      {
        h: "4.1 Descriptions",
        p: `We aim to describe our products and services accurately, but we do not warrant that descriptions, pricing or availability are error-free, and we may correct errors and update information without notice.`,
      },
      {
        h: "4.2 Access & Delivery",
        p: `Digital products are delivered through login credentials, download links or platform access, and that access is personal and non-transferable. Live calls, workshops and events are delivered by links and materials sent to the email address you provide; recordings may be made available afterwards, and we may reschedule or cancel an event on reasonable notice. Course and program access runs for the period stated at purchase. Materials are provided "as is."`,
      },
      {
        h: "4.3 Your Responsibilities",
        p: `You are responsible for maintaining a compatible device and software, a stable internet connection, an active and monitored email address, and the security of your login credentials. We are not responsible for issues on your side of the connection.`,
      },
    ],
  },
  {
    n: 5,
    title: "Earnings Disclaimer",
    blocks: [
      {
        h: "5.1 No Income Guarantee",
        p: `Our products, courses, coaching and services are educational. They do not guarantee any specific result, income or financial outcome. Your results depend on factors including your prior experience, the time and effort you put in, how you implement what you learn, market conditions, and your individual circumstances.`,
      },
      {
        h: "5.2 Results Shown Are Not Typical",
        p: `Any case studies, testimonials, figures or examples of results are not typical and do not represent average results. Past performance does not indicate future results, and individual results vary widely.`,
      },
      {
        h: "5.3 No Liability for Your Results",
        p: `We are not responsible for your financial results or lack of them, for business decisions you make based on our Content, for market or economic changes, for your failure to implement, or for any loss or damage arising from your use of the Services.`,
      },
      {
        h: "5.4 Responsible Use",
        p: `The Services are for educational purposes only. You should do your own research and due diligence, understand that any business activity carries risk, and consult qualified professionals before making significant decisions.`,
      },
    ],
  },
  {
    n: 6,
    title: "Disclaimer of Warranties & Limitation of Liability",
    blocks: [
      {
        h: "6.1 Disclaimer of Warranties",
        p: `THE SITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY AND UNINTERRUPTED ACCESS.`,
      },
      {
        h: "6.2 Limitation of Liability",
        p: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR LOST PROFITS, AND OUR TOTAL LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE AMOUNT YOU PAID US FOR THE SERVICES GIVING RISE TO THE CLAIM.`,
      },
    ],
  },
  {
    n: 7,
    title: "Indemnification",
    blocks: [
      {
        p: `You agree to indemnify, defend and hold harmless the Company and its officers, directors, employees, agents and affiliates from any claim, damage, loss, liability or expense (including reasonable legal fees) arising from your use of the Site or Services, your breach of these Terms, your breach of any law or third-party right, or your User Content.`,
      },
    ],
  },
  {
    n: 8,
    title: "Accounts & Security",
    blocks: [
      {
        p: `If you create an account, you agree to provide accurate information, keep your password confidential, take responsibility for all activity under your account, and tell us promptly of any unauthorised use. We may suspend or terminate any account that breaches these Terms.`,
      },
    ],
  },
  {
    n: 9,
    title: "Payment Terms",
    blocks: [
      {
        p: `Unless stated otherwise, all prices are in USD. We accept the payment methods shown at checkout. If you buy a subscription or recurring plan, you authorise us to charge your payment method on a recurring basis until you cancel. You are responsible for keeping your payment details current and for any applicable taxes.`,
      },
    ],
  },
  {
    n: 10,
    title: "Refund Policy",
    blocks: [
      {
        p: `Our products and services are digital and access is delivered on enrolment. [Insert EcomSimulation's actual refund terms here — for example whether all sales are final, or whether a limited refund window or guarantee applies. Do not publish this page until this section reflects your real, counsel-approved policy.]`,
      },
      {
        p: `By enrolling, you acknowledge and accept the refund policy stated in this section.`,
      },
    ],
  },
  {
    n: 11,
    title: "SMS & Text Messaging",
    blocks: [
      {
        p: `We may send SMS messages as part of our coaching and program communications. If you opt in, message and data rates may apply and message frequency varies with your activity and program stage.`,
      },
      {
        p: `You can stop messages at any time by replying STOP; we will send one confirmation message and then stop. Reply HELP for assistance, or contact us at [support email]. Carriers are not liable for delayed or undelivered messages.`,
      },
      {
        p: `Consent to receive SMS is not a condition of any purchase or enrolment. SMS opt-in data and consent are not shared with third parties or affiliates for their marketing.`,
      },
    ],
  },
  {
    n: 12,
    title: "Third-Party Links & Services",
    blocks: [
      {
        p: `The Site may link to third-party websites, apps and services. We do not control or endorse them and are not responsible for their content or for any loss arising from your use of them.`,
      },
    ],
  },
  {
    n: 13,
    title: "Confidentiality",
    blocks: [
      {
        p: `Personal information you give us is handled under our Privacy Policy. If we share confidential strategies, methods or materials with you, you agree to keep them confidential, not to disclose them to third parties without our permission, and not to use them for competitive purposes.`,
      },
    ],
  },
  {
    n: 14,
    title: "Dispute Resolution",
    blocks: [
      {
        p: `You agree that any legal proceeding will be brought on an individual basis only, and not as a class action, class arbitration or representative action. [Confirm with counsel whether an arbitration clause and venue should be added here.]`,
      },
    ],
  },
  {
    n: 15,
    title: "Severability",
    blocks: [
      {
        p: `If any provision of these Terms is found invalid or unenforceable, it will be modified to the minimum extent needed to make it enforceable, or if that is not possible, severed. The remaining provisions stay in full force.`,
      },
    ],
  },
  {
    n: 16,
    title: "Entire Agreement",
    blocks: [
      {
        p: `These Terms, together with our Privacy Policy and any other policy referenced here, are the entire agreement between you and the Company regarding the Site and Services.`,
      },
    ],
  },
  {
    n: 17,
    title: "Governing Law",
    blocks: [
      {
        p: `These Terms are governed by the laws of [governing jurisdiction], without regard to conflict-of-laws rules, and comply with applicable U.S. federal and state law. If you are a California resident, an EU/EEA consumer, or a Canadian resident, you may have additional statutory rights that these Terms do not remove.`,
      },
    ],
  },
  {
    n: 18,
    title: "Changes to These Terms",
    blocks: [
      {
        p: `We may change these Terms at any time by posting the updated version on the Site. Your continued use of the Site or Services after a change means you accept it.`,
      },
    ],
  },
  {
    n: 19,
    title: "Contact",
    blocks: [
      {
        p: `Questions about these Terms can be sent to [support email] or [company mailing address].`,
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

export default function TermsPage() {
  return (
    <div className={`legal-page ${font.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lg-wrap">
        <span className="lg-eyebrow">EcomSimulation</span>
        <h1>Terms of Service</h1>
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
