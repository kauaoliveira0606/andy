"use client";

import { useEffect } from "react";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--gp-font" });

/* Where the thank-you page "Watch The Videos Here" button lands. */

const PROOF = [
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68401724ce15dfb404e29823.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/68401769ce15df3d78e29884.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b632ac070d197d70522c5c.png",
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/OT0RsAWoihpP1XyWE3Xp/media/67b63294dfd955fcaac40f61.png",
];
const WINS = [
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
  "https://ecomsimulation.io/__l5e/assets-v1/51754f44-121b-444f-baa8-a14ca19078f6/proof-1.jpg",
  "https://ecomsimulation.io/__l5e/assets-v1/a8098d90-3911-439a-8be1-3a154671ed25/proof-2.png",
  "https://ecomsimulation.io/__l5e/assets-v1/2e6e3bc6-0b24-4d12-bbad-ff0afbc8af5c/proof-3.png",
  "https://ecomsimulation.io/__l5e/assets-v1/5c09b4ef-d27a-4763-a363-15b18b2f3af2/proof-4.jpg",
  "https://ecomsimulation.io/__l5e/assets-v1/ecdb97e2-70ac-4a42-bdfe-0e0c09d8081c/proof-5.jpg",
  "https://ecomsimulation.io/__l5e/assets-v1/4ffda646-284b-4dcc-9152-3927c73aab2f/proof-6.png",
  "https://ecomsimulation.io/__l5e/assets-v1/2cc8ea97-6406-4916-a798-620e95bf7426/proof-7.jpg",
  "https://ecomsimulation.io/__l5e/assets-v1/0b48ac41-4da6-48d6-afac-f69f7f325b7a/proof-8.png",
];

const CSS = `
.gp{
  --bg:#000; --bg-alt:#05101e; --bg-card:linear-gradient(135deg,#07121f,#0d2240); --band:#030910;
  --border:rgba(74,158,255,0.18); --border-2:rgba(74,158,255,0.38);
  --blue:#4a9eff; --blue-dim:#1a3aff; --blue-glow:rgba(74,158,255,0.28); --cyan:#7dd8f8; --red:#ff5c5c;
  --text:#fff; --text-dim:rgba(255,255,255,0.9); --text-mut:rgba(255,255,255,0.62);
  --mono:var(--gp-font),'Montserrat',sans-serif;
  background:var(--bg); color:var(--text);
  font-family:var(--gp-font),'Montserrat',-apple-system,BlinkMacSystemFont,sans-serif;
  font-size:17px; line-height:1.65; -webkit-font-smoothing:antialiased; overflow-x:hidden;
  position:relative;
}
.gp *{box-sizing:border-box;margin:0;padding:0;}
.gp ::selection{background:var(--blue);color:#fff;}
.gp img{max-width:100%;}

.gp .bg{position:fixed;inset:0;background:linear-gradient(160deg,#000 0%,#040d18 45%,#000 100%);z-index:0;overflow:hidden;pointer-events:none;}
.gp .ray{position:absolute;width:1px;border-radius:9999px;transform-origin:top center;animation:gp-ray ease-in-out infinite alternate;}
@keyframes gp-ray{0%{opacity:.06;}100%{opacity:.18;}}
.gp .ray:nth-child(1){height:100vh;left:28%;top:0;background:linear-gradient(to bottom,rgba(30,10,200,0),rgba(60,30,255,.9) 70%,rgba(30,10,180,0));transform:rotate(8deg);animation-duration:6s;width:1.5px;}
.gp .ray:nth-child(2){height:85vh;left:31%;top:5%;background:linear-gradient(to bottom,rgba(20,5,160,0),rgba(35,15,200,.4) 50%,rgba(20,5,140,0));transform:rotate(8.5deg);animation-duration:8s;}
.gp .ray:nth-child(3){height:90vh;left:65%;top:10%;background:linear-gradient(to bottom,rgba(20,5,170,0),rgba(80,40,255,.8) 65%,rgba(20,5,150,0));transform:rotate(11deg);animation-duration:7s;width:1.5px;}

.gp #gp-progress{position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#1a3aff,#4a9eff);z-index:1000;transition:width .1s linear;}

.gp .top-strip{position:relative;z-index:2;background:#1a47ff;color:#fff;font-family:var(--mono);font-size:10.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;text-align:center;padding:10px 20px;box-shadow:0 2px 20px rgba(26,71,255,.4);}
.gp .top-strip span{font-weight:900;}

.gp nav{position:sticky;top:0;z-index:900;background:rgba(0,0,0,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border);}
.gp .nav-inner{max-width:1140px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:62px;}
.gp .nav-logo{display:flex;align-items:center;gap:10px;font-weight:900;font-size:15px;letter-spacing:.02em;color:var(--text);text-decoration:none;white-space:nowrap;}
.gp .nav-logo span{color:var(--blue);}
.gp .nav-logo svg{width:26px;height:26px;display:block;border-radius:7px;}
.gp .nav-links{display:flex;gap:22px;align-items:center;}
.gp .nav-links a{color:var(--text-mut);text-decoration:none;font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:color .2s;}
.gp .nav-links a:hover,.gp .nav-links a.active{color:var(--text);}
.gp .nav-cta{background:linear-gradient(135deg,#1a3aff,#4a9eff);color:#fff!important;padding:9px 16px;border-radius:999px;box-shadow:0 0 16px rgba(74,158,255,.4);transition:opacity .15s!important;}
.gp .nav-cta:hover{opacity:.88;}
.gp .nav-burger{display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;}
.gp .nav-burger span{width:22px;height:2px;background:var(--text);display:block;border-radius:2px;transition:.25s;}
.gp .nav-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.gp .nav-burger.open span:nth-child(2){opacity:0;}
.gp .nav-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
@media (max-width:900px){
  .gp .nav-burger{display:flex;}
  .gp .nav-links{position:absolute;top:62px;left:0;right:0;background:#000;border-bottom:1px solid var(--border);flex-direction:column;padding:20px 24px;gap:18px;display:none;}
  .gp .nav-links.open{display:flex;}
}

.gp .wrap{max-width:1140px;margin:0 auto;padding:0 24px;position:relative;z-index:1;}
.gp section{padding:92px 0;position:relative;z-index:1;}
.gp section.alt{background:var(--bg-alt);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.gp .eyebrow{display:block;font-family:var(--mono);font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);margin-bottom:16px;}
.gp h2{font-size:clamp(27px,4vw,40px);font-weight:900;letter-spacing:-.02em;line-height:1.12;margin-bottom:18px;text-wrap:balance;}
.gp h2 .accent,.gp h1 .accent{color:var(--blue);}
.gp .lead{font-size:18px;color:var(--text-dim);max-width:680px;margin-bottom:14px;}

.gp .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
.gp .reveal.visible{opacity:1;transform:translateY(0);}
.gp .reveal.d1{transition-delay:.08s;}.gp .reveal.d2{transition-delay:.16s;}.gp .reveal.d3{transition-delay:.24s;}.gp .reveal.d4{transition-delay:.32s;}

.gp .welcome{padding:72px 0 60px;border-bottom:1px solid var(--border);}
.gp .welcome-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:40px 44px;max-width:820px;margin:0 auto;box-shadow:0 24px 60px -30px var(--blue-glow);}
.gp .welcome-card h2{font-size:clamp(23px,3.4vw,33px);margin-bottom:20px;}
.gp .welcome-card p{color:var(--text-dim);margin-bottom:15px;font-size:16.5px;}
.gp .welcome-card p:last-of-type{margin-bottom:0;}
.gp .welcome-card strong{color:var(--text);}
.gp .welcome-sign{margin-top:24px;font-weight:900;font-style:italic;}
.gp .welcome-sign-role{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--blue);margin-top:6px;}
@media (max-width:720px){.gp .welcome-card{padding:30px 24px;}}

.gp .hero{padding:84px 0 92px;position:relative;overflow:hidden;border-bottom:1px solid var(--border);}
.gp .hero-inner{position:relative;z-index:1;display:grid;grid-template-columns:1.12fr .88fr;gap:56px;align-items:center;}
@media (max-width:940px){.gp .hero-inner{grid-template-columns:1fr;gap:44px;}}
.gp .hero-badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--text);background:var(--bg-card);border:1px solid var(--border);padding:8px 16px;border-radius:9999px;margin-bottom:26px;}
.gp .hero-badge .dot{width:7px;height:7px;border-radius:50%;background:var(--blue);box-shadow:0 0 0 3px rgba(74,158,255,.25);animation:gp-pulse 1.6s ease-out infinite;}
@keyframes gp-pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
.gp h1{font-size:clamp(34px,5.2vw,56px);font-weight:900;letter-spacing:-.02em;line-height:1.08;margin-bottom:24px;text-wrap:balance;background:linear-gradient(180deg,#fff 0%,#e0e8f0 30%,#fff 60%,#c8d4dc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.gp h1 .accent{-webkit-text-fill-color:var(--blue);}
.gp .hero-sub{font-size:17px;color:var(--text-dim);max-width:540px;margin-bottom:34px;padding-left:18px;border-left:2px solid var(--blue-dim);}
.gp .hero-sub strong{color:var(--text);}
.gp .hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px;}
.gp .btn{display:inline-flex;align-items:center;gap:10px;font-family:inherit;font-size:15px;font-weight:800;letter-spacing:.03em;padding:15px 26px;border-radius:999px;text-decoration:none;cursor:pointer;border:0;transition:opacity .15s,transform .15s,box-shadow .15s;}
.gp .btn-primary{background:linear-gradient(135deg,#1a3aff,#4a9eff);color:#fff;box-shadow:0 0 22px rgba(74,158,255,.4);}
.gp .btn-primary:hover{opacity:.9;transform:translateY(-1px);}
.gp .btn-ghost{background:transparent;color:var(--text);border:1.5px solid var(--border-2);}
.gp .btn-ghost:hover{background:rgba(74,158,255,.08);border-color:var(--blue);}
.gp .hero-stats{display:flex;gap:40px;flex-wrap:wrap;}
.gp .hstat .num{font-size:30px;font-weight:900;color:var(--text);letter-spacing:-.02em;line-height:1.1;}
.gp .hstat .num em{font-style:normal;color:var(--blue);}
.gp .hstat .lbl{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);margin-top:6px;}

.gp .chart-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:26px;box-shadow:0 24px 48px -20px var(--blue-glow);position:relative;}
.gp .chart-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1a3aff,#4a9eff);border-radius:16px 16px 0 0;}
.gp .chart-card .chip-row{display:flex;gap:10px;margin:4px 0 16px;flex-wrap:wrap;}
.gp .chip{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:9999px;display:inline-flex;align-items:center;gap:7px;border:1px solid var(--border);}
.gp .chip .sw{width:16px;height:3px;border-radius:2px;display:inline-block;}
.gp .chip.liq{color:#ff8a94;}.gp .chip.liq .sw{background:#ff5c5c;}
.gp .chip.flow{color:var(--blue);}.gp .chip.flow .sw{background:var(--blue);}
.gp .chart-card svg{width:100%;height:auto;display:block;}
.gp .chart-note{margin-top:14px;font-size:13.5px;color:var(--text-mut);text-align:center;font-style:italic;}
.gp .draw-line{stroke-dasharray:900;stroke-dashoffset:900;animation:gp-draw 2.2s ease forwards .4s;}
@keyframes gp-draw{to{stroke-dashoffset:0;}}

.gp .two-col{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}
@media (max-width:880px){.gp .two-col{grid-template-columns:1fr;gap:40px;}}
.gp .story-points{display:flex;flex-direction:column;margin-top:6px;}
.gp .spoint{display:flex;gap:18px;padding:18px 0;border-bottom:1px solid var(--border);}
.gp .spoint:last-child{border-bottom:none;}
.gp .spoint .ico{flex-shrink:0;width:42px;height:42px;border-radius:8px;background:var(--bg-card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:900;color:var(--blue);}
.gp .spoint h4{font-size:16.5px;font-weight:800;margin-bottom:3px;}
.gp .spoint p{font-size:15px;color:var(--text-dim);}
.gp .story-side{position:sticky;top:90px;display:grid;gap:18px;}
.gp .video-caption{display:flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);padding-left:4px;}
.gp .video-embed{position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;border:1px solid var(--border);background:linear-gradient(160deg,#0c1a2e,#060d18);box-shadow:0 20px 50px -24px var(--blue-glow);display:flex;align-items:center;justify-content:center;}
.gp .video-embed .play-btn{width:66px;height:46px;border-radius:10px;background:linear-gradient(135deg,#1a3aff,#4a9eff);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(74,158,255,.45);}
.gp .video-embed .play-btn::after{content:"";display:block;margin-left:3px;border-style:solid;border-width:10px 0 10px 17px;border-color:transparent transparent transparent #fff;}
.gp .video-embed .vlabel{position:absolute;bottom:10px;left:0;right:0;text-align:center;font-family:var(--mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-mut);}
.gp .video-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}
.gp .section-video{max-width:780px;margin:44px auto 0;display:grid;gap:14px;}
.gp .section-video .video-caption{justify-content:center;padding-left:0;}
.gp .model-note{max-width:780px;margin:20px auto 0;padding:24px 28px;border-left:3px solid var(--blue-dim);background:var(--bg-alt);border-radius:0 10px 10px 0;color:var(--text-dim);font-size:15.5px;line-height:1.7;}
.gp .model-note strong{color:var(--text);}
.gp .model-note p + p{margin-top:12px;}
.gp .quote-card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;overflow:hidden;position:relative;box-shadow:0 20px 44px -22px var(--blue-glow);}
.gp .quote-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--cyan);z-index:2;}
.gp .quote-card .note-body{padding:26px 30px 30px;}
.gp .quote-card .note-label{display:block;width:fit-content;margin:0 0 16px;font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);border:1px solid rgba(125,216,248,.45);padding:5px 12px;border-radius:9999px;}
.gp .quote-card .note-text{font-size:16px;line-height:1.65;color:var(--text-dim);margin-bottom:20px;}
.gp .quote-card .note-text strong{color:var(--text);}
.gp .quote-card .who-name{font-weight:900;font-size:16px;}
.gp .quote-card .who-role{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);margin-top:3px;}

.gp .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px;}
@media (max-width:900px){.gp .pillars{grid-template-columns:repeat(2,1fr);}}
@media (max-width:520px){.gp .pillars{grid-template-columns:1fr;}}
.gp .pillar-card{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px 22px;transition:transform .2s,border-color .2s;}
.gp .pillar-card:hover{transform:translateY(-3px);border-color:var(--blue);}
.gp .pillar-num{font-family:var(--mono);font-size:12px;font-weight:800;color:var(--blue);margin-bottom:12px;}
.gp .pillar-card h3{font-size:17px;font-weight:800;margin-bottom:6px;}
.gp .pillar-card p{font-size:14px;color:var(--text-dim);line-height:1.55;}

.gp .yes-banner{margin-top:18px;background:var(--bg-card);color:var(--text);border-radius:14px;border:1px solid var(--border-2);padding:30px 34px;display:flex;gap:22px;align-items:center;flex-wrap:wrap;box-shadow:0 20px 44px -24px var(--blue-glow);}
.gp .yes-banner .big-check{width:50px;height:50px;border-radius:10px;background:linear-gradient(135deg,#1a3aff,#4a9eff);display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;flex-shrink:0;font-weight:900;box-shadow:0 0 18px rgba(74,158,255,.4);}
.gp .yes-banner > div:last-child{flex:1;min-width:260px;}
.gp .yes-banner h3{font-size:21px;font-weight:900;margin-bottom:6px;}
.gp .yes-banner p{color:var(--text-dim);font-size:15.5px;max-width:760px;}
.gp .yes-banner strong{color:var(--blue);font-weight:700;}

.gp .rhythm-list{list-style:none;display:grid;gap:12px;margin-top:36px;max-width:820px;}
.gp .rhythm-list li{display:flex;gap:16px;align-items:flex-start;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:18px 22px;}
.gp .rhythm-list .time{flex-shrink:0;font-family:var(--mono);font-weight:800;font-size:10px;color:var(--text);background:rgba(74,158,255,.12);padding:6px 12px;border-radius:6px;letter-spacing:.1em;white-space:nowrap;margin-top:2px;text-transform:uppercase;border:1px solid var(--border);}
.gp .rhythm-list .what strong{display:block;font-size:16px;}
.gp .rhythm-list .what span{font-size:14px;color:var(--text-dim);}

.gp .plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px;align-items:start;}
@media (max-width:900px){.gp .plan-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto;}}
.gp .plan-card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:28px 26px;position:relative;overflow:hidden;transition:transform .2s,border-color .2s;}
.gp .plan-card:hover{transform:translateY(-3px);border-color:var(--blue);}
.gp .plan-card.feature{border-color:var(--border-2);box-shadow:0 24px 60px -34px var(--blue-glow);}
.gp .plan-card.feature::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1a3aff,#4a9eff);}
.gp .plan-badge{position:absolute;top:14px;right:14px;font-family:var(--mono);font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);border:1px solid var(--border-2);padding:4px 9px;border-radius:9999px;}
.gp .plan-name{font-size:19px;font-weight:900;margin-bottom:4px;}
.gp .plan-sub{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);margin-bottom:18px;}
.gp .plan-list{list-style:none;display:grid;gap:11px;}
.gp .plan-list li{display:flex;gap:11px;font-size:14px;color:var(--text-dim);line-height:1.5;}
.gp .plan-list li::before{content:"✓";color:var(--blue);font-weight:900;flex-shrink:0;}
.gp .plan-note{margin-top:24px;font-size:14.5px;color:var(--text-mut);max-width:760px;}
.gp .plan-note strong{color:var(--text-dim);}

.gp .split-cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px;}
@media (max-width:820px){.gp .split-cards{grid-template-columns:1fr;}}
.gp .fail-card,.gp .win-card{border-radius:14px;padding:32px;background:var(--bg-card);border:1px solid var(--border);position:relative;overflow:hidden;}
.gp .fail-card::before,.gp .win-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;}
.gp .fail-card::before{background:var(--red);}
.gp .win-card::before{background:linear-gradient(90deg,#1a3aff,#4a9eff);}
.gp .fail-card h3,.gp .win-card h3{font-size:20px;font-weight:900;margin-bottom:18px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.gp .fail-card h3 .tag,.gp .win-card h3 .tag{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:4px 10px;border-radius:9999px;}
.gp .fail-card h3 .tag{border:1px solid rgba(255,92,92,.4);color:var(--red);}
.gp .win-card h3 .tag{border:1px solid rgba(74,158,255,.4);color:var(--blue);}
.gp .fail-card ul,.gp .win-card ul{list-style:none;display:grid;gap:13px;}
.gp .fail-card li,.gp .win-card li{display:flex;gap:12px;font-size:15px;color:var(--text-dim);line-height:1.6;}
.gp .fail-card li::before{content:"\\2715";color:var(--red);font-family:var(--mono);font-weight:700;flex-shrink:0;}
.gp .win-card li::before{content:"+";color:var(--blue);font-family:var(--mono);font-weight:700;flex-shrink:0;}

.gp .data-note,.gp .roadmap-note{margin-top:26px;padding:24px 28px;border-left:3px solid var(--blue-dim);background:var(--bg-alt);border-radius:0 10px 10px 0;color:var(--text-dim);font-size:16px;max-width:880px;}
.gp section.alt .data-note{background:rgba(74,158,255,.05);}
.gp .data-note strong,.gp .roadmap-note strong{color:var(--text);}

.gp .play-group{font-family:var(--mono);font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--blue);margin-top:36px;margin-bottom:12px;}
.gp .play-list{list-style:none;counter-reset:pl;display:grid;gap:10px;max-width:820px;}
.gp .play-list li{counter-increment:pl;display:flex;gap:16px;align-items:flex-start;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:16px 20px;}
.gp .play-list li::before{content:counter(pl);flex-shrink:0;width:26px;height:26px;border-radius:7px;background:rgba(74,158,255,.12);border:1px solid var(--border);color:var(--blue);font-family:var(--mono);font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px;}
.gp .play-list li strong{display:block;font-size:15.5px;font-weight:700;}
.gp .play-list li span{font-size:14px;color:var(--text-dim);}

.gp .payout-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:40px;align-items:start;}
@media (max-width:720px){.gp .payout-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto;}}
.gp .payout-shot{display:block;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 24px 60px -34px var(--blue-glow);}
.gp .payout-shot img{display:block;width:100%;height:auto;}
.gp .payout-disclaim,.gp .students-disclaim{margin-top:22px;font-size:12.5px;color:var(--text-mut);max-width:760px;}

.gp .testimonials{column-count:3;column-gap:16px;margin-top:40px;}
@media (max-width:820px){.gp .testimonials{column-count:2;}}
@media (max-width:520px){.gp .testimonials{column-count:1;}}
.gp .t-card{break-inside:avoid;margin-bottom:16px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
.gp .t-card img{display:block;width:100%;height:auto;}

.gp .faq-list{max-width:840px;margin:40px auto 0;display:grid;gap:12px;}
.gp .faq-item{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s;}
.gp .faq-item.open{border-color:var(--border-2);}
.gp .faq-q{width:100%;background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 26px;color:var(--text);font-family:inherit;font-size:17px;font-weight:800;text-align:left;}
.gp .faq-q .plus{flex-shrink:0;width:28px;height:28px;border-radius:6px;background:rgba(74,158,255,.12);color:var(--blue);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:16px;font-weight:700;transition:transform .3s;}
.gp .faq-item.open .plus{transform:rotate(45deg);}
.gp .faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.gp .faq-a p{padding:0 26px 24px;color:var(--text-dim);font-size:15.5px;}
.gp .faq-a p + p{padding-top:14px;}

.gp .summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;}
@media (max-width:880px){.gp .summary-grid{grid-template-columns:repeat(2,1fr);}}
@media (max-width:560px){.gp .summary-grid{grid-template-columns:1fr;}}
.gp .sum-card{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px 22px;font-size:14.5px;color:var(--text-dim);line-height:1.6;transition:transform .2s,border-color .2s;}
.gp .sum-card:hover{transform:translateY(-3px);border-color:var(--blue);}
.gp .sum-card .k{font-weight:900;font-size:17px;color:var(--text);display:block;margin-bottom:6px;}
.gp .sum-card strong{color:var(--blue);}

.gp .next-section{background:var(--band);color:var(--text);text-align:center;border-top:1px solid var(--border-2);}
.gp .next-section .eyebrow{color:var(--blue);}
.gp .checklist{max-width:660px;margin:40px auto;display:grid;gap:12px;text-align:left;}
.gp .check-progress{font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mut);margin-bottom:8px;}
.gp .check-progress strong{color:var(--blue);}
.gp .check-item{display:flex;gap:16px;align-items:flex-start;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:18px 22px;cursor:pointer;transition:border-color .2s;}
.gp .check-item:hover,.gp .check-item.done{border-color:var(--blue);}
.gp .check-item .box{flex-shrink:0;width:26px;height:26px;border-radius:6px;border:2px solid var(--border-2);display:flex;align-items:center;justify-content:center;font-size:15px;color:transparent;transition:all .2s;margin-top:2px;font-weight:900;}
.gp .check-item.done .box{background:linear-gradient(135deg,#1a3aff,#4a9eff);border-color:var(--blue);color:#fff;}
.gp .check-item .txt{font-size:15.5px;color:var(--text-dim);}
.gp .check-item.done .txt{color:var(--text);}
.gp .check-item .txt a{color:var(--blue);font-weight:700;text-decoration:none;border-bottom:1px solid var(--blue-dim);}
.gp .signature{font-size:22px;color:var(--text);margin-top:40px;font-weight:800;font-style:italic;}
.gp .signature-role{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);margin-top:10px;}

.gp footer{background:#000;border-top:1px solid var(--border);padding:52px 0 40px;}
.gp .disclaimer{background:var(--bg-alt);border:1px solid var(--border);border-radius:10px;padding:24px 28px;font-size:12px;color:var(--text-mut);line-height:1.7;max-width:920px;margin:0 auto 24px;}
.gp .disclaimer strong{color:var(--text-dim);}
.gp .foot-links{text-align:center;margin-bottom:12px;}
.gp .foot-links a{color:var(--text-dim);text-decoration:none;margin:0 10px;font-size:13px;}
.gp .foot-links a:hover{color:var(--blue);}
.gp .foot-row{text-align:center;font-family:var(--mono);font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--text-mut);}

.gp #gp-toTop{position:fixed;bottom:26px;right:26px;z-index:800;width:46px;height:46px;border-radius:10px;background:var(--bg-card);border:1px solid var(--border-2);color:var(--text);font-size:18px;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .25s,transform .2s;display:flex;align-items:center;justify-content:center;}
.gp #gp-toTop.show{opacity:1;pointer-events:auto;}
.gp #gp-toTop:hover{transform:translateY(-3px);}
`;

const ESMark = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#0F1115" stroke="rgba(74,158,255,0.3)" strokeWidth="1" />
    <circle cx="32" cy="32" r="25" fill="none" stroke="#4a9eff" strokeWidth="6" />
    <text x="32" y="38" textAnchor="middle" fontFamily="Montserrat, Arial, sans-serif" fontSize="21" fontWeight="800" fill="#4a9eff">
      ES
    </text>
  </svg>
);

const VideoPlaceholder = ({ label }: { label: string }) => (
  <div className="video-embed" aria-label={label}>
    {/* Replace with the real video embed */}
    <span className="play-btn" aria-hidden="true" />
    <span className="vlabel">{label}</span>
  </div>
);

const YouTubeEmbed = ({ id, start = 0, title }: { id: string; start?: number; title: string }) => (
  <div className="video-embed">
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?start=${start}&rel=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);

const NAV = [
  ["#story", "The Story"],
  ["#method", "The Method"],
  ["#roadmap", "Roadmap"],
  ["#goal", "Our Goal"],
  ["#proof", "Proof"],
  ["#results", "Results"],
  ["#faq", "FAQ"],
];

export default function GuideContent() {
  useEffect(() => {
    const progress = document.getElementById("gp-progress");
    const toTop = document.getElementById("gp-toTop");
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progress) progress.style.width = pct + "%";
      if (toTop) toTop.classList.toggle("show", h.scrollTop > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".gp .reveal").forEach((el) => io.observe(el));

    const burger = document.getElementById("gp-burger");
    const navLinks = document.getElementById("gp-navLinks");
    const toggleNav = () => {
      burger?.classList.toggle("open");
      navLinks?.classList.toggle("open");
    };
    burger?.addEventListener("click", toggleNav);
    navLinks?.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger?.classList.remove("open");
        navLinks?.classList.remove("open");
      })
    );

    document.querySelectorAll(".gp .faq-item").forEach((item) => {
      const q = item.querySelector<HTMLElement>(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      q?.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".gp .faq-item.open").forEach((o) => {
          o.classList.remove("open");
          o.querySelector<HTMLElement>(".faq-a")!.style.maxHeight = "0px";
        });
        if (!isOpen && a) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });

    const checks = Array.from(document.querySelectorAll<HTMLElement>(".gp [data-check]"));
    const progressEl = document.getElementById("gp-checkProgress");
    let saved: number[] = [];
    try {
      saved = JSON.parse(localStorage.getItem("ecomsimGuideChecklist") || "[]");
    } catch {}
    const refresh = () => {
      const done = document.querySelectorAll(".gp .check-item.done").length;
      if (progressEl)
        progressEl.innerHTML =
          "<strong>" + done + " of " + checks.length + "</strong> complete" + (done === checks.length ? ". You're ready." : "");
    };
    checks.forEach((c, i) => {
      if (saved.includes(i)) c.classList.add("done");
      c.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).tagName === "A") return;
        c.classList.toggle("done");
        const state: number[] = [];
        checks.forEach((cc, ii) => cc.classList.contains("done") && state.push(ii));
        try {
          localStorage.setItem("ecomsimGuideChecklist", JSON.stringify(state));
        } catch {}
        refresh();
      });
    });
    refresh();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`gp ${font.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div id="gp-progress" />
      <div className="bg" aria-hidden="true">
        <span className="ray" />
        <span className="ray" />
        <span className="ray" />
      </div>

      <div className="top-strip">
        Private Guide · Prepared For Your Call With <span>EcomSimulation</span>
      </div>

      <nav>
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            {ESMark} Ecom<span>Simulation</span>
          </a>
          <div className="nav-links" id="gp-navLinks">
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href="#next" className="nav-cta">
              Prep For Your Call
            </a>
          </div>
          <button className="nav-burger" id="gp-burger" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <span id="top" />

      {/* ===== WELCOME LETTER ===== */}
      <section className="welcome">
        <div className="wrap">
          <div className="welcome-card reveal">
            <span className="eyebrow">Start Here</span>
            <h2>Congratulations On Booking Your Call.</h2>
            <p>
              Between now and your call, my job is simple: help you do your due diligence. Give you as much information as
              possible so you can decide whether working with us is a fit for you, or not.
            </p>
            <p>
              Everything on this page is built for that. My story and how I actually run my brands. The exact product
              framework and the 10-week roadmap we put you through. The worst-case scenario in plain terms, and the
              process we use to take someone with no store to a brand owner doing real numbers. Plus the questions people
              ask us most at this stage, answered in writing.
            </p>
            <p>
              You will also find <strong>the proof: real revenue from our brands and from student stores</strong>,
              straight from Shopify and the ad accounts, so you know this is a real business and not someone who just
              sells courses. Alongside that, interviews and testimonials from students who ran the same framework.
            </p>
            <p>
              On top of this page you will get a handful of emails from us over the next few days. Not one email, a
              handful. They all exist to give you more information so you are well informed. We want you confident in your
              decision either way, whether you are in or out.
            </p>
            <p>
              Scroll down and go through all of it. If anything is still open, bring it to your call and we will answer it
              there. I look forward to helping you.
            </p>
            <div className="welcome-sign">Andy</div>
            <div className="welcome-sign-role">Founder, EcomSimulation</div>
          </div>
        </div>
      </section>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div>
              <div className="hero-badge reveal">
                <span className="dot" /> You Booked A Call · Start Here
              </div>
              <h1 className="reveal d1">
                Finally Build An Ecommerce Brand That&rsquo;s <span className="accent">Actually Yours</span>
              </h1>
              <p className="hero-sub reveal d2">
                This is your complete guide to the <strong>EcomSimulation</strong> mentorship with Andy Stauring, who
                documents his brands publicly. Read it before your call so we can skip the basics and spend the time on
                your situation.
              </p>
              <div className="hero-actions reveal d3">
                <a href="#story" className="btn btn-primary">
                  Read The Guide ↓
                </a>
                <a href="#proof" className="btn btn-ghost">
                  See The Revenue Proof
                </a>
              </div>
              <div className="hero-stats reveal d4">
                <div className="hstat">
                  <div className="num">
                    <em>$12M+</em>
                  </div>
                  <div className="lbl">Andy&rsquo;s Total Ecom Revenue</div>
                </div>
                <div className="hstat">
                  <div className="num">
                    <em>1</em>
                  </div>
                  <div className="lbl">Product, Picked On Data</div>
                </div>
                <div className="hstat">
                  <div className="num">
                    <em>$1K</em>
                  </div>
                  <div className="lbl">Revenue Day Target In 10 Weeks</div>
                </div>
              </div>
            </div>

            <div className="chart-card reveal d2">
              <div className="chip-row">
                <span className="chip liq">
                  <span className="sw" /> Ad Spend
                </span>
                <span className="chip flow">
                  <span className="sw" /> Revenue
                </span>
              </div>
              <svg viewBox="0 0 460 260" role="img" aria-label="Revenue climbing toward a $1K day">
                <g stroke="rgba(255,255,255,0.08)">
                  <line x1="40" y1="30" x2="440" y2="30" />
                  <line x1="40" y1="80" x2="440" y2="80" />
                  <line x1="40" y1="130" x2="440" y2="130" />
                  <line x1="40" y1="180" x2="440" y2="180" />
                  <line x1="40" y1="220" x2="440" y2="220" />
                </g>
                <g fill="rgba(255,255,255,0.4)" fontFamily="Montserrat, sans-serif" fontSize="9" textAnchor="end">
                  <text x="34" y="223">$0</text>
                  <text x="34" y="183">$210</text>
                  <text x="34" y="133">$525</text>
                  <text x="34" y="83">$840</text>
                  <text x="34" y="33">$1050</text>
                </g>
                <g fill="rgba(255,255,255,0.4)" fontFamily="Montserrat, sans-serif" fontSize="9" textAnchor="middle">
                  <text x="70" y="238">D1</text>
                  <text x="150" y="238">D20</text>
                  <text x="240" y="238">D40</text>
                  <text x="330" y="238">D55</text>
                  <text x="428" y="238">D70</text>
                </g>
                <path
                  className="draw-line"
                  d="M55 205 L120 200 L190 196 L260 198 L330 192 L430 188"
                  fill="none"
                  stroke="#ff5c5c"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  className="draw-line"
                  d="M55 216 L120 198 L190 168 L260 130 L330 86 L430 40"
                  fill="none"
                  stroke="#4a9eff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <g fill="#4a9eff">
                  <circle cx="55" cy="216" r="3" />
                  <circle cx="190" cy="168" r="3" />
                  <circle cx="330" cy="86" r="3" />
                  <circle cx="430" cy="40" r="4" />
                </g>
              </svg>
              <div className="chart-note">Live store in less than 10 weeks, and scale towards $1k a day.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section id="story" className="alt">
        <div className="wrap">
          <span className="eyebrow reveal">Welcome From Andy</span>
          <div className="two-col">
            <div className="story-copy">
              <h2 className="reveal">
                The Story Behind <span className="accent">EcomSimulation</span>
              </h2>
              <p className="lead reveal d1">
                I started broke in college with $79. This is the short version of how that turned into a repeatable
                framework for building a brand, and why I built EcomSimulation around it.
              </p>
              <div className="story-points">
                {[
                  ["1", "Started With $79", "College, no safety net. I scaled my first dropshipping store to $300k before I really understood what I was doing. The results were there. The system was not."],
                  ["2", "The Testing Trap", "I did it the way everyone teaches: test product after product, find a winner, watch it die in three weeks, repeat. I was a product researcher, not a business owner."],
                  ["3", "The Shift: One Proven Product", "Everything changed when I stopped testing. I picked one product on numbers and proven demand, put my logo and packaging on it from day one, and went all in on scaling that one brand."],
                  ["4", "Treating It Like A Brand", "A brand-focused pet store hitting $10k days within weeks. Not rented from a supplier. An actual asset. Documented publicly to 120K+ subscribers."],
                  ["5", "Multiple 7-Figure Brands", "$12M+ in total ecom revenue across multiple businesses by 25, while travelling 50+ countries and running them a few hours a day."],
                  ["6", "Building The Mentorship", "I built EcomSimulation to hand serious people that same framework, the same supplier and AI tool access, and the 1-on-1 accountability I wish I had, so they skip the years of trial and error I went through."],
                ].map(([n, h, p]) => (
                  <div className="spoint reveal" key={n}>
                    <div className="ico">{n}</div>
                    <div>
                      <h4>{h}</h4>
                      <p>{p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="story-side">
              <div className="video-caption reveal">▶ Watch: Andy&rsquo;s Story</div>
              <div className="reveal d1">
                <VideoPlaceholder label="Andy's story video" />
              </div>
              <div className="quote-card reveal d2">
                <div className="note-body">
                  <span className="note-label">A Note From Andy</span>
                  <p className="note-text">
                    Before you get on the phone with my team, I want you to have the full picture:{" "}
                    <strong>what I sell, how the one-product framework works, and what your first 10 weeks inside
                    EcomSimulation actually look like.</strong> Read this first so the call is about you, not the basics.
                  </p>
                  <div className="who-name">Andy Stauring</div>
                  <div className="who-role">Founder · EcomSimulation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== METHOD ===== */}
      <section id="method">
        <div className="wrap">
          <span className="eyebrow reveal">The Method</span>
          <h2 className="reveal">
            The Model Behind <span className="accent">A Real Brand</span>
          </h2>

          <div className="section-video reveal" style={{ marginTop: 28 }}>
            <div className="video-caption">▶ Watch: How AI Dropshipping Works</div>
            <YouTubeEmbed id="1jQdxMdN7jg" start={13} title="How AI dropshipping works" />
            <div className="model-note">
              <p>
                The model is simple, and honestly a little boring: <strong>you sit in the middle.</strong> You connect
                people who make good products with a community that has a real problem those products solve. It is the
                same position Amazon, Uber and Airbnb started from before they owned anything.
              </p>
              <p>
                You are not inventing a product or fronting a warehouse. You start lean, with no inventory, and let it
                compound. Every month you build <strong>customer data, supplier relationships and brand trust</strong> a
                competitor cannot copy overnight. Margins improve, suppliers give you better terms, and customers come
                back and buy again.
              </p>
              <p>
                Later, once the brand is proven, you go direct to manufacturers, hold inventory and build the full
                operation. The people who win are not chasing a new viral product every 30 days. They pick{" "}
                <strong>one real problem</strong> and keep stacking on it until the business is an asset that runs without
                them.
              </p>
            </div>
          </div>

          <div className="yes-banner reveal">
            <div className="big-check">✓</div>
            <div>
              <h3>Not A Course. A Mentored Build.</h3>
              <p>
                If you have bought an ecom course before, you know how it goes: a video library, a Discord link, and a
                dead chat. This is the opposite. You get <strong>1:1 coaching calls</strong>, text support with your
                mentor plus Loom video feedback, four group calls a week, and a personalized roadmap tracked in the
                Strategy Dashboard.
              </p>
            </div>
          </div>

          <ul className="rhythm-list">
            {[
              ["1:1", "Coaching Calls With Your Mentor", "Private calls that audit your product, store, ads and numbers against what is working right now."],
              ["Ongoing", "Text Support + Loom Video Feedback", "Message your mentor when you are stuck on a product, a supplier, a page or an ad. Feedback comes back as text and screen-recorded Loom walkthroughs."],
              ["4x / Week", "Group Coaching Calls (10 Weeks)", "Four live calls every week for ten weeks: Q&A, teardowns and real-time feedback with the coaches and other members."],
              ["Dashboard", "Personalized Roadmap", "Your exact next steps tracked in the Strategy Dashboard, so you always know the one thing to do next."],
              ["10 Weeks", "Exclusive Ecom Community & Network", "An active room of members at every stage, all running the same framework."],
              ["Lifetime", "The Branded Dropshipping Course", "Lifetime access to the full curriculum behind the one-product brand framework."],
              ["Invite", "Angel Investment Program", "Members who build real traction get the potential to join our Angel Investment Program."],
            ].map(([t, s, d]) => (
              <li className="reveal" key={s}>
                <span className="time">{t}</span>
                <span className="what">
                  <strong>{s}</strong>
                  <span>{d}</span>
                </span>
              </li>
            ))}
          </ul>

          <h2 className="reveal" style={{ marginTop: 64 }}>
            How We Work Together
          </h2>
          <p className="lead reveal d1">
            Three tracks, same framework. Which one fits depends on where you are starting and how much 1-on-1 time you
            want. Your call is where we work that out.
          </p>
          <div className="plan-grid">
            <div className="plan-card reveal">
              <div className="plan-name">6-Week Program</div>
              <div className="plan-sub">Focused Sprint</div>
              <ul className="plan-list">
                <li>Personalized Roadmap through the Strategy Dashboard</li>
                <li>Text support with your mentor + Loom video feedback (6 weeks)</li>
                <li>6x 1:1 coaching calls</li>
                <li>Potential to join the Angel Investment Program</li>
                <li>4x group calls per week (10 weeks)</li>
                <li>Exclusive Ecom Community and Network (10 weeks)</li>
                <li>Lifetime access to the Branded Dropshipping Course</li>
              </ul>
            </div>
            <div className="plan-card feature reveal d1">
              <span className="plan-badge">Most Complete</span>
              <div className="plan-name">10-Week Program</div>
              <div className="plan-sub">Full Build</div>
              <ul className="plan-list">
                <li>Personalized Roadmap through the Strategy Dashboard</li>
                <li>Text support with your mentor + Loom video feedback (10 weeks)</li>
                <li>10x 1:1 coaching calls</li>
                <li>Potential to join the Angel Investment Program</li>
                <li>4x group calls per week (10 weeks)</li>
                <li>Exclusive Ecom Community and Network (10 weeks)</li>
                <li>Lifetime access to the Branded Dropshipping Course</li>
              </ul>
            </div>
            <div className="plan-card reveal d2">
              <div className="plan-name">Resource Pack</div>
              <div className="plan-sub">Self-Paced + Group</div>
              <ul className="plan-list">
                <li>Personalized Roadmap through the Strategy Dashboard</li>
                <li>4x group calls per week (10 weeks)</li>
                <li>Exclusive Ecom Community and Network (10 weeks)</li>
                <li>Lifetime access to the Branded Dropshipping Course</li>
              </ul>
            </div>
          </div>
          <p className="plan-note reveal">
            <strong>Pricing is covered on your call</strong>, once we know which track actually fits your situation.
          </p>
        </div>
      </section>

      {/* ===== WHY BEGINNERS FAIL ===== */}
      <section className="alt">
        <div className="wrap">
          <span className="eyebrow reveal">The Honest Part</span>
          <h2 className="reveal">
            Why Most Beginners <span className="accent">Fail</span>
          </h2>
          <p className="lead reveal d1">
            If you have tried ecommerce before and walked away thinking you are just bad at it, read this carefully. Most
            people do not fail because ecommerce is broken. They fail because they never leave the testing loop.
          </p>
          <div className="split-cards">
            <div className="fail-card reveal">
              <h3>
                The Losing Pattern <span className="tag">Avoid</span>
              </h3>
              <ul>
                <li>Testing product after product, chasing trend-based winners that pump and die</li>
                <li>Running generic dropshipping, the middleman between a supplier and the customer, owning nothing</li>
                <li>Jumping between niches and stores, a little of everything, never enough of anything</li>
                <li>Buying course after course, watching alone, asking in a dead chat, then quitting</li>
                <li>No brand, no asset, no exit, just another product to test next week</li>
              </ul>
            </div>
            <div className="win-card reveal d1">
              <h3>
                What Real Brand Builders Do <span className="tag">Do This</span>
              </h3>
              <ul>
                <li>Pick one proven product with data, then commit and stop looking</li>
                <li>Put their logo and packaging on it from day one, so every day of work builds equity</li>
                <li>Build on proven pages and proven ad creatives instead of reinventing the wheel</li>
                <li>Get live guidance from operators, not a video library and a bot firing off links</li>
                <li>Build toward something sellable: white label to private label to exit</li>
              </ul>
            </div>
          </div>
          <div className="data-note reveal">
            <strong>The product is usually not the problem. The testing loop is.</strong> Beginners burn months and ad
            budget hunting for a winner that dies in three weeks. Our fix is the opposite: pick one product on data, put
            your brand on it, and put one hundred percent of your energy into scaling that one brand. The people who
            commit to one thing get there faster, not slower.
          </div>
        </div>
      </section>

      {/* ===== 14-DAY LAUNCH ===== */}
      <section>
        <div className="wrap">
          <span className="eyebrow reveal">Product To Live In About Two Weeks</span>
          <h2 className="reveal">
            The <span className="accent">Launch Playbook</span>
          </h2>
          <p className="lead reveal d1">
            The exact sequence EcomSimulation AI walks you through, from a product idea to a live store running ads. No
            guessing what comes next.
          </p>

          <div className="play-group reveal">Part 1 · Pick The Product</div>
          <ol className="play-list">
            {[
              ["Find a candidate product", "Pull it from the data, not a hunch."],
              ["Check the data", "Revenue, sales, and units bought last month. Is the demand real?"],
              ["Research the winner signals", "Existing content, a visual before-and-after hook, and how the top brands sell it."],
              ["Look for suppliers", "Can they brand it, ship it fast, and take a low or zero minimum order?"],
              ["Calculate the costs", "Product, shipping, fees, and what each fulfilled order actually costs you."],
              ["Check the margins", "Does the math leave room to pay for ads and still profit?"],
              ["Score the product", "Run it through the five rules. It passes all five or you move on."],
              ["Product selected", "One product, chosen on data. The testing loop is over."],
            ].map(([s, d]) => (
              <li className="reveal" key={s}>
                <span>
                  <strong>{s}</strong>
                  <span>{d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="play-group reveal">Part 2 · Build The Brand</div>
          <ol className="play-list">
            {[
              ["Find your ICP", "Who exactly buys this, and what they need to hear."],
              ["Create the brand identity", "Name, logo, packaging and voice so it reads as a real brand."],
              ["Build the store with AI", "Replicate a proven page and edit in your product and offer."],
              ["Launch ads", "First creatives live at a controlled budget, with a clear kill and scale rule."],
            ].map(([s, d]) => (
              <li className="reveal" key={s}>
                <span>
                  <strong>{s}</strong>
                  <span>{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="roadmap-note reveal">
            By roughly day 14 you have a live store, a scored product, and ads running. <strong>The 10-week roadmap below
            is where you turn that launch into consistency.</strong>
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section id="roadmap" className="alt">
        <div className="wrap">
          <span className="eyebrow reveal">Your Next 10 Weeks</span>
          <h2 className="reveal">
            The <span className="accent">Scaling Roadmap</span>
          </h2>
          <p className="lead reveal d1">
            Once the store is live, the game changes from launching to scaling. This is the path from your first sale to a
            consistent $1K day.
          </p>
          <ol className="play-list">
            {[
              ["Weeks 1–2 · Product research & validation", "Run candidates through the five rules and lock one in."],
              ["Week 3 · Store setup & branding", "AI builds the branded store; you make it yours."],
              ["Week 4 · Supplier outreach", "Lock a supplier who can brand, ship fast, and take a low minimum."],
              ["Week 5 · Content creation & ad angles", "Organic content and AI-made ads, taught by people who do it daily."],
              ["Week 6 · Pre-launch & launch", "First creatives live at a controlled budget with clear kill and scale rules."],
              ["Weeks 7–10 · Track, optimize & scale", "Cut the losers, feed the winners, and build a content system toward $1,000+ days."],
            ].map(([s, d]) => (
              <li className="reveal" key={s}>
                <span>
                  <strong>{s}</strong>
                  <span>{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="roadmap-note reveal">
            The goal of the first 10 weeks is <strong>consistency, not one huge month</strong>. A live store, a proven
            product, and a content system that keeps the ads fed. The whole roadmap is built around a $1,000 revenue day.
          </div>
        </div>
      </section>

      {/* ===== OUR GOAL ===== */}
      <section id="goal">
        <div className="wrap">
          <span className="eyebrow reveal">Our Goal</span>
          <h2 className="reveal">
            We Want To <span className="accent">Invest In Your Brand</span>
          </h2>
          <p className="lead reveal d1">
            The 10 weeks are the start, not the finish line. The whole point of the framework is to get you to a brand
            that is a real, growing asset, one we would want equity in. When a member gets there, the{" "}
            <strong style={{ color: "var(--text)" }}>Angel Investment Program</strong> is where we put our own capital and
            operators behind the brand and scale it alongside you.
          </p>

          <ol className="play-list">
            {[
              ["Get to a consistent $1K day", "First a live store and a proven product, then a content system that keeps the ads fed until $1,000 days are normal, not a spike."],
              ["Prove it is not a fluke", "Repeatable acquisition, healthy margins, and returning customers. The brand holds up when we pull the numbers apart."],
              ["Systemize it off your back", "Creative pipeline, fulfilment, and reporting running without you glued to the dashboard. A business, not a job."],
              ["Open the Angel Investment Program", "Once the brand is proven, we can back it with capital and hands-on operators. We only win if you do, so the incentives are aligned from day one."],
            ].map(([s, d]) => (
              <li className="reveal" key={s}>
                <span>
                  <strong>{s}</strong>
                  <span>{d}</span>
                </span>
              </li>
            ))}
          </ol>

          <h2 className="reveal" style={{ marginTop: 56 }}>
            Brands We&rsquo;ve Backed
          </h2>
          <p className="lead reveal d1">
            Members we took through the framework and then invested in through the Angel Investment Program.
          </p>
          {/* TODO: replace the three placeholders below with real backed brands
              (brand name, the stage we invested at, what we put in, where it is now). */}
          <div className="summary-grid">
            {[
              ["[Brand name]", "[Stage when we invested, what we put in (capital / operators / ad budget), and where the brand is now.]"],
              ["[Brand name]", "[Stage when we invested, what we put in, and where the brand is now.]"],
              ["[Brand name]", "[Stage when we invested, what we put in, and where the brand is now.]"],
            ].map(([k, v], i) => (
              <div className="sum-card reveal" key={i}>
                <span className="k">{k}</span>
                {v}
              </div>
            ))}
          </div>
          <p className="students-disclaim">
            Investment is by invitation only and is never guaranteed. It depends on the brand&rsquo;s performance, the
            category, and fit. Most members do not reach this stage.
          </p>
        </div>
      </section>

      {/* ===== PROOF ===== */}
      <section id="proof">
        <div className="wrap">
          <span className="eyebrow reveal">Receipts</span>
          <h2 className="reveal">
            Proof Of <span className="accent">Real Revenue</span>
          </h2>
          <p className="lead reveal d1">
            Straight from Shopify and the ad accounts. Real revenue, real ROAS, nothing cropped out.
          </p>
          <div className="payout-grid">
            {PROOF.map((src, i) => (
              <span className="payout-shot reveal" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Member dashboard result #${i + 1}`} loading="lazy" />
              </span>
            ))}
          </div>
          <p className="payout-disclaim">
            Revenue shown is from our own brands and from student stores and is not typical. Building an ecommerce
            business carries risk, including loss of ad spend and inventory cost. See the full disclaimer at the bottom of
            this page.
          </p>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section id="results" className="alt">
        <div className="wrap">
          <span className="eyebrow reveal">Real Results</span>
          <h2 className="reveal">
            Student <span className="accent">Wins</span>
          </h2>
          <p className="lead reveal d1">
            Different starting points, same framework. First sales, first $1K days, first profitable months. Their
            screenshots, not ours.
          </p>
          <div className="testimonials">
            {WINS.map((src, i) => (
              <div className="t-card reveal" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Student win #${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="students-disclaim">
            Results shown are not typical and are not guaranteed. Building an ecommerce business carries risk. See the
            full disclaimer at the bottom of this page.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="alt">
        <div className="wrap">
          <span className="eyebrow reveal">Before You Ask</span>
          <h2 className="reveal">
            Frequently Asked <span className="accent">Questions</span>
          </h2>
          <p className="lead reveal d1">
            The questions that come up on almost every call. Bring anything not covered here and we will go through it
            together.
          </p>
          <div className="faq-list">
            {[
              [
                "Do I need experience to start?",
                "Not at all. Some of the best students came in with no e-commerce background. The structure teaches from the ground up: picking the product with data, sourcing it, building the page with AI, making the ads, and scaling. Whether you have run stores for two years or two weeks, the system meets you where you are.",
              ],
              [
                "How much money do I need to start?",
                "You need a real budget to do this properly. The framework is built around suppliers with low or zero minimum order, so the money does not go into buying thousands of units up front. It goes into ad spend to test and then scale, plus the software and samples to launch a brand that looks legitimate. This is a business, not a side hustle you bootstrap on nothing. We go through the exact numbers for your situation on the call.",
              ],
              [
                "How much time do I need each day?",
                "Most members put in one to two intentional hours a day: going through the curriculum, working on the store or the creatives, attending calls, or reviewing their numbers. It is about quality reps, not more hours. Refreshing your Shopify dashboard all day changes nothing.",
              ],
              [
                "What if I lose money on ads?",
                "Some ad spend that does not convert is part of launching, and any program that tells you otherwise is not being honest. What you control is how much. You launch at a controlled daily budget with a clear kill rule, so a bad test is a number you chose in advance. Your product, page and creatives get reviewed before you spend.",
              ],
              [
                "What is the worst-case scenario?",
                "The worst case is the one you control. The people who have a bad experience join motivated and then go quiet: they stop the modules, stop showing up to calls, stop bringing their store for review, and never ask for help. To stop that, onboarding is deliberately simple: what to do first, what to do second, step by step, with someone checking your progress. We will not leave you stuck. What we will not do is guarantee a result if you do not put in the work.",
              ],
              [
                "What makes this different from everything else out there?",
                "The access and how current it is. You get 1:1 coaching calls, text and Loom feedback from your mentor, four group calls a week, and a personalized roadmap tracked in the Strategy Dashboard. The coaches are active operators scaling brands right now, not retired gurus teaching from memory. The strategies, platforms and tools are what is working this year.",
              ],
              [
                "How long will it take to see results?",
                "It depends almost entirely on what is in your control: how fast you get through onboarding, how much time you commit, whether you show up to calls, how fast you get the store live. People who show up and execute get results faster than people who log in once a week. We cannot promise your exact timeline because we do not control your effort or the market.",
              ],
              [
                "Can my partner join the call?",
                "Yes, and it is encouraged. This is a household decision and it helps when everyone is on the same page about the time and the money involved.",
              ],
            ].map(([q, a]) => (
              <div className="faq-item" key={q}>
                <button className="faq-q" type="button">
                  {q}
                  <span className="plus">+</span>
                </button>
                <div className="faq-a">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXECUTIVE SUMMARY ===== */}
      <section>
        <div className="wrap">
          <span className="eyebrow reveal">If You Only Read One Section</span>
          <h2 className="reveal">
            Executive <span className="accent">Summary</span>
          </h2>
          <div className="summary-grid">
            {[
              ["One Product", "Picked on numbers, data and facts, not gut feeling or trends. It passes five rules once, then you commit and never test another."],
              ["Multiple 7-Figure Brands", "What Andy built on proven products with a brand on them from day one, documented publicly to 120K+ subscribers."],
              ["Mentored, Not A Course", "1:1 coaching calls, text and Loom feedback from your mentor, four group calls a week, and lifetime access to the Branded Dropshipping Course."],
              ["Built To Be Sold", "White label to private label to exit. A real brand you own, not a store you rent from a supplier."],
              ["A Structured Path", "A launch playbook to get the store live, then a 10-week scaling roadmap from first sale to a consistent $1K day."],
              ["Accountability Built In", "Weekly number reviews, monthly audits on your site, ads and product, and direct access when you are stuck."],
            ].map(([k, v]) => (
              <div className="sum-card reveal" key={k}>
                <span className="k">{k}</span>
                {v}
              </div>
            ))}
          </div>
          <div className="data-note reveal">
            <strong>This is not about one big month.</strong> It is about building a brand that has real value, one you
            could sell. The call is where our team learns your goals and you both decide if this is the right fit.
          </div>
        </div>
      </section>

      {/* ===== NEXT / CTA ===== */}
      <section id="next" className="next-section">
        <div className="wrap">
          <span className="eyebrow reveal">What Happens Next</span>
          <h2 className="reveal">
            Prep For <span className="accent">Your Call</span>
          </h2>
          <p className="lead reveal d1" style={{ marginLeft: "auto", marginRight: "auto" }}>
            The call runs about 30 to 45 minutes. We cover where you are now, where you want to go, and whether the
            program is the right fit to get you there. Check each item off as you go.
          </p>
          <div className="check-progress" id="gp-checkProgress" />
          <div className="checklist">
            {[
              <>Read through this guide (you are doing it right now)</>,
              <>
                Look through the <a href="#results">student wins</a> and find a result that sounds like the one you want
              </>,
              <>Write down 3 questions you want answered on the call</>,
              <>Come ready to talk about your budget, your timeline, and your goals</>,
            ].map((txt, i) => (
              <div className="check-item" data-check key={i}>
                <span className="box">✓</span>
                <span className="txt">{txt}</span>
              </div>
            ))}
          </div>
          <div className="signature">See you on the call.</div>
          <div className="signature-role">Andy · Founder, EcomSimulation</div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="wrap">
          <div className="disclaimer">
            <strong>Meta Compliance &amp; Earnings Disclaimer:</strong> This website is not endorsed by, affiliated with,
            or associated with Meta Platforms, Inc. or TikTok. The figures, revenue, and student results shown in this
            guide are not typical and are not a guarantee of earnings. Results vary based on individual effort,
            experience, background, and market conditions. Building an ecommerce business involves risk, including the
            loss of ad spend and inventory cost. Past results are not indicative of future results. This guide is for
            educational purposes only and does not constitute financial, legal, or tax advice.
          </div>
          <div className="foot-links">
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
          </div>
          <div className="foot-row">© {new Date().getFullYear()} EcomSimulation. All rights reserved.</div>
        </div>
      </footer>

      <button id="gp-toTop" aria-label="Back to top">
        ↑
      </button>
    </div>
  );
}
