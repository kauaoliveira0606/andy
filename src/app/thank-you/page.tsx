import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Barlow, JetBrains_Mono } from "next/font/google";

const fontHead = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-head" });
const fontBody = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

/* Optional: point this at a real "watch more" resource before launch. */
const MORE_VIDEOS_URL = "#";

export const metadata: Metadata = {
  title: "EcomSimulation — You're Almost In",
  description: "One step left to confirm your call. Reply to the email in your inbox and watch the video below before your call.",
};

const CSS = `
.ty-page{
  --bg:#0A0A0C; --bg-pure:#000000; --bg-card:#131316;
  --accent:#2A78D6; --accent-bright:#8FC7FF; --accent-deep:#1B5FB0;
  --accent-text:#8CC6FF;
  --text:rgba(255,255,255,0.98); --text-mute:rgba(255,255,255,0.96);
  --text-dim:rgba(255,255,255,0.82); --text-faint:rgba(255,255,255,0.62);
  --line:rgba(255,255,255,0.08); --line-soft:rgba(255,255,255,0.05); --line-strong:rgba(255,255,255,0.18);
  background:var(--bg-pure); color:var(--text);
  font-family:var(--font-body),system-ui,sans-serif; font-size:17px; line-height:1.55;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.ty-page *{box-sizing:border-box;}
.ty-page h1,.ty-page h2,.ty-page h3,.ty-page h4{
  font-family:var(--font-head),system-ui,sans-serif; font-weight:700; letter-spacing:-0.022em;
  margin:0; line-height:1.1; color:var(--text); text-wrap:balance;
}
.ty-page h1{font-size:clamp(32px,4.2vw,56px);letter-spacing:-0.03em;line-height:1.08;font-weight:700;}
.ty-page h2{font-size:clamp(28px,3.4vw,44px);}
.ty-page h3{font-size:clamp(20px,2vw,26px);}
.ty-page a{color:inherit;}

.ty-page .container-wide{max-width:1320px;margin:0 auto;padding:0 32px;}

.ty-page .eyebrow{font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:var(--accent-text);display:inline-flex;align-items:center;gap:12px;}
.ty-page .eyebrow.center{justify-content:center;}

/* ---------- status pulse ---------- */
.ty-page .status-pulse{
  display:inline-flex;align-items:center;gap:10px;padding:10px 20px;border-radius:100px;
  background:rgba(42,120,214,0.22);border:1px solid rgba(140,198,255,0.55);
  font-family:var(--font-mono),ui-monospace,monospace;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
  color:#EAF3FF;margin-bottom:22px;box-shadow:0 8px 24px -10px rgba(42,120,214,0.4);
}
.ty-page .status-pulse .pulse-dot{position:relative;width:9px;height:9px;border-radius:50%;background:var(--accent);}
.ty-page .status-pulse .pulse-dot::after{content:"";position:absolute;inset:-4px;border-radius:50%;background:rgba(42,120,214,0.35);animation:ty-pulse-ring 1.8s ease-out infinite;}
@keyframes ty-pulse-ring{0%{transform:scale(0.8);opacity:0.8;}100%{transform:scale(2.2);opacity:0;}}

/* ---------- hero ---------- */
.ty-page .hero{padding:36px 0 56px;background:var(--bg-pure);}
.ty-page .hero-inner{max-width:960px;margin:0 auto;padding:0 32px;display:flex;flex-direction:column;align-items:center;text-align:center;}
.ty-page .hero h1{margin-bottom:20px;}
.ty-page .hero h1 em{color:var(--accent-text);font-style:normal;}
.ty-page .hero-subhead{font-size:clamp(17px,1.4vw,19px);color:var(--text-mute);line-height:1.55;max-width:52ch;margin:0 auto 32px;}
.ty-page .hero-subhead b{color:var(--text);font-weight:600;}

/* ---------- stepper ---------- */
.ty-page .stepper{display:flex;align-items:flex-start;gap:0;max-width:560px;margin:8px auto 36px;padding:0 8px;width:100%;}
.ty-page .step-node{display:flex;flex-direction:column;align-items:center;gap:10px;width:90px;font-family:var(--font-mono),ui-monospace,monospace;font-size:11.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-faint);text-align:center;line-height:1.3;}
.ty-page .step-node .node-circle{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-head),system-ui,sans-serif;font-size:18px;font-weight:700;border:2px solid var(--line);background:var(--bg-card);color:var(--text-faint);transition:all .3s ease;}
.ty-page .step-node.done .node-circle{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 0 4px rgba(42,120,214,0.2);}
.ty-page .step-node.done{color:var(--text-mute);}
.ty-page .step-node.pending .node-circle{background:rgba(42,120,214,0.12);border-color:rgba(140,198,255,0.6);color:var(--accent-text);box-shadow:0 0 0 4px rgba(42,120,214,0.12);}
.ty-page .step-node.pending{color:var(--accent-text);}
.ty-page .step-bar{flex:1;height:2px;margin-top:25px;min-width:16px;background:var(--line);border-radius:2px;}
.ty-page .step-bar.done{background:var(--accent);}
.ty-page .step-bar.pending{background:linear-gradient(90deg,var(--accent),rgba(42,120,214,0.2));}

/* ---------- start-here ---------- */
.ty-page .start-here{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-mono),ui-monospace,monospace;font-weight:500;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:var(--accent-text);margin-bottom:28px;}
.ty-page .start-here::before,.ty-page .start-here::after{content:"";display:inline-block;width:22px;height:1px;background:var(--accent-text);opacity:0.45;}

/* ---------- vsl ---------- */
.ty-page .vsl-wrap{position:relative;margin:0 auto;max-width:920px;width:100%;}
.ty-page .vsl-frame{
  position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#000;
  box-shadow:0 0 0 1px rgba(42,120,214,0.18),0 40px 80px -30px rgba(42,120,214,0.25),0 50px 100px -30px rgba(0,0,0,0.6);
  aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;
}
.ty-page .vsl-play{width:76px;height:76px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;padding-left:5px;box-shadow:0 12px 40px -8px rgba(42,120,214,0.7);}
.ty-page .vsl-note{position:absolute;bottom:14px;left:0;right:0;text-align:center;font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-faint);}

/* ---------- next steps ---------- */
.ty-page .next-steps{background:var(--bg);border-top:1px solid var(--line-soft);border-bottom:1px solid var(--line-soft);padding:64px 0;}
.ty-page .section-header{max-width:760px;margin:0 auto 36px;text-align:center;}
.ty-page .section-header h2{margin-top:14px;}
.ty-page .section-header h2 em{color:var(--accent-text);font-style:normal;}
.ty-page .steps-grid{display:flex;flex-direction:column;gap:20px;max-width:880px;margin:0 auto;}
.ty-page .step-card{
  background:var(--bg-card);border:1px solid var(--line);border-radius:18px;
  padding:28px 32px 28px 28px;display:grid;grid-template-columns:90px 1fr;gap:28px;align-items:start;
  transition:border-color .25s ease,transform .25s ease,box-shadow .25s ease;position:relative;overflow:hidden;
}
.ty-page .step-card.action{border-color:rgba(42,120,214,0.45);background:linear-gradient(135deg,rgba(42,120,214,0.06),var(--bg-card) 50%);}
.ty-page .step-card:hover{border-color:rgba(42,120,214,0.4);transform:translateY(-2px);box-shadow:0 24px 50px -28px rgba(42,120,214,0.25);}
.ty-page .step-num-block{display:flex;flex-direction:column;align-items:center;gap:8px;}
.ty-page .step-num{font-family:var(--font-head),system-ui,sans-serif;font-weight:800;font-size:56px;line-height:1;letter-spacing:-0.04em;color:var(--accent-text);font-variant-numeric:tabular-nums;}
.ty-page .step-num-tag{font-family:var(--font-mono),ui-monospace,monospace;font-size:9.5px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent-text);background:rgba(42,120,214,0.12);border:1px solid rgba(140,198,255,0.32);padding:4px 8px;border-radius:100px;white-space:nowrap;}
.ty-page .step-content h3{font-family:var(--font-head),system-ui,sans-serif;font-weight:700;font-size:clamp(20px,2.4vw,26px);letter-spacing:-0.022em;line-height:1.2;color:var(--text);margin-bottom:10px;}
.ty-page .step-content p{font-size:15.5px;color:var(--text-mute);line-height:1.6;}
.ty-page .step-content p b{color:var(--text);font-weight:600;}
.ty-page .step-arrow{display:inline-flex;align-items:center;margin-top:14px;font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent-text);font-weight:700;gap:8px;}
.ty-page .step-arrow .arrow-glyph{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--accent);color:#fff;}

/* ---------- cta bridge ---------- */
.ty-page .cta-bridge{padding:64px 32px;background:var(--bg-pure);text-align:center;}
.ty-page .cta-bridge-inner{max-width:720px;margin:0 auto;background:var(--bg-card);border:1px solid rgba(42,120,214,0.25);border-radius:20px;padding:40px 48px;box-shadow:0 0 0 1px rgba(42,120,214,0.08),0 32px 64px -24px rgba(42,120,214,0.15);}
.ty-page .cta-bridge h3{font-family:var(--font-head),system-ui,sans-serif;font-size:clamp(20px,2.2vw,26px);font-weight:700;letter-spacing:-0.022em;color:var(--text);margin-bottom:12px;}
.ty-page .cta-bridge p{font-size:15.5px;color:var(--text-mute);line-height:1.6;margin-bottom:28px;}
.ty-page .cta-bridge-btn{display:inline-flex;align-items:center;gap:10px;background:var(--accent);color:#fff;font-family:var(--font-mono),ui-monospace,monospace;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:16px 36px;border-radius:100px;transition:background .2s ease,transform .15s ease,box-shadow .2s ease;box-shadow:0 8px 24px -8px rgba(42,120,214,0.5);}
.ty-page .cta-bridge-btn:hover{background:var(--accent-bright);color:#0A0A0C;transform:translateY(-2px);box-shadow:0 14px 32px -10px rgba(42,120,214,0.55);}
.ty-page .cta-bridge-btn .btn-arrow{font-size:16px;line-height:1;}

/* ---------- disclaimer + footer ---------- */
.ty-page .disclaimer-section{background:var(--bg-pure);padding:0 32px 8px;text-align:center;}
.ty-page .disclaimer-section p{max-width:80ch;margin:0 auto;font-size:11.5px;line-height:1.6;color:var(--text-faint);}
.ty-page .site-footer{background:var(--bg-pure);padding:40px 0 48px;border-top:1px solid var(--line-soft);color:var(--text-mute);}
.ty-page .foot-inner{display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;}
.ty-page .brand-row{display:flex;align-items:center;gap:12px;}
.ty-page .brand-mark svg{width:32px;height:32px;display:block;border-radius:8px;}
.ty-page .brand-word{font-family:var(--font-head),system-ui,sans-serif;font-weight:600;font-size:16px;letter-spacing:-0.02em;color:var(--text);}
.ty-page .brand-tier{font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:var(--accent-text);padding:5px 10px;border:1px solid rgba(140,198,255,0.35);border-radius:100px;background:rgba(140,198,255,0.06);}
.ty-page .foot-copy{font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-faint);}

@media (max-width:768px){
  .ty-page .container-wide,.ty-page .hero-inner{padding-left:20px;padding-right:20px;}
  .ty-page .hero h1 br{display:none;}
  .ty-page .step-node{width:66px;font-size:10px;}
  .ty-page .step-node .node-circle{width:44px;height:44px;font-size:15px;}
  .ty-page .step-card{grid-template-columns:1fr;gap:18px;padding:24px;}
  .ty-page .cta-bridge-inner{padding:32px 24px;}
}
`;

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#0F1115" stroke="rgba(140,198,255,0.25)" strokeWidth="1" />
        <circle cx="32" cy="32" r="25" fill="none" stroke="#8CC6FF" strokeWidth="6" />
        <text x="32" y="38" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="21" fontWeight="800" fill="#8CC6FF">
          ES
        </text>
      </svg>
    </span>
  );
}

const CHECK = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 8 7 12 13 4" />
  </svg>
);

export default function ThankYouPage() {
  return (
    <div className={`ty-page ${fontHead.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-inner">
          <div className="status-pulse">
            <span className="pulse-dot" aria-hidden="true" />
            <span>1 Step Left</span>
          </div>

          <h1>
            Almost There. <em>Reply To Our Email</em>
            <br />
            To Confirm Your Call.
          </h1>

          <p className="hero-subhead">
            Check Your Inbox <b>&mdash; your spot isn&rsquo;t locked in until you reply.</b>
          </p>

          <div className="stepper" aria-label="Booking progress">
            <div className="step-node done">
              <span className="node-circle">{CHECK}</span>
              <span className="node-label">
                Application
                <br />
                Submitted
              </span>
            </div>
            <div className="step-bar pending" />
            <div className="step-node pending">
              <span className="node-circle">!</span>
              <span className="node-label">
                Reply To
                <br />
                Confirm
              </span>
            </div>
            <div className="step-bar future" />
            <div className="step-node future">
              <span className="node-circle">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="8" r="3" />
                </svg>
              </span>
              <span className="node-label">
                Call
                <br />
                Confirmed
              </span>
            </div>
          </div>

          <span className="start-here">Step 01 · Watch This First</span>

          <div className="vsl-wrap">
            <div className="vsl-frame" aria-label="Booking confirmation overview video">
              {/* Replace with your confirmation VSL embed */}
              <span className="vsl-play" aria-hidden="true">&#9654;</span>
              <span className="vsl-note">[ VSL embed goes here ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEXT STEPS ================= */}
      <section className="next-steps">
        <div className="container-wide">
          <div className="section-header">
            <span className="eyebrow center">Next Steps</span>
            <h2>
              Two Things To Do <em>Before Your Call.</em>
            </h2>
          </div>

          <div className="steps-grid">
            <div className="step-card action">
              <div className="step-num-block">
                <div className="step-num">01</div>
                <span className="step-num-tag">Watch Above</span>
              </div>
              <div className="step-content">
                <h3>Watch The Video Above.</h3>
                <p>
                  Before anything else, watch the video at the top of this page. It gives you the context you need to get
                  the most out of your call with us.
                </p>
              </div>
            </div>

            <div className="step-card action">
              <div className="step-num-block">
                <div className="step-num">02</div>
                <span className="step-num-tag">Action Required</span>
              </div>
              <div className="step-content">
                <h3>Reply To Our Email To Confirm.</h3>
                <p>
                  Check your inbox now. We&rsquo;re sending you a confirmation email &mdash;{" "}
                  <b>your spot is not locked in until you reply.</b> If you don&rsquo;t see it within a few minutes, check
                  your spam folder. <b>Our team</b> will also reach out to confirm your time.
                </p>
                <div className="step-arrow">
                  <span className="arrow-glyph">!</span>Do This Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BRIDGE ================= */}
      <section className="cta-bridge">
        <div className="cta-bridge-inner">
          <h3>Want To Do More Due Diligence On Andy And EcomSimulation?</h3>
          <p>
            We&rsquo;ve put together a full library of interviews, breakdowns, and context videos so you can go deeper
            before your call. Totally optional, but they help you get the most out of the conversation.
          </p>
          <a href={MORE_VIDEOS_URL} className="cta-bridge-btn">
            Watch The Videos Here <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ================= DISCLAIMER ================= */}
      <section className="disclaimer-section">
        <p>
          EcomSimulation. This page is for informational purposes only and does not constitute financial advice. Past
          performance does not guarantee future results. Not affiliated with or endorsed by Meta, TikTok, or any platform
          mentioned.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="container-wide">
          <div className="foot-inner">
            <div className="brand-row" style={{ padding: 0 }}>
              <BrandMark />
              <span className="brand-word">EcomSimulation</span>
              <span className="brand-tier">Accelerator</span>
            </div>
            <p className="foot-copy">
              © {new Date().getFullYear()} EcomSimulation · This page is intended for invited applicants only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
