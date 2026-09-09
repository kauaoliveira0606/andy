"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--ra-font" });

const IMG = "https://ecomsimulation.io/__l5e/assets-v1";
const PROOF = [
  `${IMG}/51754f44-121b-444f-baa8-a14ca19078f6/proof-1.jpg`,
  `${IMG}/a8098d90-3911-439a-8be1-3a154671ed25/proof-2.png`,
  `${IMG}/2e6e3bc6-0b24-4d12-bbad-ff0afbc8af5c/proof-3.png`,
  `${IMG}/5c09b4ef-d27a-4763-a363-15b18b2f3af2/proof-4.jpg`,
  `${IMG}/ecdb97e2-70ac-4a42-bdfe-0e0c09d8081c/proof-5.jpg`,
  `${IMG}/4ffda646-284b-4dcc-9152-3927c73aab2f/proof-6.png`,
  `${IMG}/2cc8ea97-6406-4916-a798-620e95bf7426/proof-7.jpg`,
  `${IMG}/0b48ac41-4da6-48d6-afac-f69f7f325b7a/proof-8.png`,
];

const FAQ_VIDEOS = [
  "How much does it actually cost to get started?",
  "What is AI dropshipping?",
  "What if I already have stores running?",
  "What results can you realistically expect?",
  "Can I do this as a beginner?",
  "Can I do this even if I'm not from the US?",
];

const STEPS: [string, string, string][] = [
  ["01", "Answer the call from our team", "This is the only way to unlock your free store, program and community."],
  ["02", "Watch the FAQ videos below", "Every question you're probably thinking gets answered before your call."],
];

const STATS: [string, string][] = [
  ["$3,484", "Program value, free"],
  ["11,700+", "People helped"],
  ["1,000+", "Stores launched"],
  ["$10M+", "Student sales"],
];

const CSS = `
.ra{
  --bg:#f4f6fb; --panel:#ffffff; --ink:#0a0a0a; --muted:#374151; --line:rgba(0,0,0,.10);
  --acc:#39d353; --acc-soft:rgba(57,211,83,.12); --acc-line:rgba(57,211,83,.4);
  --blue:#2f7bff; --amber:#f59e0b; --amber-soft:#fff7ed; --amber-line:#fdba74;
  --f:var(--ra-font),-apple-system,BlinkMacSystemFont,sans-serif;
  background:var(--bg); color:var(--muted); font-family:var(--f);
  font-size:15px; line-height:1.65; -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.ra *{box-sizing:border-box;margin:0;padding:0;}
.ra img{max-width:100%;display:block;}
.ra .wrap{max-width:1040px;margin:0 auto;padding:0 22px;}
.ra section{padding:44px 0;}

.ra .alertbar{position:sticky;top:0;z-index:50;background:#fff4e5;border-bottom:1px solid var(--amber-line);
  color:#7c2d12;font-size:13px;font-weight:700;text-align:center;padding:11px 16px;display:flex;
  align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}
.ra .alertbar b{color:#b45309;font-variant-numeric:tabular-nums;}

.ra .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:900;letter-spacing:.14em;
  text-transform:uppercase;color:var(--acc);border:1px solid var(--acc-line);border-radius:9999px;padding:7px 15px;background:var(--acc-soft);}
.ra .eyebrow.warn{color:#b45309;border-color:var(--amber-line);background:var(--amber-soft);}
.ra h1{font-size:clamp(24px,3.6vw,36px);font-weight:900;letter-spacing:-.02em;line-height:1.16;color:var(--ink);text-wrap:balance;}
.ra h2{font-size:clamp(21px,3vw,30px);font-weight:900;letter-spacing:-.02em;line-height:1.18;color:var(--ink);text-wrap:balance;}
.ra h3{font-size:16px;font-weight:800;color:var(--ink);}
.ra .center{text-align:center;}
.ra .lead{font-size:14.5px;color:var(--muted);max-width:60ch;}
.ra .lead.center{margin-left:auto;margin-right:auto;}

.ra .panel{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:26px;box-shadow:0 20px 50px -34px rgba(20,40,90,.25);}
.ra .hero{padding-top:36px;text-align:center;}
.ra .hero h1{margin:18px auto 0;max-width:26ch;}
.ra .hero p.sub{margin:14px auto 0;max-width:56ch;font-size:14.5px;color:var(--muted);}
.ra .hint{margin-top:18px;font-size:13.5px;font-weight:700;color:var(--ink);}

.ra .video{position:relative;margin:16px auto 0;max-width:760px;aspect-ratio:16/9;border-radius:16px;overflow:hidden;
  border:1px solid rgba(80,150,255,.25);background:linear-gradient(160deg,#0c1a2e,#0a1220);display:flex;align-items:center;justify-content:center;}
.ra .video .play{width:64px;height:44px;border-radius:10px;background:linear-gradient(135deg,#7db4ff,#2f7bff);position:relative;box-shadow:0 8px 30px rgba(47,123,255,.5);}
.ra .video .play::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-46%,-50%);border-style:solid;border-width:9px 0 9px 15px;border-color:transparent transparent transparent #fff;}
.ra .video .vlabel{position:absolute;bottom:9px;left:0;right:0;text-align:center;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);}

.ra .warnbox{margin:22px auto 0;max-width:760px;background:var(--amber-soft);border:1px solid var(--amber-line);
  border-radius:14px;padding:16px 20px;text-align:center;font-size:13.5px;font-weight:700;color:#7c2d12;}

.ra .steps{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px;}
@media(max-width:640px){.ra .steps{grid-template-columns:1fr;}}
.ra .step{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:22px;}
.ra .step .num{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;
  font-weight:900;color:var(--blue);background:rgba(47,123,255,.1);border:1px solid rgba(47,123,255,.28);margin-bottom:10px;}
.ra .step p{font-size:13.5px;color:var(--muted);margin-top:5px;}
.ra .step-note{margin-top:18px;font-size:13.5px;color:var(--muted);max-width:70ch;}
.ra .step-note b{color:var(--ink);}

.ra .faq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;}
@media(max-width:860px){.ra .faq-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.ra .faq-grid{grid-template-columns:1fr;}}
.ra .fvid{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:12px;}
.ra .fvid .frame{position:relative;aspect-ratio:16/9;border-radius:11px;overflow:hidden;border:1px solid rgba(80,150,255,.2);background:linear-gradient(160deg,#0c1a2e,#0a1220);display:flex;align-items:center;justify-content:center;}
.ra .fvid .frame .play{width:44px;height:31px;border-radius:8px;background:linear-gradient(135deg,#7db4ff,#2f7bff);position:relative;}
.ra .fvid .frame .play::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-46%,-50%);border-style:solid;border-width:6px 0 6px 10px;border-color:transparent transparent transparent #fff;}
.ra .fvid p{font-size:13px;font-weight:700;color:var(--ink);line-height:1.35;}

.ra .who{display:grid;grid-template-columns:1fr;gap:12px;}
.ra .who p{color:var(--muted);}
.ra .who .kick{color:var(--ink);font-weight:800;}
.ra .who .sig{margin-top:6px;font-size:12.5px;font-weight:700;color:var(--acc);}

.ra .shots{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:22px;}
@media(max-width:820px){.ra .shots{grid-template-columns:repeat(2,1fr);}}
.ra .shot{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#fff;aspect-ratio:4/3;}
.ra .shot img{width:100%;height:100%;object-fit:cover;object-position:top center;}
.ra .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px;}
@media(max-width:720px){.ra .stat-grid{grid-template-columns:repeat(2,1fr);}}
.ra .stat{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px 12px;text-align:center;}
.ra .stat .n{font-size:clamp(20px,3vw,26px);font-weight:900;color:var(--blue);letter-spacing:-.02em;}
.ra .stat .l{margin-top:5px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}

.ra .livebadge{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:900;letter-spacing:.14em;
  text-transform:uppercase;color:var(--acc);}
.ra .livebadge .dot{width:8px;height:8px;border-radius:50%;background:var(--acc);box-shadow:0 0 0 0 rgba(57,211,83,.5);animation:ra-ping 1.6s infinite;}
@keyframes ra-ping{0%{box-shadow:0 0 0 0 rgba(57,211,83,.5);}70%{box-shadow:0 0 0 8px rgba(57,211,83,0);}100%{box-shadow:0 0 0 0 rgba(57,211,83,0);}}

.ra .final{text-align:center;}
.ra .final .checks{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:16px;font-size:13.5px;font-weight:700;color:var(--ink);}
.ra .final .checks span b{color:var(--acc);margin-right:6px;}

.ra footer{border-top:1px solid var(--line);padding:36px 0 30px;text-align:center;background:#eef1f7;}
.ra footer .links{display:flex;gap:18px;justify-content:center;margin-bottom:12px;}
.ra footer .links a{color:var(--muted);text-decoration:none;font-size:13px;}
.ra footer .links a:hover{color:var(--blue);}
.ra footer .income{max-width:820px;margin:0 auto 12px;font-size:11px;color:#6b7280;line-height:1.6;}
.ra footer .copy{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;}
`;

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

const Video = ({ label }: { label: string }) => (
  <div className="video">
    {/* Replace with the real VSL embed */}
    <span className="play" aria-hidden="true" />
    <span className="vlabel">{label}</span>
  </div>
);

export default function ReceiveAccess() {
  const clock = useCountdown(10 * 60);

  return (
    <div className={`ra ${font.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="alertbar">
        ⚠ Wait — your spot isn&rsquo;t locked in yet. Our team is calling in under <b>{clock}</b> — keep your phone close.
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow warn">⚠ Action Required</span>
          <h1>
            Your Free Program Access Is Live For The Next 24 Hours. We&rsquo;re Calling In The Next 1&ndash;10 Minutes.
          </h1>
          <p className="sub">
            Get in contact with our team right now so your Free Program access doesn&rsquo;t expire. Make sure you answer
            when we reach out.
          </p>
          <p className="hint">Click on the video to see how you can claim your free access 👇</p>
          <Video label="Claim your free access" />
          <div className="warnbox">
            ⚠ Don&rsquo;t leave this page. If you do, you might lose your chance to get the $3,484 program and community
            for free.
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section>
        <div className="wrap center">
          <span className="eyebrow">What happens next</span>
          <h2 style={{ marginTop: 12 }}>Follow these steps to secure your spot</h2>
          <div className="steps" style={{ textAlign: "left" }}>
            {STEPS.map(([n, h, p]) => (
              <div className="step" key={n}>
                <div className="num">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <p className="step-note" style={{ marginLeft: "auto", marginRight: "auto" }}>
            In the next 5 to 10 minutes you&rsquo;ll get a text and a call from one of our team members. Pick up.
            They&rsquo;ll onboard you and unlock your free store, program and community. <b>Miss the call and your free
            slot goes to someone else.</b> Keep your phone nearby.
          </p>
        </div>
      </section>

      {/* FAQ VIDEOS */}
      <section>
        <div className="wrap center">
          <span className="eyebrow">Before your call</span>
          <h2 style={{ marginTop: 12 }}>Watch the FAQ videos</h2>
          <p className="lead center" style={{ marginTop: 8 }}>
            We know you have questions. Here are short videos answering the most common ones.
          </p>
          <div className="faq-grid" style={{ textAlign: "left" }}>
            {FAQ_VIDEOS.map((q) => (
              <div className="fvid" key={q}>
                <div className="frame">
                  <span className="play" aria-hidden="true" />
                </div>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A LOOK INSIDE */}
      <section>
        <div className="wrap center">
          <span className="eyebrow">A Look Inside</span>
          <h2 style={{ marginTop: 12 }}>See What&rsquo;s Inside The Program</h2>
          <p className="lead center" style={{ marginTop: 8 }}>
            A quick walkthrough of everything you just unlocked.
          </p>
          <Video label="Inside the program" />
        </div>
      </section>

      {/* NO CATCH */}
      <section>
        <div className="wrap center">
          <span className="eyebrow">No catch</span>
          <h2 style={{ marginTop: 12 }}>Wait, how is this free?</h2>
          <div className="panel who" style={{ textAlign: "left", maxWidth: 760, margin: "22px auto 0" }}>
            <p>
              People have paid thousands to learn this exact model, so you might be asking &ldquo;how are you giving this
              away for free?&rdquo;
            </p>
            <p>
              No catch. We partnered with the platforms you&rsquo;d have to use anyway to build a store. Instead of paying
              us upfront, you just start with our partner&rsquo;s software, and you get the store, the program and the
              community free.
            </p>
            <p>
              That means the only way we win is if you win. We only get taken care of by our partners if you stick around
              and actually build something, so we&rsquo;re fully invested in getting you to your first sale.
            </p>
            <p className="kick">It&rsquo;s a win-win for everyone.</p>
            <p className="sig">Andy Stauring — Founder, Ecom Simulation</p>
          </div>
        </div>
      </section>

      {/* STUDENT WINS */}
      <section>
        <div className="wrap">
          <div className="panel">
            <div className="center">
              <span className="eyebrow">Student wins</span>
              <h2 style={{ marginTop: 12 }}>People just like you who followed the system</h2>
              <p className="lead center" style={{ marginTop: 8 }}>
                Real dashboards from real members. No hype, just what happens when you actually run the process.
              </p>
            </div>
            <div className="stat-grid">
              {STATS.map(([n, l]) => (
                <div className="stat" key={l}>
                  <div className="n">{n}</div>
                  <div className="l">{l}</div>
                </div>
              ))}
            </div>
            <div className="shots">
              {PROOF.map((src, i) => (
                <div className="shot" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Student store result #${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="center" style={{ marginTop: 18 }}>
              <span className="livebadge">
                <span className="dot" /> Live
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section>
        <div className="wrap final">
          <h2>That&rsquo;s it. Now keep your phone close.</h2>
          <p className="lead center" style={{ marginTop: 10 }}>
            Our team will call to get you set up. While you wait, go through the FAQ videos above so you show up ready.
          </p>
          <div className="checks">
            <span>
              <b>✓</b>$3,484 value, unlocked
            </span>
            <span>
              <b>✓</b>No card required
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="links">
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms &amp; Conditions
            </a>
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
          <p className="income">
            Income disclaimer: results are not typical and are not a guarantee of earnings. Figures and student results
            are for illustration only. Building a business takes consistent work over time. This is educational and not
            financial, legal, or tax advice. Not affiliated with or endorsed by Meta, TikTok, Shopify, or any platform
            mentioned.
          </p>
          <p className="copy">© {new Date().getFullYear()} Ecom Simulation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
