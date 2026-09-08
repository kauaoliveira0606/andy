import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Barlow, JetBrains_Mono } from "next/font/google";

/* ------------------------------------------------------------------ */
/* Fonts (matches the source page: Plus Jakarta Sans / Barlow / mono)  */
/* ------------------------------------------------------------------ */
const fontHead = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-head" });
const fontBody = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

/* CTA buttons scroll up to the embedded Typeform application in the hero. */
const BOOK_CALL_URL = "#apply";

export const metadata: Metadata = {
  title: "EcomSimulation — Book a call",
  description: "Placeholder meta description for the EcomSimulation landing page.",
};

/* ------------------------------------------------------------------ */
/* Placeholder content — replace copy before launch                    */
/* ------------------------------------------------------------------ */

/* Student result screenshots pulled from ecomsimulation.io (GHL CDN). */
const PROOF = [
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68401724ce15dfb404e29823.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68401769ce15df3d78e29884.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b632ac070d197d70522c5c.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b63294dfd955fcaac40f61.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b632453006308be375afd3.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b632510dd810fbd4f675be.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b6308d0dd810274af673b5.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b630fce2e8e6afc23d8db5.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68400f0e972192c15d06f409.jpeg",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68400c6828def020dc9333ef.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68400d269721921c2e06f123.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/684010d6972192167706f5ea.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/6840161bd77c6200e23bcd98.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/684015f3d77c625f653bcd14.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/684016c028def06165933f44.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/684016d27504ee74dd464ec2.png",
];

/* ------------------------------------------------------------------ */
/* Styles ported from the source page, orange (#FC5C03) -> blue         */
/* ------------------------------------------------------------------ */
const CSS = `
.cs-home{
  --bg:#0A0A0C; --bg-pure:#000000; --bg-card:#131316;
  --accent:#2A78D6; --accent-bright:#8FC7FF; --accent-deep:#1B5FB0;
  --accent-text:#8CC6FF;
  --text:rgba(255,255,255,0.98); --text-mute:rgba(255,255,255,0.96);
  --text-dim:rgba(255,255,255,0.82); --text-faint:rgba(255,255,255,0.62);
  --line:rgba(255,255,255,0.08); --line-soft:rgba(255,255,255,0.05);
  background:var(--bg-pure); color:var(--text);
  font-family:var(--font-body), system-ui, sans-serif;
  font-size:17px; line-height:1.55; -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
.cs-home *{box-sizing:border-box;}
.cs-home h1,.cs-home h2,.cs-home h3,.cs-home h4{
  font-family:var(--font-head), system-ui, sans-serif; font-weight:700;
  letter-spacing:-0.022em; margin:0; line-height:1.1; color:var(--text);
}
.cs-home h2{font-size:clamp(28px,3.4vw,44px);}
.cs-home a{color:inherit;}

.cs-home .container{max-width:1240px;margin:0 auto;padding:0 32px;}
.cs-home .container-narrow{max-width:880px;margin:0 auto;padding:0 32px;}
.cs-home .container-wide{max-width:1320px;margin:0 auto;padding:0 32px;}

.cs-home .eyebrow{
  font-family:var(--font-mono),ui-monospace,monospace; font-size:11px; font-weight:500;
  letter-spacing:0.22em; text-transform:uppercase; color:var(--accent-text);
  display:inline-flex; align-items:center; gap:12px;
}
.cs-home .eyebrow::before{content:"";width:22px;height:1px;background:var(--accent-text);}
.cs-home .eyebrow.center{justify-content:center;}
.cs-home .eyebrow.no-rule::before{display:none;}
.cs-home .mono{font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-mute);}
.cs-home .lede{font-size:clamp(17px,1.4vw,19px);line-height:1.6;color:var(--text-mute);max-width:64ch;}
.cs-home .lede.center{margin-left:auto;margin-right:auto;}

/* ---------- buttons ---------- */
.cs-home .btn{
  display:inline-flex;align-items:center;gap:10px;padding:16px 28px;border-radius:100px;
  font-family:var(--font-body),system-ui,sans-serif;font-weight:600;font-size:16px;text-decoration:none;
  cursor:pointer;border:1px solid transparent;transition:transform .15s,background .2s,border-color .2s,color .2s;
  white-space:nowrap;letter-spacing:0.01em;
}
.cs-home .btn:active{transform:translateY(1px);}
.cs-home .btn-gold{
  background:rgba(255,255,255,0.04);color:var(--text);border:1px solid rgba(42,120,214,0.5);
  font-weight:600;letter-spacing:0.02em;position:relative;overflow:hidden;
}
.cs-home .btn-gold::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(42,120,214,0.18),rgba(42,120,214,0) 60%);opacity:0;transition:opacity .25s ease;}
.cs-home .btn-gold span{position:relative;z-index:1;}
.cs-home .btn-gold:hover{border-color:var(--accent);background:rgba(42,120,214,0.06);color:#fff;}
.cs-home .btn-gold:hover::before{opacity:1;}
.cs-home .btn-gold:hover .btn-arrow{transform:translateX(3px);background:var(--accent-bright);}
.cs-home .btn-arrow{
  display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;
  background:var(--accent);color:#fff;font-size:12px;margin-left:4px;transition:transform .25s ease,background .25s ease;
}
.cs-home .btn-xl{padding:22px 38px;font-size:17px;}

/* ---------- hero ---------- */
.cs-home .hero{position:relative;background:var(--bg-pure);overflow:hidden;padding:28px 0 40px;}
.cs-home .hero::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 700px 380px at 50% -10%,rgba(42,120,214,0.16),transparent 60%),
             radial-gradient(ellipse 800px 480px at 50% 0%,rgba(42,120,214,0.06),transparent 70%);
}
.cs-home .hero::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
  background-size:80px 80px;
  -webkit-mask-image:radial-gradient(ellipse 600px 400px at 50% 30%,black,transparent 70%);
  mask-image:radial-gradient(ellipse 600px 400px at 50% 30%,black,transparent 70%);
}
.cs-home .brand-row{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:12px;padding-bottom:28px;flex-wrap:wrap;}
.cs-home .brand-mark svg{width:34px;height:34px;display:block;border-radius:9px;}
.cs-home .brand-word{font-family:var(--font-head),system-ui,sans-serif;font-weight:600;font-size:17px;letter-spacing:-0.02em;color:var(--text);}
.cs-home .brand-tier{
  font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;
  color:var(--accent-text);padding:6px 11px;border:1px solid rgba(140,198,255,0.35);border-radius:100px;
  background:rgba(140,198,255,0.06);margin-left:4px;white-space:nowrap;
}
.cs-home .hero-inner{position:relative;z-index:2;text-align:center;max-width:920px;margin:0 auto;}
.cs-home .hero-callout{
  display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:100px;
  background:linear-gradient(180deg,rgba(42,120,214,0.14),rgba(42,120,214,0.06));border:1px solid rgba(42,120,214,0.45);
  font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;
  color:#AED2F7;margin-bottom:22px;box-shadow:0 8px 24px -10px rgba(42,120,214,0.4);max-width:calc(100% - 24px);
}
.cs-home .hero-callout::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px rgba(42,120,214,0.18);flex-shrink:0;}
.cs-home .hero-callout b{color:#fff;font-weight:700;letter-spacing:0.04em;}
.cs-home .hero h2{font-size:clamp(26px,3.2vw,42px);line-height:1.18;letter-spacing:-0.022em;margin:0 0 28px;text-wrap:balance;}
.cs-home .hero h2 .h2-highlight{color:var(--accent-text);}
.cs-home .hero-subhead{color:var(--text-mute);font-size:clamp(18px,1.7vw,21px);line-height:1.55;max-width:720px;margin:0 auto 28px;}

/* ---------- vsl ---------- */
.cs-home .vsl-wrap{position:relative;margin:0 auto;max-width:920px;}
.cs-home .vsl-frame{
  position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#000;
  box-shadow:0 0 0 1px rgba(42,120,214,0.18),0 40px 80px -30px rgba(42,120,214,0.25),0 50px 100px -30px rgba(0,0,0,0.6);
  aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;
}
.cs-home .vsl-frame::before{
  content:"";position:absolute;inset:-2px;border-radius:20px;z-index:-1;pointer-events:none;
  background:linear-gradient(135deg,rgba(42,120,214,0.4),transparent 30%,transparent 70%,rgba(42,120,214,0.2));
}
.cs-home .vsl-play{
  width:76px;height:76px;border-radius:50%;background:var(--accent);color:#fff;
  display:flex;align-items:center;justify-content:center;font-size:26px;padding-left:5px;
  box-shadow:0 12px 40px -8px rgba(42,120,214,0.7);
}
.cs-home .vsl-note{position:absolute;bottom:14px;left:0;right:0;text-align:center;font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-faint);}

/* ---------- apply under vsl ---------- */
.cs-home .apply-under-vsl{margin-top:28px;text-align:center;}
.cs-home .apply-under-vsl-head{margin-bottom:20px;}
.cs-home .apply-under-vsl-title{display:block;font-family:var(--font-head),system-ui,sans-serif;font-weight:700;font-size:clamp(22px,2.4vw,30px);letter-spacing:-0.02em;color:var(--text);margin-bottom:6px;}
.cs-home .apply-under-vsl-sub{display:block;font-size:clamp(15px,1.2vw,17px);color:var(--text-mute);line-height:1.5;}
.cs-home .tf-embed{width:100%;max-width:640px;margin:0 auto;}
.cs-home .tf-embed [data-tf-live]{min-height:520px;border-radius:14px;overflow:hidden;}
.cs-home .tf-embed iframe{border-radius:14px;}
html{scroll-behavior:smooth;}

/* ---------- testimonials ---------- */
.cs-home .testimonials{background:var(--bg-pure);padding:24px 0 56px;}
.cs-home .section-header{max-width:880px;margin:0 auto 32px;text-align:center;}
.cs-home .section-header h2{margin-top:16px;font-size:clamp(36px,5vw,58px);letter-spacing:-0.028em;}
.cs-home .proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1160px;margin:0 auto;}
.cs-home .proof-card{background:var(--bg-card);border:1px solid var(--line);border-radius:16px;overflow:hidden;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;}
.cs-home .proof-card:hover{transform:translateY(-3px);border-color:rgba(42,120,214,0.35);box-shadow:0 24px 50px -28px rgba(42,120,214,0.25);}
.cs-home .proof-card img{display:block;width:100%;height:auto;}

/* ---------- team marquee ---------- */
/* ---------- closing cta ---------- */
.cs-home .close-cta{background:var(--bg-pure);border-top:1px solid var(--line-soft);padding:48px 0 80px;position:relative;overflow:hidden;}
.cs-home .close-cta::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 600px 320px at 50% 100%,rgba(42,120,214,0.12),transparent 60%);}
.cs-home .close-cta-inner{position:relative;z-index:1;text-align:center;max-width:720px;margin:0 auto;}
.cs-home .close-cta h2{font-size:clamp(36px,5vw,58px);letter-spacing:-0.028em;}
.cs-home .close-cta h2 em{color:var(--accent-text);font-style:normal;}
.cs-home .close-cta .lede{margin:18px auto 32px;}
.cs-home .close-fineline{margin-top:18px;font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-faint);}

/* ---------- footer ---------- */
.cs-home .site-footer{background:var(--bg-pure);padding:64px 0 48px;border-top:1px solid var(--line-soft);color:var(--text-mute);}
.cs-home .foot-inner{display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center;}
.cs-home .foot-tagline{max-width:60ch;font-size:14px;color:var(--text-mute);line-height:1.55;}
.cs-home .foot-disclaimer{max-width:80ch;font-size:11.5px;line-height:1.6;color:var(--text-faint);}
.cs-home .foot-copy{font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-faint);}

@media (max-width:768px){
  .cs-home .container,.cs-home .container-narrow,.cs-home .container-wide{padding:0 20px;}
  .cs-home .proof-grid{grid-template-columns:1fr 1fr;gap:14px;}
  .cs-home .marquee-track{gap:44px;}
}
`;

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#0F1115" stroke="rgba(140,198,255,0.25)" strokeWidth="1" />
        <circle cx="32" cy="32" r="25" fill="none" stroke="#8CC6FF" strokeWidth="6" />
        <text
          x="32"
          y="38"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="21"
          fontWeight="800"
          fill="#8CC6FF"
        >
          ES
        </text>
      </svg>
    </span>
  );
}

function ProofCard({ src, i }: { src: string; i: number }) {
  return (
    <article className="proof-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`Member dashboard result #${i + 1}`} loading="lazy" />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <div className={`cs-home ${fontHead.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container-wide">
          <div className="brand-row">
            <BrandMark />
            <span className="brand-word">EcomSimulation</span>
            <span className="brand-tier">Accelerator</span>
          </div>

          <div className="hero-inner">
            <span className="hero-callout">
              For Six-Figure Professionals
            </span>

            <h2>
              How Six-Figure Professionals Are Using <span className="h2-highlight">AI Dropshipping</span> To Build{" "}
              <span className="h2-highlight">Real E-Commerce Brands</span>, Without Quitting Their Job, With A System
              Designed For People Who Already Have A Career And Want More
            </h2>

            <p className="hero-subhead">
              Designed for busy professionals with zero e-commerce experience. Fits your schedule, not the other way
              around. Have a new live business running in less than 10 weeks.
            </p>

            {/* VSL */}
            <div className="vsl-wrap">
              <div className="vsl-frame" aria-label="Founder overview video">
                {/* Replace with your VSL embed */}
                <span className="vsl-play" aria-hidden="true">&#9654;</span>
                <span className="vsl-note">[ VSL embed goes here ]</span>
              </div>
            </div>

            {/* Apply under VSL — embedded Typeform application */}
            <div id="apply" className="apply-under-vsl">
              <div className="apply-under-vsl-head">
                <span className="apply-under-vsl-title">Book a call</span>
                <span className="apply-under-vsl-sub">A 30-minute call with a senior member of our team</span>
              </div>
              <div className="tf-embed">
                <div data-tf-live="01M20RQK1S7Q7Z366NQWHVBHTA" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <div className="container-wide">
          <div className="section-header">
            <span className="eyebrow center no-rule">Live · new wins posted this week</span>
            <h2>See How Our Members Are Doing</h2>
            <p className="lede center">
              Real dashboards from real members. No edits, no cherry picking, just what happens when you actually run the
              process.
            </p>
          </div>

          <div className="proof-grid">
            {PROOF.map((src, i) => (
              <ProofCard key={i} src={src} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="close-cta">
        <div className="container-narrow">
          <div className="close-cta-inner">
            <span className="eyebrow center no-rule">Next Step</span>
            <h2>
              Book your <em>strategy call.</em>
            </h2>
            <p className="lede center">By application only. Limited slots each week. We typically respond within one business day.</p>
            <a href={BOOK_CALL_URL} className="btn btn-gold btn-xl">
              <span>Book a call</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <div className="close-fineline">Application-based · Limited weekly slots</div>
          </div>
        </div>
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
            <p className="foot-tagline">
              [One-paragraph summary of what EcomSimulation is: who it&rsquo;s for and what members get — training,
              frameworks, and direct access to the team.]
            </p>
            <p className="foot-disclaimer">
              INCOME DISCLAIMER: Results mentioned are not typical. Individual results will vary based on effort,
              experience, background, and market conditions. This is an educational program. We make no guarantees of
              income or business outcomes.
            </p>
            <p className="foot-copy">© {new Date().getFullYear()} EcomSimulation · [company / domain]</p>
          </div>
        </div>
      </footer>

      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </div>
  );
}
