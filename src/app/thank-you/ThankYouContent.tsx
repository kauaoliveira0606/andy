/*
 * Shared thank-you / confirmation page content.
 *
 * Rendered by BOTH routes:
 *   - /thank-you       (src/app/thank-you/page.tsx)
 *   - /thank-you-nq    (src/app/thank-you-nq/page.tsx — the queue redirect target)
 *
 * Edit this file only. Any change here updates both pages at once.
 * The per-route page.tsx files hold nothing but <metadata> + <ThankYouContent />.
 */
import Script from "next/script";
import { Plus_Jakarta_Sans, Barlow, JetBrains_Mono } from "next/font/google";

const fontHead = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-head" });
const fontBody = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

/* "Open The Guide Here" button on both thank-you pages -> the guide. */
const MORE_VIDEOS_URL = "/guide";

/* Breakout / FAQ videos shown under "Two Things To Do Before Your Call".
   Titles are the scripts we currently have — drop in the real embed per item. */
const BREAKOUT_VIDEOS = [
  "Time Commitment Needed",
  "What If I Don't Have Any Experience?",
  "Capital Needed",
  "What Happens If This Doesn't Work?",
  "Brands We've Invested In",
  "Our Dispute Rate",
  "Our Student Results",
  "My Results",
];

/* Every testimonial screenshot we have — same set used on /home. */
const TESTIMONIALS = [
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

const CSS = `
.ty-page{
  --bg:#0A0A0C; --bg-pure:#000000; --bg-card:#131316;
  --accent:#2A78D6; --accent-bright:#8FC7FF; --accent-deep:#1B5FB0;
  --accent-text:#AAD4FF;
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

.ty-page .eyebrow{font-family:var(--font-mono),ui-monospace,monospace;font-size:12.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent-text);display:inline-flex;align-items:center;gap:12px;}
.ty-page .eyebrow.center{justify-content:center;}

/* ---------- status pulse ---------- */
.ty-page .status-pulse{
  display:inline-flex;align-items:center;gap:10px;padding:10px 22px;border-radius:100px;max-width:92vw;
  background:rgba(42,120,214,0.22);border:1px solid rgba(140,198,255,0.55);text-align:center;
  font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
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

/* ---------- mission progress ---------- */
.ty-page .mission-panel{max-width:640px;width:100%;margin:8px auto 36px;background:var(--bg-card);border:1px solid rgba(42,120,214,0.28);border-radius:20px;padding:32px 32px 28px;box-shadow:0 0 0 1px rgba(42,120,214,0.06),0 30px 60px -28px rgba(42,120,214,0.2);text-align:left;}
.ty-page .mission-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;gap:12px;flex-wrap:wrap;}
.ty-page .mission-eyebrow{font-family:var(--font-mono),ui-monospace,monospace;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent-text);margin-bottom:4px;}
.ty-page .mission-title{font-family:var(--font-head),system-ui,sans-serif;font-size:18px;font-weight:700;color:var(--text);}
.ty-page .mission-status{display:flex;align-items:center;gap:8px;font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#FDBA4A;}
.ty-page .mission-status .dot{width:8px;height:8px;border-radius:50%;background:#FDBA4A;position:relative;}
.ty-page .mission-status .dot::after{content:"";position:absolute;inset:-4px;border-radius:50%;background:rgba(253,186,74,0.4);animation:ty-pulse-ring 1.6s ease-out infinite;}

.ty-page .mission-bar-track{height:10px;width:100%;background:rgba(255,255,255,0.06);border:1px solid var(--line);border-radius:100px;overflow:hidden;margin-bottom:30px;}
.ty-page .mission-bar-fill{height:100%;width:66%;border-radius:100px;background:linear-gradient(90deg,var(--accent-deep),var(--accent-bright));}

.ty-page .mission-track{position:relative;display:flex;justify-content:space-between;}
.ty-page .mission-track::before{content:"";position:absolute;top:24px;left:24px;right:24px;height:2px;background:var(--line);z-index:0;}
.ty-page .mission-track .mission-line-fill{position:absolute;top:24px;left:24px;height:2px;background:linear-gradient(90deg,#3FCB6B,#FDBA4A);z-index:1;width:calc(50% - 24px);}
.ty-page .mission-node{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:10px;width:33.33%;text-align:center;}
.ty-page .mission-node .node-circle{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:2px solid var(--line);background:var(--bg-pure);transition:all .3s ease;}
.ty-page .mission-node.done .node-circle{border-color:#3FCB6B;background:rgba(63,203,107,0.16);color:#3FCB6B;box-shadow:0 0 14px 3px rgba(63,203,107,0.3);}
.ty-page .mission-node.current .node-circle{border-color:#FDBA4A;background:rgba(253,186,74,0.16);color:#FDBA4A;box-shadow:0 0 0 4px rgba(253,186,74,0.18);animation:ty-node-pulse 1.8s ease-in-out infinite;}
.ty-page .mission-node.locked .node-circle{border-color:var(--line);background:rgba(255,255,255,0.03);color:var(--text-faint);opacity:0.6;}
.ty-page .mission-node .node-stage{font-family:var(--font-mono),ui-monospace,monospace;font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;}
.ty-page .mission-node.done .node-stage{color:#3FCB6B;}
.ty-page .mission-node.current .node-stage{color:#FDBA4A;}
.ty-page .mission-node.locked .node-stage{color:var(--text-faint);}
.ty-page .mission-node .node-label{font-size:11.5px;font-weight:600;line-height:1.3;color:var(--text-mute);}
.ty-page .mission-node.locked .node-label{color:var(--text-faint);}
@keyframes ty-node-pulse{0%,100%{box-shadow:0 0 0 0 rgba(253,186,74,0.5),0 0 14px 4px rgba(253,186,74,0.3);}50%{box-shadow:0 0 0 8px rgba(253,186,74,0),0 0 20px 8px rgba(253,186,74,0.5);}}

.ty-page .mission-caption{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:24px;font-family:var(--font-mono),ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#FDBA4A;}
.ty-page .mission-caption .dot{width:7px;height:7px;border-radius:50%;background:#FDBA4A;animation:ty-simple-pulse 1.4s ease-in-out infinite;}
@keyframes ty-simple-pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}

/* ---------- start-here ---------- */
.ty-page .start-here{display:inline-flex;align-items:center;gap:12px;font-family:var(--font-mono),ui-monospace,monospace;font-weight:700;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent-text);margin-bottom:28px;}
.ty-page .start-here::before,.ty-page .start-here::after{content:"";display:inline-block;width:22px;height:1px;background:var(--accent-text);opacity:0.7;}

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

/* ---------- breakout videos ---------- */
.ty-page .breakout-section{background:var(--bg-pure);padding:72px 0;}
.ty-page .breakout-list{display:flex;flex-direction:column;gap:44px;max-width:760px;margin:0 auto;padding:0 32px;}
.ty-page .breakout-item h3{font-family:var(--font-head),system-ui,sans-serif;font-weight:700;font-size:clamp(17px,2vw,20px);color:var(--text);margin-bottom:16px;}
.ty-page .breakout-frame{
  position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--line);background:#000;
  box-shadow:0 0 0 1px rgba(42,120,214,0.1),0 24px 48px -24px rgba(42,120,214,0.2);
  aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;
}
.ty-page .breakout-frame .vsl-play{width:56px;height:56px;font-size:20px;box-shadow:0 10px 30px -8px rgba(42,120,214,0.7);}

/* ---------- testimonials / wins ---------- */
.ty-page .wins-section{background:var(--bg);border-top:1px solid var(--line-soft);padding:72px 0;}
.ty-page .wins-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:900px;margin:0 auto;padding:0 32px;}
.ty-page .wins-grid img{width:100%;display:block;border-radius:14px;border:1px solid var(--line);object-fit:cover;box-shadow:0 20px 40px -26px rgba(0,0,0,0.6);}
@media (max-width:640px){
  .ty-page .wins-grid{grid-template-columns:1fr;padding:0 24px;}
}

/* ---------- cta bridge ---------- */
.ty-page .cta-bridge{padding:64px 32px;background:var(--bg-pure);text-align:center;}
.ty-page .cta-bridge-inner{max-width:720px;margin:0 auto;background:var(--bg-card);border:1px solid rgba(42,120,214,0.25);border-radius:20px;padding:40px 48px;box-shadow:0 0 0 1px rgba(42,120,214,0.08),0 32px 64px -24px rgba(42,120,214,0.15);}
.ty-page .cta-bridge h3{font-family:var(--font-head),system-ui,sans-serif;font-size:clamp(20px,2.2vw,26px);font-weight:700;letter-spacing:-0.022em;color:var(--text);margin-bottom:12px;}
.ty-page .cta-bridge p{font-size:15.5px;color:var(--text-mute);line-height:1.6;margin-bottom:28px;}
.ty-page .cta-bridge-btn{display:inline-flex;align-items:center;gap:10px;background:var(--accent);color:#fff;font-family:var(--font-mono),ui-monospace,monospace;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:16px 36px;border-radius:100px;transition:background .2s ease,transform .15s ease,box-shadow .2s ease;box-shadow:0 8px 24px -8px rgba(42,120,214,0.5);}
.ty-page .cta-bridge-btn:hover{background:var(--accent-bright);color:#0A0A0C;transform:translateY(-2px);box-shadow:0 14px 32px -10px rgba(42,120,214,0.55);}
.ty-page .cta-bridge-btn .btn-arrow{font-size:16px;line-height:1;}

/* ---------- footer (ai-advertiser style) ---------- */
.ty-page .site-footer{background:var(--bg-pure);margin-top:24px;max-width:720px;margin-left:auto;margin-right:auto;border-top:1px solid var(--line-soft);padding:32px 32px 40px;text-align:center;}
.ty-page .foot-disc{font-size:11px;font-weight:700;color:var(--text-mute);line-height:1.6;max-width:60ch;margin:0 auto;}
.ty-page .foot-links{margin-top:20px;display:flex;align-items:center;justify-content:center;gap:16px;}
.ty-page .foot-links a{font-size:12px;color:var(--text-faint);text-decoration:none;transition:color .2s ease;}
.ty-page .foot-links a:hover{color:var(--text);}
.ty-page .foot-links .sep{color:rgba(255,255,255,0.25);}
.ty-page .foot-copy{margin-top:16px;font-size:11px;color:rgba(255,255,255,0.35);}
.ty-page .foot-mail{margin-top:4px;font-size:11px;color:rgba(255,255,255,0.35);}
.ty-page .foot-mail a{color:inherit;text-decoration:none;}
.ty-page .foot-mail a:hover{color:var(--text-faint);}

@media (max-width:768px){
  .ty-page .container-wide,.ty-page .hero-inner{padding-left:20px;padding-right:20px;}
  .ty-page .hero h1 br{display:none;}
  .ty-page .mission-panel{padding:24px 20px 22px;}
  .ty-page .mission-node .node-circle{width:40px;height:40px;font-size:15px;}
  .ty-page .mission-node .node-label{font-size:10.5px;}
  .ty-page .step-card{grid-template-columns:1fr;gap:18px;padding:24px;}
  .ty-page .cta-bridge-inner{padding:32px 24px;}
}
`;

const CHECK = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 8 7 12 13 4" />
  </svg>
);

/* firePixel=false is used only by /thank-you-nq, which must fire no Meta Pixel
   events at all (the root layout also skips PageView for that path).
   firstName comes from the Typeform redirect's ?first_name= query param. */
export default function ThankYouContent({ firePixel = true, firstName }: { firePixel?: boolean; firstName?: string }) {
  const name = firstName?.trim();
  return (
    <div className={`ty-page ${fontHead.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {firePixel && (
        /* Meta Pixel: fire Schedule on the confirmation page (PageView also fires site-wide from the root layout) */
        <Script id="meta-pixel-schedule" strategy="afterInteractive">
          {`(function w(){ if (window.fbq) { fbq('track','Schedule'); } else { setTimeout(w, 250); } })();`}
        </Script>
      )}


      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-inner">
          <div className="status-pulse">
            <span className="pulse-dot" aria-hidden="true" />
            <span>1 Step Left &rarr; Expect A Phone Call From Us</span>
          </div>

          <h1>
            {name && `${name}, `}Your Application Is In. <em>We&rsquo;re Calling You Right Now.</em>
          </h1>
          <p className="hero-subhead">
            One of our team members is calling you in the next <b>2-10 minutes</b> to set up your game plan call.
            Keep your phone nearby and pick up!! This is the fastest way to get started.
          </p>

          <span className="start-here">Step 01 · Watch This First</span>

          <div className="vsl-wrap">
            <div className="vsl-frame" aria-label="Booking confirmation overview video">
              {/* Replace with your confirmation VSL embed */}
              <span className="vsl-play" aria-hidden="true">&#9654;</span>
              <span className="vsl-note">[ VSL embed goes here ]</span>
            </div>
          </div>

          <div className="mission-panel" aria-label="Application progress">
            <div className="mission-header">
              <div>
                <div className="mission-eyebrow">Application Status</div>
                <div className="mission-title">Mission Progress</div>
              </div>
              <div className="mission-status">
                <span className="dot" aria-hidden="true" />
                Coach Is Calling
              </div>
            </div>

            <div className="mission-bar-track">
              <div className="mission-bar-fill" />
            </div>

            <div className="mission-track">
              <div className="mission-line-fill" aria-hidden="true" />
              <div className="mission-node done">
                <span className="node-circle">{CHECK}</span>
                <span className="node-stage">Stage 1</span>
                <span className="node-label">
                  Application
                  <br />
                  Submitted
                </span>
              </div>
              <div className="mission-node current">
                <span className="node-circle">&#9889;</span>
                <span className="node-stage">Stage 2</span>
                <span className="node-label">
                  Coach Is
                  <br />
                  Calling
                </span>
              </div>
              <div className="mission-node locked">
                <span className="node-circle">&#128274;</span>
                <span className="node-stage">Stage 3</span>
                <span className="node-label">
                  Game Plan Call
                  <br />
                  Scheduled
                </span>
              </div>
            </div>

            <div className="mission-caption">
              <span className="dot" aria-hidden="true" />
              Your coach is calling you right now
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
                  Check your inbox now. We&rsquo;re sending you a confirmation email - If you don&rsquo;t see it within a
                  few minutes, check your spam folder.
                </p>
                <div className="step-arrow">
                  <span className="arrow-glyph">!</span>Do This Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BREAKOUT VIDEOS ================= */}
      <section className="breakout-section">
        <div className="container-wide">
          <div className="section-header">
            <span className="eyebrow center">Watch Before Your Call</span>
            <h2>Got Questions? Watch These First.</h2>
            <p style={{ marginTop: 14, fontSize: 15.5, color: "var(--text-mute)", lineHeight: 1.6 }}>
              The coach will skip the basics if you watch these. Come prepared and you&rsquo;ll get way more out of the
              call.
            </p>
          </div>

          <div className="breakout-list">
            {BREAKOUT_VIDEOS.map((title) => (
              <div className="breakout-item" key={title}>
                <h3>{title}</h3>
                <div className="breakout-frame" aria-label={`${title} video`}>
                  {/* Replace with the real embed for this script */}
                  <span className="vsl-play" aria-hidden="true">&#9654;</span>
                </div>
              </div>
            ))}
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
          <a href={MORE_VIDEOS_URL} target="_blank" rel="noopener noreferrer" className="cta-bridge-btn">
            Open The Guide Here <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ================= TESTIMONIALS / WINS ================= */}
      <section className="wins-section">
        <div className="container-wide">
          <div className="section-header">
            <span className="eyebrow center">Community Wins</span>
            <h2>More Wins From The Community</h2>
            <p style={{ marginTop: 14, fontSize: 15.5, color: "var(--text-mute)", lineHeight: 1.6 }}>
              Real screenshots. Real results. Real people.
            </p>
          </div>

          <div className="wins-grid">
            {TESTIMONIALS.map((src, i) => (
              <img key={src} src={src} alt={`Student win ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <p className="foot-disc">
          This site is not a part of the Facebook™ or Meta™ website or Meta™ Inc. Additionally, this site is NOT
          endorsed by Facebook™ or Meta™ in any way. Results are not typical. Your results will vary based on effort,
          experience, and market conditions.
        </p>
        <div className="foot-links">
          <a href="/terms">Terms of Service</a>
          <span className="sep">·</span>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <p className="foot-copy">© {new Date().getFullYear()} EcomSimulation. All rights reserved.</p>
        <p className="foot-mail">
          Questions? <a href="mailto:info@ecomsimulation.io">info@ecomsimulation.io</a>
        </p>
      </footer>
    </div>
  );
}
