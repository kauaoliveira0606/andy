"use client";

import { useEffect } from "react";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--fs-font" });

/* Wire this to the real lead-form / opt-in destination before launch. */
const CTA_URL = "#claim";

const IMG = "https://ecomsimulation.io/__l5e/assets-v1";
const GWAGON = `${IMG}/f794f1a6-65e2-47b0-b23b-a66fdb5e6b97/andy-gwagon-2.jpg`;
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
const STORES = [
  `${IMG}/be0f5ed8-f885-45ab-95d4-2287b5075b0d/ai-store-4.avif`,
  `${IMG}/577e553f-79d9-43ae-b379-35705a3dd1d8/ai-store-6.avif`,
  `${IMG}/afb89d2c-52d9-4597-932e-d5549e395b58/ai-store-7.png`,
  `${IMG}/1130ccf0-f596-4751-be89-73f35c1ecef9/ai-store-8.png`,
  `${IMG}/d401245e-f050-4295-92d9-d98f0f593505/ai-store-9.png`,
  `${IMG}/fff83430-de05-4b1f-97f2-50a00855d43c/ai-store-10.png`,
];

const STATS: [string, string][] = [
  ["1,000+", "Students started with us"],
  ["1,000+", "Stores launched"],
  ["$10M+", "In student sales"],
];

const VALUE: [string, string][] = [
  ["The Complete AI Dropshipping Course", "$997"],
  ["Coaching Calls With 7 Figure Coaches", "$900"],
  ["Founder Community", "$500"],
  ["The AI Store Builder (Done For You) + Winning Products Loaded", "$700"],
  ["Step-By-Step Blueprint To Follow", "$400"],
];

const SYSTEM: [string, string, string][] = [
  ["Find", "Pick Your Person, Then Your Product", "Instead of chasing random trending products, you pick a specific group of people with a real problem, then find the products that solve it. That's what makes a brand instead of a store with a countdown timer."],
  ["Build", "The AI Builds Your Store", "Product loaded, pages written, checkout wired up. Live in minutes, then you make it yours."],
  ["Create", "Make Content That Sells", "Organic content and AI-made ads, taught by people who do it every day."],
  ["Launch", "Run Your First Ads", "Start small, let the data talk, and never touch the budget while it's testing."],
  ["Scale", "Feed What Works", "Cut the losers, scale the winners, and let systems handle more orders without more hours."],
];

const STEPS: [string, string, string][] = [
  ["1", "Claim Your Free Access", "Enter your details in under a minute. No card, no commitment."],
  ["2", "Answer The Call", "Our team calls you, gets you the AI tool, and builds your store."],
  ["3", "Make Your First Sale", "Follow the system, launch your product, and make your first sale."],
];

const FAQ: [string, string][] = [
  [
    "Is it really free? What's the catch?",
    "Yes, it is free. Thousands of people have paid for this program. A billion-dollar AI company pays us when you become a long-term user of their platform, so you get the whole program free and they get a new high-quality user. You win, we win, they win.",
  ],
  [
    "How much does it actually cost to get started?",
    "Access to the course, coaching, community, AI store builder and blueprint is free. You still need a normal budget for the essentials of running a store, such as ad spend and any tools you choose to add. There is no card required to sign up.",
  ],
  [
    "I've never sold online and I'm not techy, can I still do this?",
    "Yes. The AI builds the store, our team gets you set up on the call, and the blueprint tells you what to do next at every step. No experience or tech skills needed.",
  ],
  [
    "Do I actually own the store, or do you control it?",
    "You own it. It is built on your account, in your name, and it is yours to keep and run.",
  ],
  [
    "Can I do this with a full-time job, or will I be doing customer service all day?",
    "Most members work this around a job. The store is built for you, the system tells you what to focus on, and fulfilment and support get handled with tools rather than hours at a desk.",
  ],
];

const CSS = `
.fs{
  --bg:#03060c; --bg-card:linear-gradient(135deg,#0a0f18,#0d1522); --band:#000;
  --acc:#39d353; --acc-soft:rgba(57,211,83,.10); --acc-line:rgba(57,211,83,.28);
  --red:#ef4444; --btn:linear-gradient(135deg,#7db4ff,#2f7bff 55%,#6db0ff);
  --border:rgba(255,255,255,.09); --border-2:rgba(57,211,83,.4); --glow:rgba(57,211,83,.22);
  --text:#fff; --text-dim:rgba(255,255,255,.85); --text-mut:rgba(255,255,255,.55);
  --f:var(--fs-font),-apple-system,BlinkMacSystemFont,sans-serif;
  background:var(--bg); color:var(--text-dim); font-family:var(--f);
  font-size:16px; line-height:1.7; -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.fs *{box-sizing:border-box;margin:0;padding:0;}
.fs ::selection{background:var(--acc);color:#04140a;}
.fs img{max-width:100%;display:block;}
.fs .wrap{max-width:1080px;margin:0 auto;padding:0 22px;}
.fs section{padding:58px 0;}
.fs .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);border:1px solid var(--acc-line);border-radius:9999px;padding:8px 16px;background:var(--acc-soft);}
.fs h1{font-size:clamp(26px,4.4vw,44px);font-weight:900;letter-spacing:-.02em;line-height:1.12;color:#fff;text-wrap:balance;}
.fs h2{font-size:clamp(24px,3.6vw,38px);font-weight:900;letter-spacing:-.02em;line-height:1.14;color:#fff;text-wrap:balance;}
.fs h3{font-size:19px;font-weight:800;color:#fff;letter-spacing:-.01em;}
.fs .green{color:var(--acc);}
.fs .redx{color:var(--red);}
.fs .center{text-align:center;}
.fs .lead{font-size:17px;color:var(--text-dim);max-width:56ch;}
.fs .lead.center{margin-left:auto;margin-right:auto;}

.fs .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:460px;
  font-size:16px;font-weight:900;letter-spacing:.01em;padding:18px 28px;border-radius:9999px;text-decoration:none;
  background:var(--btn);color:#fff;box-shadow:0 12px 34px -10px rgba(47,123,255,.55);
  transition:transform .15s,opacity .15s;cursor:pointer;border:0;}
.fs .btn:hover{transform:translateY(-1px);opacity:.94;}
.fs .btn .arw{transition:transform .2s;}
.fs .btn:hover .arw{transform:translateX(3px);}
.fs .cta-wrap{display:flex;flex-direction:column;align-items:center;}

/* hero */
.fs .hero{padding-top:34px;text-align:center;position:relative;}
.fs .hero::before{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 640px 340px at 50% -8%,rgba(57,211,83,.10),transparent 65%);}
.fs .hero-inner{position:relative;max-width:900px;margin:0 auto;}
.fs .hero h1{margin:22px auto 0;max-width:20ch;}
.fs .hero p.sub{margin:16px auto 0;max-width:52ch;font-size:16px;color:var(--text-dim);}
.fs .video-box{margin:26px auto 0;max-width:760px;aspect-ratio:16/9;border-radius:16px;border:1px solid var(--border);
  background:linear-gradient(160deg,#0c1622,#05090f);display:flex;align-items:center;justify-content:center;
  box-shadow:0 24px 60px -30px var(--glow);}
.fs .video-box .play{width:66px;height:46px;border-radius:10px;background:var(--btn);position:relative;box-shadow:0 8px 30px rgba(47,123,255,.45);}
.fs .video-box .play::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-46%,-50%);border-style:solid;border-width:9px 0 9px 15px;border-color:transparent transparent transparent #fff;}
.fs .video-note{position:absolute;bottom:10px;left:0;right:0;text-align:center;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-mut);}
.fs .social{margin-top:24px;display:flex;flex-wrap:wrap;gap:12px 26px;justify-content:center;align-items:center;font-size:13px;color:var(--text-mut);}
.fs .social > span{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;}
.fs .avatars{display:flex;}
.fs .avatars img{width:30px;height:30px;border-radius:50%;border:2px solid var(--bg);object-fit:cover;margin-left:-8px;}
.fs .avatars img:first-child{margin-left:0;}
.fs .stars{color:#ffb020;letter-spacing:1px;}

/* stats */
.fs .stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:760px;margin:0 auto;}
@media(max-width:640px){.fs .stat-grid{grid-template-columns:1fr;}}
.fs .stat{border:1px solid var(--border);border-radius:16px;background:var(--bg-card);padding:26px 16px;text-align:center;}
.fs .stat .n{font-size:clamp(26px,4vw,38px);font-weight:900;color:var(--acc);line-height:1;letter-spacing:-.02em;}
.fs .stat:nth-child(3) .n{color:var(--acc);}
.fs .stat .l{margin-top:8px;font-size:13px;color:var(--text-mut);}

/* cards / value stack */
.fs .card{border:1px solid var(--border);border-radius:20px;background:var(--bg-card);padding:26px;max-width:720px;margin:26px auto 0;box-shadow:0 24px 60px -34px var(--glow);}
.fs .value-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid var(--border);}
.fs .value-row:last-of-type{border-bottom:0;}
.fs .value-row .name{font-size:14.5px;font-weight:600;color:var(--text);}
.fs .value-row .price{flex-shrink:0;font-size:14.5px;font-weight:800;color:var(--red);text-decoration:line-through;}
.fs .total-row{display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-weight:900;}
.fs .total-row .lbl{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);}
.fs .total-row .val{font-size:19px;color:var(--red);text-decoration:line-through;}
.fs .price-today{display:flex;align-items:center;justify-content:space-between;margin-top:10px;border:1px solid var(--border-2);border-radius:14px;padding:14px 18px;background:var(--acc-soft);}
.fs .price-today .lbl{font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#fff;font-weight:800;}
.fs .price-today .val{font-size:24px;font-weight:900;color:var(--acc);}
.fs .scarcity{margin-top:14px;text-align:center;font-size:12.5px;color:var(--text-mut);}

/* who / no catch */
.fs .who{display:grid;grid-template-columns:1fr 340px;gap:26px;align-items:center;}
@media(max-width:760px){.fs .who{grid-template-columns:1fr;}}
.fs .who p{margin-top:12px;color:var(--text-dim);}
.fs .who p:first-child{margin-top:0;}
.fs .who .kick{color:#fff;font-weight:800;}
.fs .who-photo{border-radius:20px;overflow:hidden;border:1px solid var(--border);}
.fs .who-photo img{width:100%;height:100%;object-fit:cover;}

/* screenshot grids */
.fs .shots{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px;}
@media(max-width:820px){.fs .shots{grid-template-columns:repeat(2,1fr);}}
@media(max-width:520px){.fs .shots{grid-template-columns:1fr;}}
.fs .shot{border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--bg-card);aspect-ratio:4/3;}
.fs .shot img{width:100%;height:100%;object-fit:cover;object-position:top center;}
.fs .shots.stores .shot{aspect-ratio:16/10;}
.fs .disclaim{margin-top:16px;font-size:12px;color:var(--text-mut);max-width:760px;}

/* system steps */
.fs .sys-list{display:grid;gap:14px;max-width:820px;margin:28px auto 0;}
.fs .sys{display:grid;grid-template-columns:120px 1fr;gap:20px;border:1px solid var(--border);border-radius:14px;background:var(--bg-card);padding:22px 24px;}
@media(max-width:640px){.fs .sys{grid-template-columns:1fr;gap:8px;}}
.fs .sys .k{font-size:12px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);padding-top:3px;}
.fs .sys p{font-size:14px;color:var(--text-dim);margin-top:5px;}

/* how it works */
.fs .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px;}
@media(max-width:760px){.fs .steps{grid-template-columns:1fr;}}
.fs .step{border:1px solid var(--border);border-radius:16px;background:var(--bg-card);padding:26px 22px;}
.fs .step .num{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:var(--acc);background:var(--acc-soft);border:1px solid var(--acc-line);margin-bottom:12px;}
.fs .step p{font-size:13.5px;color:var(--text-dim);margin-top:6px;}

/* faq */
.fs .faq{max-width:820px;margin:28px auto 0;display:grid;gap:12px;}
.fs .faq-item{border:1px solid var(--border);border-radius:12px;background:var(--bg-card);overflow:hidden;}
.fs .faq-item.open{border-color:var(--border-2);}
.fs .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 22px;
  background:none;border:0;cursor:pointer;color:#fff;font-family:var(--f);font-size:15.5px;font-weight:800;text-align:left;}
.fs .faq-q .pl{flex-shrink:0;width:26px;height:26px;border-radius:6px;background:var(--acc-soft);border:1px solid var(--acc-line);color:var(--acc);display:flex;align-items:center;justify-content:center;font-size:16px;transition:transform .25s;}
.fs .faq-item.open .pl{transform:rotate(45deg);}
.fs .faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;}
.fs .faq-a p{padding:0 22px 20px;font-size:14.5px;color:var(--text-dim);}

/* final cta */
.fs .final{background:var(--band);border-top:1px solid var(--border-2);text-align:center;}
.fs .final .valline{display:flex;align-items:center;justify-content:space-between;font-size:13px;}
.fs .final .valline .old{text-decoration:line-through;color:var(--red);}
.fs .final .valline .new{color:var(--acc);font-weight:800;}
.fs .final ul{list-style:none;margin:16px 0 0;display:grid;gap:8px;text-align:left;}
.fs .final li{font-size:13.5px;color:var(--text-dim);}
.fs .final li b{color:var(--acc);font-weight:900;margin-right:8px;}

/* footer */
.fs footer{background:#000;border-top:1px solid var(--border);padding:44px 0 36px;text-align:center;}
.fs footer .links{display:flex;gap:18px;justify-content:center;margin-bottom:14px;}
.fs footer .links a{color:var(--text-dim);text-decoration:none;font-size:13px;}
.fs footer .links a:hover{color:var(--acc);}
.fs footer .income{max-width:820px;margin:0 auto 14px;font-size:11.5px;color:var(--text-mut);line-height:1.65;}
.fs footer .copy{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);}
`;

export default function FreeStore() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".fs .faq-item").forEach((item) => {
      const q = item.querySelector<HTMLElement>(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      q?.addEventListener("click", () => {
        const open = item.classList.contains("open");
        document.querySelectorAll(".fs .faq-item.open").forEach((o) => {
          o.classList.remove("open");
          o.querySelector<HTMLElement>(".faq-a")!.style.maxHeight = "0px";
        });
        if (!open && a) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }, []);

  const Cta = ({ label = "Get My Free Store + Program" }: { label?: string }) => (
    <div className="cta-wrap">
      <a href={CTA_URL} className="btn">
        {label} <span className="arw" aria-hidden="true">→</span>
      </a>
    </div>
  );

  return (
    <div className={`fs ${font.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="hero" id="claim">
        <div className="wrap">
          <div className="hero-inner">
            <span className="eyebrow">Free Store + Free Program</span>
            <h1>
              I Charged <span className="redx">$3,497</span> For My AI Dropshipping Program. Today, You Get It{" "}
              <span className="green">FREE.</span>
            </h1>
            <p className="sub">
              Watch the short video below. Your store is built by AI in about 10 minutes, and our team calls you to set
              the whole thing up. No experience or tech skills needed.
            </p>
            <div className="video-box">
              {/* Replace with the real VSL embed */}
              <span className="play" aria-hidden="true" />
              <span className="video-note">[ VSL embed goes here ]</span>
            </div>
            <div style={{ marginTop: 22 }}>
              <Cta />
            </div>
            <div className="social">
              <span>
                <span className="avatars">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://ecomsimulation.io/assets/m1-BmqYXOR6.jpg" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://ecomsimulation.io/assets/m2-BbOCtJlv.jpg" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://ecomsimulation.io/assets/m3-CpOlQfeh.jpg" alt="" />
                </span>
                <span>
                  Join <b style={{ color: "#fff" }}>1,000+</b> Ecom entrepreneurs
                </span>
              </span>
              <span>
                <span className="stars">★★★★★</span>
                <b style={{ color: "#fff" }}>4.7</b> from 100+ reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stat-grid">
            {STATS.map(([n, l]) => (
              <div className="stat" key={l}>
                <div className="n">{n}</div>
                <div className="l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Included</span>
            <h2 style={{ marginTop: 14 }}>Everything You Get</h2>
          </div>
          <div className="card">
            {VALUE.map(([name, price]) => (
              <div className="value-row" key={name}>
                <span className="name">{name}</span>
                <span className="price">{price}</span>
              </div>
            ))}
            <div className="total-row">
              <span className="lbl">Total Value</span>
              <span className="val">$3,497</span>
            </div>
            <div className="price-today">
              <span className="lbl">Your Price Today</span>
              <span className="val">FREE</span>
            </div>
            <p className="scarcity">This will not be free forever. It goes back to $3,497 once free access closes.</p>
          </div>
          <div style={{ marginTop: 26 }} className="center">
            <Cta />
          </div>
        </div>
      </section>

      {/* NO CATCH */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">No Catch</span>
            <h2 style={{ marginTop: 14 }}>Wait, Who Are You And Why Is This Free?</h2>
          </div>
          <div className="card">
            <div className="who">
              <div>
                <p>
                  My name is Andy Stauring. I&rsquo;ve generated 8 figures in the past 6 years through e-commerce, and
                  have been documenting my journey over the last 5 years.
                </p>
                <p>
                  Thousands of people have paid for this program. So the fair question is: why give it away now? Where is
                  the catch?
                </p>
                <p>
                  There is none. A billion-dollar AI company pays us when you become a long-term user of their platform.
                  You get the whole program free. They get a new high-quality user.
                </p>
                <p className="kick">You win, we win, they win.</p>
              </div>
              <div className="who-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GWAGON} alt="Andy Stauring" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBER RESULTS */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Live · new wins posted this week</span>
            <h2 style={{ marginTop: 14 }}>See How Our Members Are Doing</h2>
            <p className="lead center" style={{ marginTop: 10 }}>
              Real dashboards from real members. No edits, no cherry picking, just what happens when you actually run the
              process.
            </p>
          </div>
          <div className="shots">
            {PROOF.map((src, i) => (
              <div className="shot" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Member result ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="disclaim">
            Results shown are from student stores and are not typical. Building an ecommerce business carries risk. See the
            full disclaimer at the bottom of this page.
          </p>
        </div>
      </section>

      {/* AI-BUILT STORES */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Live</span>
            <h2 style={{ marginTop: 14 }}>Here Are Some Stores Our AI Built</h2>
            <p className="lead center" style={{ marginTop: 10 }}>
              Real stores generated for members. Yours is built the same way, on your call.
            </p>
          </div>
          <div className="shots stores">
            {STORES.map((src, i) => (
              <div className="shot" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`AI-built store ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SYSTEM */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">The System</span>
            <h2 style={{ marginTop: 14 }}>One System. Every Step Laid Out.</h2>
            <p className="lead center" style={{ marginTop: 10 }}>
              This is the exact 6-week path inside the program. No guessing what comes next, ever.
            </p>
          </div>
          <div className="sys-list">
            {SYSTEM.map(([k, h, p]) => (
              <div className="sys" key={k}>
                <div className="k">{k}</div>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">How It Works</span>
            <h2 style={{ marginTop: 14 }}>You Are 3 Steps From Started</h2>
          </div>
          <div className="steps">
            {STEPS.map(([n, h, p]) => (
              <div className="step" key={n}>
                <div className="num">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Questions</span>
            <h2 style={{ marginTop: 14 }}>Frequently Asked Questions</h2>
          </div>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <div className="faq-item" key={q}>
                <button className="faq-q" type="button">
                  {q}
                  <span className="pl">+</span>
                </button>
                <div className="faq-a">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="wrap">
          <span className="eyebrow">Get Started</span>
          <h2 style={{ marginTop: 14 }}>Start Your Store For Free</h2>
          <p className="lead center" style={{ marginTop: 10 }}>
            Takes under a minute. Our team calls you to get the AI tool set up and build your store.
          </p>
          <div className="card">
            <div className="valline">
              <span className="old">$3,497 value</span>
              <span className="new">Today you pay nothing</span>
            </div>
            <ul>
              <li>
                <b>✓</b>A to Z course
              </li>
              <li>
                <b>✓</b>Coaching calls
              </li>
              <li>
                <b>✓</b>AI store builder and winning products
              </li>
              <li>
                <b>✓</b>Community
              </li>
              <li>
                <b>✓</b>Step-by-step roadmap
              </li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <Cta />
            </div>
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
            financial, legal, or tax advice. Not affiliated with or endorsed by Meta, TikTok, Wix, or any platform
            mentioned.
          </p>
          <p className="copy">© {new Date().getFullYear()} Ecom Simulation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
