import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Barlow, JetBrains_Mono } from "next/font/google";

/* ------------------------------------------------------------------ */
/* Fonts (matches the source page: Plus Jakarta Sans / Barlow / mono)  */
/* ------------------------------------------------------------------ */
const fontHead = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-head" });
const fontBody = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

/* Wire this up to the real booking / application link. */
const BOOK_CALL_URL = "#book";

export const metadata: Metadata = {
  title: "EcomSimulation — Book a call",
  description: "Placeholder meta description for the EcomSimulation landing page.",
};

/* ------------------------------------------------------------------ */
/* Placeholder content — replace copy before launch                    */
/* ------------------------------------------------------------------ */

const STORIES = [
  { name: "[First name]", quote: "First month after we rebuilt the store, we did more revenue than the previous quarter combined." },
  { name: "[First name]", quote: "I stopped buying courses. The simulation showed me exactly where my funnel was leaking." },
  { name: "[First name]", quote: "Went from breaking even on ads to a 2.4x blended return in about six weeks." },
  { name: "[First name]", quote: "The team caught a pricing mistake on our hero product that was costing us thousands a month." },
  { name: "[First name]", quote: "Had to hire my first VA just to keep up with the order volume." },
  { name: "[First name]", quote: "First time I've had a store that runs without me watching it every hour." },
];

const TEAM = [
  { name: "[Team member]", role: "Founder", bio: "Placeholder bio — one line on what they do and why they're credible." },
  { name: "[Team member]", role: "Head of Coaching", bio: "Placeholder bio — runs the coaching desk and portfolio reviews." },
  { name: "[Team member]", role: "Growth Lead", bio: "Placeholder bio — owns paid acquisition and creative testing." },
  { name: "[Team member]", role: "Store Build Lead", bio: "Placeholder bio — CRO, page builds and offer structure." },
  { name: "[Team member]", role: "Client Success", bio: "Placeholder bio — your direct line into the team, 1:1 sessions." },
  { name: "[Team member]", role: "Onboarding", bio: "Placeholder bio — application review, qualification and onboarding." },
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

/* ---------- testimonials ---------- */
.cs-home .testimonials{background:var(--bg-pure);padding:24px 0 56px;}
.cs-home .section-header{max-width:880px;margin:0 auto 32px;text-align:center;}
.cs-home .section-header h2{margin-top:16px;font-size:clamp(36px,5vw,58px);letter-spacing:-0.028em;}
.cs-home .vid-section{margin-bottom:48px;}
.cs-home .vid-section-head{display:flex;align-items:center;gap:14px;margin-bottom:26px;}
.cs-home .vid-section-head .line{flex:1;height:1px;background:linear-gradient(90deg,rgba(42,120,214,0.3),transparent);}
.cs-home .vid-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:1080px;margin:0 auto;}
.cs-home .vid-card{background:var(--bg-card);border:1px solid var(--line);border-radius:18px;overflow:hidden;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;}
.cs-home .vid-card:hover{transform:translateY(-3px);border-color:rgba(42,120,214,0.35);box-shadow:0 24px 50px -28px rgba(42,120,214,0.25);}
.cs-home .vid-frame{position:relative;padding-bottom:56.25%;background:linear-gradient(160deg,#1a2740,#0d1220);}
.cs-home .vid-frame .vid-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:34px;opacity:0.85;}
.cs-home .vid-meta{padding:20px 20px 22px;}
.cs-home .vid-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.cs-home .vid-name{font-family:var(--font-head),system-ui,sans-serif;font-weight:700;font-size:16px;letter-spacing:-0.01em;color:var(--text);}
.cs-home .vid-stars{color:#FFB020;font-size:14px;letter-spacing:3px;}
.cs-home .vid-quote{font-size:15px;line-height:1.5;color:var(--text-mute);font-style:italic;}
.cs-home .vid-result{margin-top:14px;font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent-text);display:inline-flex;align-items:center;gap:8px;}
.cs-home .vid-result .dot{width:5px;height:5px;border-radius:50%;background:var(--accent-text);}
.cs-home .vid-disclaimer{margin-top:14px;padding-top:14px;border-top:1px dashed rgba(255,255,255,0.08);font-family:var(--font-mono),ui-monospace,monospace;font-size:9.5px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-faint);line-height:1.4;}

/* ---------- compliance banner ---------- */
.cs-home .compliance-banner{
  margin:32px auto 0;max-width:880px;padding:18px 22px;background:rgba(255,255,255,0.03);
  border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:12px;
  display:flex;align-items:flex-start;gap:14px;font-size:13px;line-height:1.5;color:var(--text-mute);
}
.cs-home .compliance-banner b{color:var(--text);font-weight:700;}
.cs-home .cb-icon{width:26px;height:26px;flex-shrink:0;border-radius:50%;background:rgba(42,120,214,0.15);color:var(--accent-bright);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;}

/* ---------- team marquee ---------- */
.cs-home .team-section{padding:28px 0 72px;background:var(--bg-pure);border-top:1px solid var(--line-soft);}
.cs-home .team-head{text-align:center;max-width:720px;margin:0 auto 28px;}
.cs-home .team-head h3{font-size:clamp(24px,2.6vw,32px);letter-spacing:-0.02em;margin-top:14px;}
.cs-home .team-head p{color:var(--text-mute);font-size:15.5px;line-height:1.5;margin-top:12px;}
.cs-home .team-marquee{position:relative;overflow:hidden;width:100%;
  -webkit-mask-image:linear-gradient(90deg,transparent 0,black 4%,black 96%,transparent 100%);
  mask-image:linear-gradient(90deg,transparent 0,black 4%,black 96%,transparent 100%);}
.cs-home .team-marquee-track{display:inline-flex;gap:14px;align-items:stretch;white-space:nowrap;padding-left:14px;animation:cs-team-scroll 60s linear infinite;}
.cs-home .team-marquee:hover .team-marquee-track{animation-play-state:paused;}
@keyframes cs-team-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
.cs-home .team-card{display:inline-flex;flex-direction:column;width:260px;flex:0 0 260px;background:rgba(255,255,255,0.04);border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:transform .2s,border-color .2s,background .2s;white-space:normal;}
.cs-home .team-card:hover{transform:translateY(-3px);background:rgba(255,255,255,0.06);border-color:rgba(42,120,214,0.35);}
.cs-home .team-photo{position:relative;aspect-ratio:4/5;background:linear-gradient(160deg,#2A2833,#1B1925);overflow:hidden;}
.cs-home .team-photo::before{content:attr(data-letter);font-family:var(--font-head),system-ui,sans-serif;font-weight:700;font-size:64px;color:rgba(255,255,255,0.18);position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
.cs-home .team-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.55) 100%);pointer-events:none;}
.cs-home .team-meta{padding:14px 16px 16px;display:flex;flex-direction:column;gap:4px;}
.cs-home .team-meta .tname{font-family:var(--font-head),system-ui,sans-serif;font-weight:700;font-size:16px;letter-spacing:-0.012em;color:var(--text);}
.cs-home .team-meta .trole{font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent-bright);}
.cs-home .team-meta .tbio{font-size:13px;color:var(--text-mute);line-height:1.5;margin-top:4px;}

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
  .cs-home .vid-grid{grid-template-columns:1fr;}
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

function StoryCard({ name, quote }: { name: string; quote: string }) {
  return (
    <article className="vid-card">
      <div className="vid-frame">
        {/* Replace with the real member-story video embed (Vimeo/YouTube/Wistia) */}
        <span className="vid-play" aria-hidden="true">&#9654;</span>
      </div>
      <div className="vid-meta">
        <div className="vid-top">
          <span className="vid-name">{name}</span>
          <span className="vid-stars" aria-label="5 out of 5 stars">★★★★★</span>
        </div>
        <p className="vid-quote">&ldquo;{quote}&rdquo;</p>
        <div className="vid-result">
          <span className="dot" />
          {name} · member experience
        </div>
        <div className="vid-disclaimer">Individual experience. Not typical results. Past performance is not indicative.</div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const teamLoop = [...TEAM, ...TEAM];

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

            {/* Apply under VSL */}
            <div id="apply" className="apply-under-vsl">
              <div className="apply-under-vsl-head">
                <span className="apply-under-vsl-title">Book a call</span>
                <span className="apply-under-vsl-sub">A 30-minute call with a senior member of our team</span>
              </div>
              <a href={BOOK_CALL_URL} className="btn btn-gold btn-xl">
                <span>Book a call</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <div className="container-wide">
          <div className="section-header">
            <span className="eyebrow center no-rule">In their own words</span>
            <h2>What Members Say.</h2>
          </div>

          <div className="vid-section">
            <div className="vid-section-head">
              <span className="mono">Watch their stories</span>
              <span className="line" />
            </div>
            <div className="vid-grid">
              {STORIES.map((s, i) => (
                <StoryCard key={i} name={s.name} quote={s.quote} />
              ))}
            </div>
          </div>

          <div className="compliance-banner">
            <span className="cb-icon" aria-hidden="true">!</span>
            <span>
              <b>Individual experiences. Not typical results.</b> The members featured above describe their own
              experiences. Results vary significantly and depend on personal circumstances, market conditions, product,
              and individual decisions. [Add your offer-specific disclaimer here before launch.]
            </span>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="team-section">
        <div className="container-wide">
          <div className="team-head">
            <span className="eyebrow center no-rule">Meet the Team</span>
            <h3>The coaches and operators on the line with you</h3>
            <p>Placeholder line about the team&rsquo;s experience — swap in real credentials before launch.</p>
          </div>
        </div>
        <div className="team-marquee">
          <div className="team-marquee-track">
            {teamLoop.map((m, i) => (
              <div className="team-card" key={i}>
                <div className="team-photo" data-letter={m.name.charAt(1) || "?"} />
                <div className="team-meta">
                  <span className="tname">{m.name}</span>
                  <span className="trole">{m.role}</span>
                  <span className="tbio">{m.bio}</span>
                </div>
              </div>
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
              EcomSimulation provides general information and educational content only. We do not provide personal
              financial, tax, or legal advice. Past performance is not indicative of future returns. Results vary. Consult
              a licensed adviser before acting on any information. [Replace this block with your reviewed legal disclaimer
              before launch.]
            </p>
            <p className="foot-copy">© {new Date().getFullYear()} EcomSimulation · [company / domain]</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
