"use client";

import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--fs-font" });

/* Opt-in lead capture -> Zapier -> wherever leads get routed from there. */
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/21197109/4409gj4/";

const IMG = "https://ecomsimulation.io/__l5e/assets-v1";
const MODULE_IMAGES = ["/paid/e1.png", "/paid/e2.png", "/paid/e3.png", "/paid/e4.png", "/paid/e5.png", "/paid/e6.png"];
const ACCESS_FLOW_IMAGE = "/paid/ecom.png";
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

/* Value stack shown in the "What's Included" card. */
const VALUE_ITEMS: { name: string; value: string; free?: boolean }[] = [
  { name: "Fully Built AI Online Store", value: "$700 value" },
  { name: "Step-By-Step Course (Follow-Along Format)", value: "$997 value" },
  { name: "Personal Onboarding Call", value: "FREE", free: true },
  { name: "Coaching Calls With 7-Figure Coaches", value: "$900 value" },
  { name: "Founder Community", value: "$500 value" },
  { name: "Step-By-Step Blueprint To Follow", value: "$400 value" },
];
const TOTAL_VALUE = "$3,497";

/* Generic, brand-agnostic facts about the dropshipping model itself. */
const WHY_ITEMS: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "No Products To Buy Upfront",
    desc: "You only pay for a product after a customer buys it from your store. No buying inventory. No risk of unsold stock sitting in your garage.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    title: "No Shipping Or Handling",
    desc: "Your supplier packs and ships everything directly to your customer. You never touch a product.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Work From Anywhere",
    desc: "Run your store from your couch after work, on your lunch break, or wherever you've got your laptop.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Your Store Runs 24/7",
    desc: "Your online store takes orders even while you're sleeping. It never closes.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Low Startup Cost",
    desc: "Most businesses require thousands to start. With branded e-commerce, you can get up and running for less than the cost of a dinner out.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Recurring Demand",
    desc: "Supplements and consumables mean customers come back every month without you doing anything.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
    title: "AI Helps You",
    desc: "AI finds products, builds the store, makes ads, handles marketing, connects suppliers. The busy work gets done fast.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "No Product To Build",
    desc: "You're the middleman. You build the store to sell their products.",
  },
];

const NEXT_STEPS: { n: string; h: string; p: string }[] = [
  { n: "1", h: "Fill Out The Short Form", p: "It takes two minutes to fill it out." },
  { n: "2", h: "Answer The Call", p: "Our team calls you, gets you the AI tool, and builds your store." },
  { n: "3", h: "Get Your Free Course Access", p: "You get instant access to the private portal — every module and all the content." },
];

const FAQ: [string, string][] = [
  ["What happens after I apply?", "A member of Andy's team calls you within 5 to 10 minutes to make sure you're a fit, then gets you set up with access the same day."],
  ["Do I need e-commerce or tech experience?", "None. This was built for complete beginners. AI does most of the heavy lifting — building your store, writing copy, and researching products. You just follow the system."],
  ["What makes this e-commerce model different?", "This is not the typical dropshipping you see with pump-and-dump stores. You're building a real branded e-commerce business with long-term equity — something you can eventually sell."],
  ["How much money do I need to start?", "You need a laptop and the AI tool subscription to get started, and down the line, a normal budget for ad spend. On your onboarding call we'll go over your situation and give you personalized guidance based on where you're at."],
  ["Can I do this while working a full-time job?", "Yes. Most members started part-time. The system is designed to run with focused effort — you don't need to quit your job first. Build revenue, then transition when it makes sense."],
  ["How much time does this take per day?", "An hour or two in the evening is plenty. The AI handles the store build, the product research, and most of the busy work. Your job is to follow the steps and stay consistent."],
  ["How do I actually make sales?", "Inside the free course, we teach you exactly how. We cover paid ads (Facebook, Instagram, TikTok), organic marketing, email/SMS marketing, and more. We walk you through exactly how to get your first sale, step by step."],
  ["Do I need to buy products upfront or handle shipping?", "No and no. You only pay for a product after a customer buys it from your store. The supplier handles packing and shipping directly to your customer. You never touch inventory."],
  ["Is this legit or is it another scam?", "Fair question. It's legit. You get a real store, a real course that used to sell for $3,497, and a real coach who gets on a call with you. Nothing is hidden. A billion-dollar AI company covers the cost because they want you using their tool. That's the whole catch."],
];

const CSS = `
.fs{
  --bg:#000000; --card:#ffffff; --border:rgba(0,0,0,0.09);
  --text:#111111; --text2:#6b7280; --green:#22c55e; --gold:#f59e0b; --accent:#22c55e;
  font-family:var(--fs-font),'Inter',sans-serif;
  background-color:var(--bg);
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size:56px 56px;
  color:#fff; line-height:1.6;
}
.fs *{box-sizing:border-box;}
.fs a{color:inherit;text-decoration:none;}
.fs img{max-width:100%;display:block;}

.fs .hero{max-width:1040px;margin:0 auto;padding:40px 24px 16px;text-align:center;}
.fs .hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,0.14);border:1px solid rgba(34,197,94,0.35);color:var(--green);font-size:0.8rem;font-weight:600;padding:5px 14px;border-radius:100px;margin-bottom:24px;letter-spacing:0.3px;}
.fs .hero h1{font-size:clamp(1.7rem,5vw,3.2rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;margin-bottom:20px;color:#fff;}
.fs .hero-sub{font-size:1.1rem;color:rgba(255,255,255,0.92);max-width:560px;margin:0 auto 20px;}
.fs .watch-first{text-align:center;color:var(--green);font-weight:700;font-size:0.95rem;margin-bottom:14px;}

.fs .video-container{max-width:720px;margin:0 auto 28px;padding:0 24px;}
.fs .video-wrapper{position:relative;width:100%;aspect-ratio:9/16;max-width:360px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:linear-gradient(135deg,#101014,#050506);display:flex;align-items:center;justify-content:center;}
.fs .vid-play{width:64px;height:64px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -8px rgba(34,197,94,0.6);}
.fs .vid-play svg{width:26px;height:26px;fill:#000;margin-left:3px;}
.fs .vid-label{position:absolute;bottom:14px;left:0;right:0;text-align:center;font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.45);}

.fs .claim-box{padding:0 24px 28px;text-align:center;}
.fs .claim-card{background:var(--card);border:1.5px solid #eee;border-radius:24px;max-width:480px;width:100%;margin:0 auto;padding:32px 28px 26px;}
.fs .claim-logo{font-family:var(--fs-font),sans-serif;font-weight:900;font-size:1.4rem;letter-spacing:-0.03em;color:#0a0a0a;margin-bottom:14px;}
.fs .claim-logo span{color:var(--green);}
.fs .claim-card h2{text-align:center;font-size:1.7rem;font-weight:900;color:#0a0a0a;letter-spacing:-0.5px;margin-bottom:10px;}
.fs .claim-card > p{text-align:center;color:#666;font-size:0.95rem;line-height:1.55;margin-bottom:24px;}
.fs form{display:flex;flex-direction:column;gap:12px;max-width:420px;margin:0 auto;text-align:left;}
.fs form input[type="text"],.fs form input[type="email"],.fs form input[type="tel"]{background:#f5f5f5;border:1.5px solid #e5e7eb;border-radius:50px;padding:15px 20px;font-size:0.95rem;font-family:var(--fs-font),sans-serif;outline:none;transition:border .15s;color:#111;width:100%;}
.fs form input:focus{border-color:var(--green);}
.fs .phone-row{display:flex;gap:10px;}
.fs .phone-row select{background:#f5f5f5;border:1.5px solid #e5e7eb;border-radius:50px;padding:15px 16px;font-size:0.9rem;font-family:var(--fs-font),sans-serif;color:#333;outline:none;cursor:pointer;min-width:96px;text-align:center;}
.fs .phone-row input{flex:1;}
.fs .agree-row{display:flex;align-items:flex-start;gap:10px;font-size:0.8rem;line-height:1.5;color:#666;cursor:pointer;padding:2px 4px;}
.fs .agree-row input{margin-top:2px;width:16px;height:16px;flex-shrink:0;accent-color:var(--green);cursor:pointer;}
.fs .agree-mark{background:#dcfce7;color:#15803d;font-weight:700;padding:0 5px;border-radius:5px;}

.fs .cta-btn{background:linear-gradient(180deg,#3ba85f 0%,#2f8049 100%);color:#fff;font-weight:800;font-size:1.05rem;letter-spacing:0.3px;text-transform:uppercase;line-height:1.25;padding:14px 40px;border-radius:14px;border:1px solid rgba(0,0,0,0.18);cursor:pointer;display:inline-block;transition:opacity .15s,transform .15s;margin-bottom:16px;width:100%;max-width:380px;font-family:var(--fs-font),sans-serif;}
.fs .cta-btn:hover{opacity:0.88;transform:translateY(-1px);}
.fs .cta-btn:disabled{opacity:0.6;cursor:not-allowed;}
.fs .cta-btn-sub{display:block;margin-top:3px;font-size:0.78rem;font-weight:600;text-transform:none;letter-spacing:0;opacity:0.9;}

.fs .review-badge{display:inline-flex;align-items:center;gap:10px;margin-top:14px;background:#0a0a0a;border-radius:100px;padding:8px 18px 8px 8px;box-shadow:0 4px 16px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);}
.fs .review-badge .stars{display:flex;gap:1px;}
.fs .review-badge .stars span{color:#facc15;font-size:0.7rem;}
.fs .review-badge .txt{font-size:0.78rem;font-weight:700;color:#fff;}

.fs .divider{border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0;}

.fs .section{max-width:800px;margin:0 auto;padding:56px 24px;}
.fs .section-label{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--green);margin-bottom:12px;text-align:center;}
.fs .section-title{font-size:clamp(1.5rem,4vw,2.2rem);font-weight:800;letter-spacing:-0.5px;margin-bottom:16px;text-align:center;color:#fff;}
.fs .section-desc{color:rgba(255,255,255,0.9);font-size:1rem;max-width:560px;margin:0 auto 40px;text-align:center;}

.fs .value-card-outer{background:var(--card);border:1.5px solid #e5e7eb;border-radius:16px;overflow:hidden;margin-top:24px;color:#111;}
.fs .value-card-brand{padding:14px 20px;border-bottom:1.5px solid #e5e7eb;text-align:center;}
.fs .value-card-brand span{font-size:0.7rem;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;}
.fs .value-row{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border-bottom:1px solid #f3f4f6;}
.fs .value-row:last-child{border-bottom:none;}
.fs .value-row-left{display:flex;align-items:center;gap:10px;}
.fs .value-check{width:22px;height:22px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.fs .value-name{font-size:0.9rem;font-weight:600;color:#111;}
.fs .value-price{font-size:0.8rem;font-weight:700;color:#6b7280;white-space:nowrap;margin-left:12px;}
.fs .value-price.free{color:#16a34a;font-weight:800;}
.fs .value-total-box{background:#f9fafb;border-top:1.5px solid #e5e7eb;padding:16px 20px;}
.fs .value-total-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
.fs .value-total-row span:first-child{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280;}
.fs .value-total-row span:last-child{font-size:0.95rem;font-weight:800;color:#9ca3af;text-decoration:line-through;}
.fs .value-price-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.fs .value-price-row span:first-child{font-size:0.95rem;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;color:#111;}
.fs .value-price-row span:last-child{font-size:1.6rem;font-weight:900;color:var(--green);}
.fs .value-urgency{text-align:center;font-size:0.75rem;color:#6b7280;line-height:1.5;}

.fs .who-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px 32px;max-width:640px;margin:0 auto;text-align:left;color:#111;}
.fs .who-card p{font-size:1rem;color:#374151;line-height:1.75;margin-bottom:16px;}
.fs .who-sig{display:flex;align-items:center;gap:16px;padding-top:20px;border-top:1px solid var(--border);}
.fs .who-sig .name{font-family:Georgia,serif;font-style:italic;font-size:1.4rem;color:var(--text);white-space:nowrap;}
.fs .who-sig .sep{width:1px;height:28px;background:var(--border);flex-shrink:0;}
.fs .who-sig .title{font-size:0.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text2);}
.fs .who-photo{max-width:640px;margin:24px auto 0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);}

.fs .why-list{background:var(--card);border:1px solid var(--border);border-radius:20px;overflow:hidden;color:#111;}
.fs .why-item{display:flex;align-items:flex-start;gap:20px;padding:28px 32px;border-bottom:1px solid var(--border);}
.fs .why-item:last-child{border-bottom:none;}
.fs .why-icon{width:48px;height:48px;background:#fdf8ef;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#c8a84b;}
.fs .why-body strong{display:block;font-size:1rem;font-weight:700;color:var(--text);margin-bottom:6px;}
.fs .why-body p{font-size:0.9rem;color:var(--text2);line-height:1.65;}

.fs .modules-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:24px;}
@media (max-width:640px){.fs .modules-grid{grid-template-columns:1fr;}}
.fs .module-shot{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);}

.fs .next-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:32px;margin-top:8px;color:#111;}
.fs .next-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;}
@media (max-width:640px){.fs .next-grid{grid-template-columns:1fr;}}
.fs .next-num{width:40px;height:40px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;margin-bottom:16px;}
.fs .next-grid strong{display:block;font-size:1.05rem;font-weight:800;color:#0a0a0a;margin-bottom:8px;}
.fs .next-grid p{font-size:0.9rem;color:#4b5563;line-height:1.6;}

.fs .win-cols{columns:3;column-gap:16px;margin-bottom:16px;}
@media (max-width:700px){.fs .win-cols{columns:2;}}
@media (max-width:480px){.fs .win-cols{columns:1;}}
.fs .win-card{break-inside:avoid;margin-bottom:16px;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;color:#111;}
.fs .win-card-label{padding:14px 18px;}
.fs .win-card-label .eyebrow{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--green);margin-bottom:4px;}
.fs .win-card-label .title{font-size:0.9rem;font-weight:700;color:var(--text);}
.fs .win-card-label .sub{font-size:0.8rem;color:var(--text2);margin-top:2px;}
.fs .win-card img{width:100%;object-fit:cover;}

.fs .faq-list{display:flex;flex-direction:column;gap:8px;}
.fs .faq-item{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;color:#111;}
.fs .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:none;border:none;color:var(--text);font-size:0.975rem;font-weight:600;cursor:pointer;text-align:left;gap:16px;font-family:var(--fs-font),sans-serif;}
.fs .faq-icon{width:22px;height:22px;flex-shrink:0;background:rgba(0,0,0,0.07);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.9rem;transition:transform .2s;}
.fs .faq-item.open .faq-icon{transform:rotate(45deg);}
.fs .faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;}
.fs .faq-a-inner{padding:0 24px 20px;font-size:0.9rem;color:var(--text2);line-height:1.7;}

.fs .urgency{display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.3);color:#f87171;font-size:0.78rem;font-weight:600;padding:5px 12px;border-radius:100px;margin-bottom:20px;}
.fs .urgency .dot{width:6px;height:6px;border-radius:50%;background:#f87171;animation:fs-pulse 1.4s infinite;}
@keyframes fs-pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}

.fs footer{border-top:1px solid rgba(255,255,255,0.1);padding:16px 24px 24px;text-align:center;color:rgba(255,255,255,0.75);font-size:0.8rem;}
.fs footer a{color:rgba(255,255,255,0.75);margin:0 8px;}
.fs footer a:hover{color:#fff;}
.fs .footer-disclaimer{max-width:700px;margin:16px auto 0;font-size:0.72rem;color:rgba(255,255,255,0.55);line-height:1.6;}

.fs .modal-overlay{display:flex;position:fixed;inset:0;z-index:999;background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:16px;}
.fs .modal-box{background:var(--card);border-radius:24px;max-width:480px;width:100%;padding:36px 32px 28px;position:relative;max-height:90vh;overflow-y:auto;color:#111;}
.fs .modal-close{position:absolute;top:16px;right:16px;background:none;border:none;font-size:1.4rem;cursor:pointer;color:#888;line-height:1;}
.fs .modal-success{text-align:center;padding:16px 0;}
.fs .modal-success .title{font-size:1.1rem;font-weight:800;color:var(--green);margin-bottom:6px;}
.fs .modal-success p{font-size:0.9rem;color:#666;}
.fs .modal-disclaimer{text-align:center;font-size:0.72rem;color:#aaa;margin-top:16px;line-height:1.6;}
.fs .modal-disclaimer a{color:#555;text-decoration:underline;}

@media (max-width:600px){
  .fs .hero{padding:24px 16px 8px;}
  .fs .section{padding:40px 16px;}
  .fs .claim-card{padding:26px 20px 22px;}
  .fs .who-card{padding:22px 20px;}
  .fs .why-item{padding:22px 20px;gap:14px;}
  .fs .value-card-outer{margin-top:20px;}
}
`;

const COUNTRIES = [
  ["+1", "\u{1F1FA}\u{1F1F8} +1"],
  ["+44", "\u{1F1EC}\u{1F1E7} +44"],
  ["+61", "\u{1F1E6}\u{1F1FA} +61"],
  ["+64", "\u{1F1F3}\u{1F1FF} +64"],
  ["+49", "\u{1F1E9}\u{1F1EA} +49"],
  ["+33", "\u{1F1EB}\u{1F1F7} +33"],
  ["+353", "\u{1F1EE}\u{1F1EA} +353"],
  ["+55", "\u{1F1E7}\u{1F1F7} +55"],
  ["+52", "\u{1F1F2}\u{1F1FD} +52"],
];

const CHECK = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type FormState = { name: string; email: string; country: string; phone: string; agree: boolean };
const EMPTY_FORM: FormState = { name: "", email: "", country: "+1", phone: "", agree: false };

function LeadForm({
  form,
  setForm,
  onSubmit,
  submitting,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="First name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <div className="phone-row">
        <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
          {COUNTRIES.map(([code, label]) => (
            <option value={code} key={label}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          required
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <label className="agree-row">
        <input type="checkbox" required checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} />
        <span>
          By checking this box you understand that it is a requirement to have at least{" "}
          <mark className="agree-mark">$50</mark>
          {" "}
          to be able to access these tools. If that&rsquo;s not possible for you, please LEAVE this page now.
        </span>
      </label>
      <button type="submit" className="cta-btn" disabled={submitting}>
        {submitting ? "Sending..." : "Claim Your Free Access"}
      </button>
    </form>
  );
}

export default function FreeStore() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineForm, setInlineForm] = useState<FormState>(EMPTY_FORM);
  const [modalForm, setModalForm] = useState<FormState>(EMPTY_FORM);
  const exitFiredRef = useRef(false);
  const exitReadyRef = useRef(false);
  const lastScrollRef = useRef({ y: 0, t: 0 });

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".fs .faq-item").forEach((item) => {
      const q = item.querySelector<HTMLElement>(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      const handler = () => {
        const open = item.classList.contains("open");
        document.querySelectorAll(".fs .faq-item.open").forEach((o) => {
          o.classList.remove("open");
          const oa = o.querySelector<HTMLElement>(".faq-a");
          if (oa) oa.style.maxHeight = "0px";
        });
        if (!open && a) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      };
      q?.addEventListener("click", handler);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      exitReadyRef.current = true;
    }, 20000);

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && exitReadyRef.current && !exitFiredRef.current) {
        exitFiredRef.current = true;
        setModalOpen(true);
      }
    };
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const last = lastScrollRef.current;
      if (y > 300 && y < last.y && now - last.t < 300 && exitReadyRef.current && !exitFiredRef.current) {
        exitFiredRef.current = true;
        setModalOpen(true);
      }
      lastScrollRef.current = { y, t: now };
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const submitLead = async (form: FormState) => {
    const phone = form.phone.trim();
    const digits = phone.replace(/\D/g, "");
    if (!form.name.trim() || !form.email.trim() || digits.length < 7 || !form.agree) return false;
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: phone.startsWith("+") ? phone : form.country + phone,
          source: "free-store",
        }),
      });
    } catch {
      /* fall through to redirect either way */
    }
    window.location.href = `/receiveaccess?name=${encodeURIComponent(form.name)}`;
    return true;
  };

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineSubmitting(true);
    const ok = await submitLead(inlineForm);
    if (!ok) setInlineSubmitting(false);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    const ok = await submitLead(modalForm);
    if (ok) setModalDone(true);
    else setModalSubmitting(false);
  };

  return (
    <div className={`fs ${font.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">
          <span style={{ color: "#f97316", fontSize: "0.9rem" }}>&#10022;</span>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase" }}>
            Free E-commerce Program
          </span>
        </div>
        <h1>
          I&rsquo;ll Help You Build A Successful E&#8209;commerce Business Completely For <span style={{ color: "var(--green)" }}>FREE</span>
        </h1>
        <p className="hero-sub">
          Watch the short video below. I show you exactly what this is, why I&rsquo;m giving it away, and how my team
          gets you set up. No experience and no degree needed.
        </p>
      </div>

      <p className="watch-first">&#8595; Watch this first, it&rsquo;s short and it explains everything.</p>

      {/* VIDEO */}
      <div className="video-container">
        <div className="video-wrapper" aria-label="Free program overview video">
          {/* Replace with the real VSL embed */}
          <span className="vid-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span className="vid-label">[ VSL embed goes here ]</span>
        </div>
      </div>

      {/* CLAIM CARD */}
      <div className="claim-box">
        <div className="claim-card">
          <div className="claim-logo">
            Ecom<span>Simulation</span>
          </div>
          <h2>Claim Your Free Access</h2>
          <p>Drop your info below and a coach will call you to onboard you.</p>
          <LeadForm form={inlineForm} setForm={setInlineForm} onSubmit={handleInlineSubmit} submitting={inlineSubmitting} />
        </div>
        <div className="review-badge">
          <div className="stars">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <span className="txt">4.7 From 100+ Reviews</span>
        </div>
      </div>

      <hr className="divider" />

      {/* WHAT'S INCLUDED */}
      <div className="section">
        <h2 className="section-title">
          You&rsquo;re Not Just Getting A Store. You&rsquo;re Getting The Whole Blueprint And The Tools To Build It.
        </h2>
        <p style={{ textAlign: "center", fontSize: "1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
          Other platforms hand you a store and disappear. We stay with you until it works.
        </p>

        <div className="value-card-outer">
          <div className="value-card-brand">
            <span>AI Ecommerce Store</span>
          </div>
          <div>
            {VALUE_ITEMS.map((item) => (
              <div className="value-row" key={item.name}>
                <div className="value-row-left">
                  <div className="value-check">{CHECK}</div>
                  <span className="value-name">{item.name}</span>
                </div>
                <span className={`value-price ${item.free ? "free" : ""}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="value-total-box">
            <div className="value-total-row">
              <span>Total Value</span>
              <span>{TOTAL_VALUE}</span>
            </div>
            <div className="value-price-row">
              <span>Your Price</span>
              <span>FREE</span>
            </div>
            <p className="value-urgency">
              &#9889; This won&rsquo;t be free forever. Our partners currently cover the cost — but that could change
              at any time.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button className="cta-btn" onClick={() => setModalOpen(true)}>
            GET MY SYSTEM <span aria-hidden="true">→</span>
            <span className="cta-btn-sub">(AI Tools + Free Course)</span>
          </button>
        </div>
      </div>

      <hr className="divider" />

      {/* NO CATCH */}
      <div className="section">
        <p className="section-label">No Catch</p>
        <h2 className="section-title">
          Wait, <span style={{ color: "var(--green)" }}>Who Are You and How Is This Free?</span>
        </h2>
        <div className="who-card">
          <p>
            My name is Andy Stauring. I&rsquo;ve generated 8 figures in the past 6 years through e-commerce, and have
            been documenting my journey over the last 5 years.
          </p>
          <p>
            I used to charge {TOTAL_VALUE} for this program. Now a billion-dollar AI company covers it because they
            want you using their tool. They pay me, you get the course for free, and the only thing you need is the
            AI tool itself.
          </p>
          <p>
            This is the exact tool that&rsquo;s helped our students build real, branded stores from scratch — no
            experience needed.
          </p>
          <div className="who-sig">
            <span className="name">Andy</span>
            <span className="sep" />
            <span className="title">Founder, EcomSimulation</span>
          </div>
        </div>
        <div className="who-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ACCESS_FLOW_IMAGE} alt="How you get access" loading="lazy" />
        </div>
      </div>

      <hr className="divider" />

      {/* WHY THIS MODEL */}
      <div className="section">
        <p className="section-label">Why This Model</p>
        <h2 className="section-title">Why Thousands Of People Are Choosing This Online Business</h2>
        <div className="why-list">
          {WHY_ITEMS.map((item) => (
            <div className="why-item" key={item.title}>
              <div className="why-icon">{item.icon}</div>
              <div className="why-body">
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      {/* FULL PROGRAM */}
      <div className="section" style={{ maxWidth: 1100 }}>
        <p className="section-label">What&rsquo;s Inside</p>
        <h2 className="section-title">The Full Program You Just Unlocked</h2>
        <div className="modules-grid">
          {MODULE_IMAGES.map((src, i) => (
            <div className="module-shot" key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Module ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="section">
        <p className="section-label">What Happens Next</p>
        <h2 className="section-title">
          Here&rsquo;s Exactly What To Do <span style={{ color: "var(--green)", fontStyle: "italic" }}>Now.</span>
        </h2>
        <div className="next-card">
          <div className="next-grid">
            {NEXT_STEPS.map((s) => (
              <div key={s.n}>
                <div className="next-num">{s.n}</div>
                <strong>{s.h}</strong>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* TESTIMONIALS */}
      <div className="section">
        <p className="section-label">Student Wins</p>
        <h2 className="section-title">People Just Like You Who Followed The System</h2>
        <p className="section-desc">No hype. Just outcomes from students who went through the same system you&rsquo;re about to access.</p>

        <div className="win-cols">
          {PROOF.map((src, i) => (
            <div className="win-card" key={src}>
              <div className="win-card-label">
                <div className="eyebrow">Member Result</div>
                <div className="title">Real Student Dashboard</div>
                <div className="sub">Unedited screenshot from a member&rsquo;s store</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Member result ${i + 1}`} loading="lazy" />
            </div>
          ))}
          {STORES.map((src, i) => (
            <div className="win-card" key={src}>
              <div className="win-card-label">
                <div className="eyebrow">AI-Built Store</div>
                <div className="title">Live Member Store</div>
                <div className="sub">Built by our AI on a real onboarding call</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`AI-built store ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className="cta-btn" style={{ maxWidth: 380 }} onClick={() => setModalOpen(true)}>
            GET MY SYSTEM <span aria-hidden="true">→</span>
            <span className="cta-btn-sub">(AI Tools + Free Course)</span>
          </button>
        </div>
      </div>

      <hr className="divider" />

      {/* FAQ */}
      <div className="section">
        <p className="section-label">Common Questions</p>
        <h2 className="section-title">Got Questions? We&rsquo;ve Got Answers.</h2>
        <p className="section-desc" style={{ marginBottom: 32 }}>
          Everything people ask before they get started.
        </p>
        <div className="faq-list">
          {FAQ.map(([q, a]) => (
            <div className="faq-item" key={q}>
              <button className="faq-q" type="button">
                {q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">{a}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className="cta-btn" style={{ maxWidth: 380 }} onClick={() => setModalOpen(true)}>
            GET MY SYSTEM <span aria-hidden="true">→</span>
            <span className="cta-btn-sub">(AI Tools + Free Course)</span>
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">
              &times;
            </button>
            <div className="claim-logo" style={{ textAlign: "center" }}>
              Ecom<span>Simulation</span>
            </div>
            <h2 style={{ textAlign: "center", fontSize: "1.7rem", fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.5px", marginBottom: 10 }}>
              Claim Your Free Access
            </h2>
            <p style={{ textAlign: "center", color: "#666", fontSize: "0.95rem", lineHeight: 1.55, marginBottom: 28 }}>
              Drop your info below and a coach will call you to onboard you.
            </p>

            {!modalDone ? (
              <LeadForm form={modalForm} setForm={setModalForm} onSubmit={handleModalSubmit} submitting={modalSubmitting} />
            ) : (
              <div className="modal-success">
                <p className="title">You&rsquo;re in!</p>
                <p>We&rsquo;ll reach out within 24 hours to get you set up. Check your inbox.</p>
              </div>
            )}

            <p className="modal-disclaimer">
              Your information is 100% secure.
              <br />
              By submitting you agree to our{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                terms
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                policies
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div>
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </div>
        <p className="footer-disclaimer">
          Income disclaimer: results are not typical and are not a guarantee of earnings. Individual results will
          vary based on effort, experience, background, and market conditions. This is an educational program. We
          make no guarantees of income or business outcomes.
        </p>
        <p className="footer-disclaimer" style={{ marginTop: 10 }}>
          This website is not endorsed by, affiliated with, or associated with Meta Platforms, Inc. (formerly
          Facebook, Inc.). Facebook is a trademark of Meta Platforms, Inc.
        </p>
        <p style={{ marginTop: 12 }}>© {new Date().getFullYear()} EcomSimulation. All rights reserved.</p>
      </footer>
    </div>
  );
}
