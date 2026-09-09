import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--lg-font" });

export const metadata: Metadata = {
  title: "Terms of Service — EcomSimulation",
  description: "The terms that govern your use of the EcomSimulation website and services.",
};

const LAST_UPDATED = "September 8, 2026";

/* NOTE: [company mailing address] in §20 still to be filled in before publishing. */

type Block = { h?: string; sub?: string; p?: string; ul?: string[] };
type Section = { n: number; title: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    n: 1,
    title: "Agreement to Terms",
    blocks: [
      {
        p: `By accessing and using this website, landing pages, and related digital properties (collectively, the "Site"), and by purchasing or using our information products, webinars, workshops, courses, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Site or Services.`,
      },
      {
        p: `EcomSimulation ("Company," "we," "us," or "our") reserves the right to modify these Terms at any time. Changes become effective immediately upon posting. Your continued use of the Site and Services constitutes acceptance of modified Terms.`,
      },
      { p: `By joining our program, you agree for us to utilize you as a testimonial for our marketing.` },
    ],
  },
  {
    n: 2,
    title: "Use License & Restrictions",
    blocks: [
      {
        h: "2.1 Limited License",
        p: `We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Site and Services for personal, non-commercial purposes, subject to these Terms.`,
      },
      { h: "2.2 Prohibited Uses", p: "You agree NOT to:" },
      {
        sub: "Illegal Activity",
        ul: [
          "Use the Site or Services for any illegal purpose or in violation of any applicable laws",
          "Engage in fraud, misrepresentation, or deceptive practices",
          "Violate intellectual property rights, privacy rights, or other third-party rights",
        ],
      },
      {
        sub: "Unauthorized Access",
        ul: [
          "Attempt to gain unauthorized access to the Site, Services, or systems",
          "Use hacking, phishing, or other malicious techniques",
          "Bypass security measures or authentication protocols",
          "Access accounts that are not your own",
        ],
      },
      {
        sub: "Disruption & Abuse",
        ul: [
          "Transmit viruses, malware, or harmful code",
          "Engage in denial-of-service attacks or system overload attempts",
          "Spam, harass, threaten, or abuse other users",
          "Post obscene, defamatory, or abusive content",
          "Scrape, crawl, or automatically extract data without permission",
        ],
      },
      {
        sub: "Commercial Misuse",
        ul: [
          "Resell, redistribute, or commercially exploit the Services",
          "Create derivative works or modifications without permission",
          "Use the Services to compete with our business",
          "Share login credentials or access with unauthorized parties",
          "Use the Services for commercial purposes without a commercial license",
        ],
      },
      {
        sub: "Intellectual Property Violations",
        ul: [
          "Reproduce, distribute, or publicly display copyrighted content",
          "Remove or alter copyright notices, trademarks, or proprietary markings",
          "Use our trademarks, logos, or branding without permission",
        ],
      },
    ],
  },
  {
    n: 3,
    title: "Intellectual Property Rights",
    blocks: [
      {
        h: "3.1 Company Ownership",
        p: `All content on the Site and within the Services, including but not limited to text, graphics, logos, images, videos, audio, code, and design elements (collectively, "Content"), is the exclusive property of EcomSimulation or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.`,
      },
      {
        h: "3.2 Limited User Rights",
        p: `You may view, download, and print Content solely for personal, non-commercial use. You may not modify, reproduce, distribute, transmit, display, or perform the Content without our prior written permission.`,
      },
      {
        h: "3.3 User-Generated Content",
        p: `If you submit testimonials, reviews, feedback, or other content ("User Content"), you grant us a worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, distribute, and display your User Content in any medium. You represent that you own or have the right to grant this license and that your User Content does not infringe third-party rights.`,
      },
      {
        h: "3.4 Third-Party Content",
        p: `The Site and Services may contain content from third parties. We do not endorse or assume responsibility for third-party content. Use of third-party content is subject to their terms and licenses.`,
      },
    ],
  },
  {
    n: 4,
    title: "Information Products & Services",
    blocks: [
      {
        h: "4.1 Product Descriptions",
        p: `We strive to provide accurate descriptions of our information products and services. However, we do not warrant that descriptions, pricing, or availability are error-free. We reserve the right to correct errors and update information without notice.`,
      },
      { h: "4.2 Access & Delivery" },
      {
        sub: "Digital Products",
        ul: [
          "Access is provided via login credentials, download links, or platform access",
          "Access is personal and non-transferable",
          "We are not responsible for technical issues on your end (internet connection, device compatibility, etc.)",
          "We will make reasonable efforts to maintain service availability but do not guarantee uninterrupted access",
        ],
      },
      {
        sub: "Webinars & Live Events",
        ul: [
          "Attendance links and materials are provided via email",
          "Recordings may be made available after the event",
          "Attendance is not guaranteed if you fail to register or provide incorrect contact information",
          "We reserve the right to cancel or reschedule events with notice",
        ],
      },
      {
        sub: "Courses & Training",
        ul: [
          "Access is provided for the duration specified in your purchase",
          `Course materials are provided "as-is" without warranty`,
          "Completion certificates (if offered) are issued upon meeting specified requirements",
        ],
      },
      {
        h: "4.3 Technical Requirements",
        p: `You are responsible for maintaining compatible devices and software, a stable internet connection, an active and monitored email address, and protecting your login credentials.`,
      },
    ],
  },
  {
    n: 5,
    title: "Earnings Disclaimer",
    blocks: [
      {
        h: "5.1 No Income Guarantees",
        p: `IMPORTANT: Our information products, courses, webinars, and services are educational in nature and do not guarantee any specific results, income, or financial outcomes.`,
      },
      {
        p: `Your results depend on many factors including your prior knowledge and experience, the time and effort you invest, your implementation of strategies and tactics, market conditions and external factors, and your individual circumstances and capabilities.`,
      },
      {
        h: "5.2 Past Performance",
        p: `Any case studies, testimonials, or examples of results are not typical and do not represent average results. Past performance does not guarantee future results. Individual results vary widely.`,
      },
      {
        h: "5.3 No Liability for Results",
        p: `We are not responsible for your financial results or lack thereof, business decisions you make based on our content, market changes or economic conditions, your failure to implement strategies, or any losses or damages resulting from your use of our Services.`,
      },
      {
        h: "5.4 Responsible Use",
        p: `Our Services are intended for educational purposes only. We recommend consulting with qualified professionals before making major decisions, conducting your own research and due diligence, and understanding the risks involved in any business activity.`,
      },
    ],
  },
  {
    n: 6,
    title: "Limitation of Liability",
    blocks: [
      {
        h: "6.1 Disclaimer of Warranties",
        p: `THE SITE AND SERVICES ARE PROVIDED "AS-IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AND UNINTERRUPTED SERVICE.`,
      },
      {
        h: "6.2 Limitation of Damages",
        p: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ECOMSIMULATION SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, LOST PROFITS, OR ANY DAMAGES EXCEEDING THE AMOUNT YOU PAID FOR THE SERVICES.`,
      },
    ],
  },
  {
    n: 7,
    title: "Indemnification",
    blocks: [
      {
        p: `You agree to indemnify, defend, and hold harmless EcomSimulation, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from your use of the Site or Services, your violation of these Terms, your violation of any applicable laws or third-party rights, or your User Content.`,
      },
    ],
  },
  {
    n: 8,
    title: "User Accounts & Security",
    blocks: [
      {
        p: `If you create an account, you agree to provide accurate information, maintain the confidentiality of your password, accept responsibility for all activities under your account, and notify us immediately of unauthorized access. We reserve the right to suspend or terminate accounts that violate these Terms.`,
      },
    ],
  },
  {
    n: 9,
    title: "Payment Terms",
    blocks: [
      {
        p: `All prices are in USD. We accept major credit cards and other payment methods as indicated. If you purchase a subscription or recurring service, you authorize us to charge your payment method on a recurring basis. You are responsible for keeping your payment information current and for any applicable taxes.`,
      },
    ],
  },
  {
    n: 10,
    title: "Refund Policy",
    blocks: [
      { p: `All products and services provided are digital and access is delivered immediately upon enrollment. ALL SALES ARE FINAL.` },
      {
        p: `There are no refunds, chargebacks, reversals, or credits for any reason, including but not limited to: lack of results, failure to participate, scheduling conflicts, personal circumstances, change of mind, or perceived dissatisfaction.`,
      },
      { p: `By accessing the program, you explicitly acknowledge and accept this policy.` },
    ],
  },
  {
    n: 11,
    title: "SMS & Text Messaging Terms",
    blocks: [
      { p: `EcomSimulation offers SMS messaging as part of our 1-on-1 e-commerce training to build a store designed to exit.` },
      { p: `By opting in to receive SMS messages from us, you agree to the following terms:` },
      {
        ul: [
          `You can cancel the SMS service at any time. Just text STOP to the short code. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.`,
          "If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at info@ecomsimulation.io.",
          "Carriers are not liable for delayed or undelivered messages.",
          "Message and data rates may apply for any messages sent to you from us and to us from you. Message frequency varies. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.",
          "If you have any questions regarding privacy, please read our Privacy Policy.",
        ],
      },
    ],
  },
  {
    n: 12,
    title: "Third-Party Links & Services",
    blocks: [
      {
        p: `The Site may contain links to third-party websites, apps, and services. We do not endorse, control, or assume responsibility for third-party content or services. We are not liable for any damages or losses arising from third-party services.`,
      },
    ],
  },
  {
    n: 13,
    title: "Confidentiality",
    blocks: [
      {
        p: `Any personal information you provide is subject to our Privacy Policy. If we share confidential information, strategies, or proprietary methods, you agree to keep this information confidential, not disclose it to third parties without permission, and not use it for competitive purposes.`,
      },
    ],
  },
  {
    n: 14,
    title: "Dispute Resolution",
    blocks: [
      {
        p: `You agree that any legal proceedings shall be brought on an individual basis and not as a class action, class arbitration, or representative action.`,
      },
    ],
  },
  {
    n: 15,
    title: "Severability",
    blocks: [
      {
        p: `If any provision of these Terms is found to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, or if not possible, severed. The remaining provisions shall remain in full force and effect.`,
      },
    ],
  },
  {
    n: 16,
    title: "Entire Agreement",
    blocks: [
      {
        p: `These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and EcomSimulation regarding the Site and Services.`,
      },
    ],
  },
  {
    n: 17,
    title: "Jurisdiction",
    blocks: [
      {
        p: `These Terms comply with applicable U.S. federal and state laws. If you are a California resident, you have additional rights under California law. If you are located in the EU/EEA, you have consumer protection rights that cannot be waived. These Terms comply with applicable Canadian federal and provincial laws.`,
      },
    ],
  },
  {
    n: 18,
    title: "Modifications to Terms",
    blocks: [
      {
        p: `We may modify these Terms at any time by posting updated Terms on the Site. Your continued use of the Site and Services after modifications constitutes your acceptance of the updated Terms.`,
      },
    ],
  },
  {
    n: 19,
    title: "SMS & Text Message Communications",
    blocks: [
      {
        ul: [
          "Message frequency: Message frequency varies based on your activity and program stage.",
          "Consent to receive SMS messages is not a condition of any purchase or enrollment in our services.",
          "Text messaging originator opt-in data and consent will not be shared with any third parties or affiliates for marketing or promotional purposes.",
        ],
      },
    ],
  },
  {
    n: 20,
    title: "Contact",
    blocks: [{ p: `Questions about these Terms can be sent to info@ecomsimulation.io or [company mailing address].` }],
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
