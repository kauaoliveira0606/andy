"use client";

import { useRef, useState, useEffect } from "react";
import { Plus_Jakarta_Sans, Barlow, JetBrains_Mono } from "next/font/google";

const fontHead = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-head" });
const fontBody = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

/* Where the confirmation CTA sends people after they lock in. */
const PORTAL_URL = "/home";

const COMMITMENTS = [
  "I understand this program requires real effort, consistency, and time. Results are not instant and I am not expecting overnight success.",
  "I commit to following the program steps in order and not skipping ahead. The process is structured for a reason.",
  "When things get hard or confusing, I will reach out for help instead of giving up. I will not quit at the first sign of difficulty.",
  "I commit to dedicating real time each week to building and running my store. I understand that inconsistency leads to slow results.",
  "I understand that difficulty is not a valid reason for a refund. I am investing in a skill and a business, not a guaranteed outcome.",
  "I understand that building a profitable store takes time — typically weeks to months of consistent work, not days.",
  "I will show up to live coaching calls and group sessions. I understand that live access is one of the most valuable parts of this program.",
  "I will engage with the community, share my progress, and ask questions. I will not go through this alone when support is available.",
  "If I am on a payment plan, I agree to honour every payment on time. Missing payments does not pause or cancel my obligations.",
  "I take full personal responsibility for my results. My success depends on my actions, not on luck or the actions of others.",
  "I am ready to start. I am committed to seeing this through and building something I am proud of. This is my word.",
];

const TOTAL = COMMITMENTS.length;

const CSS = `
.cm-page{
  --bg:#0A0A0C; --card:#1a1a1f; --border:rgba(255,255,255,0.22);
  --text:#ffffff; --text2:#ffffff; --text3:#ffffff;
  --accent:#2A78D6; --accent-hover:#1B5FB0; --accent-bright:#8FC7FF;
  --green:#22c55e;
  font-family:var(--font-body), system-ui, sans-serif;
  background:var(--bg); color:var(--text);
  min-height:100vh;
  font-size:19px;
}
.cm-page *{box-sizing:border-box;}
.cm-page h1,.cm-page h2{font-family:var(--font-head), system-ui, sans-serif;}

.cm-header{
  background:var(--card); border-bottom:1px solid var(--border);
  padding:22px 32px; display:flex; align-items:center; gap:12px;
}
.cm-header-logo{font-size:1.2rem; font-weight:800; color:var(--text);}
.cm-header-sep{color:var(--text3); font-size:1.1rem;}
.cm-header-sub{font-size:1.1rem; font-weight:600; color:var(--text2);}

.cm-body{max-width:760px; margin:0 auto; padding:56px 24px 90px;}

.cm-eyebrow{
  font-size:.9rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
  color:var(--accent-bright); margin-bottom:12px;
}
.cm-title{font-size:2.9rem; font-weight:800; margin-bottom:16px; line-height:1.15;}
.cm-sub{font-size:1.25rem; color:var(--text2); line-height:1.6; margin-bottom:40px; font-weight:500;}

.cm-quote{
  background:var(--card); border:1px solid var(--border); border-left:5px solid var(--accent);
  border-radius:14px; padding:26px 28px; margin-bottom:36px;
  font-size:1.15rem; color:var(--text2); line-height:1.7; font-weight:500;
}
.cm-quote strong{color:var(--text); font-weight:800;}

.cm-checklist-header{display:flex; align-items:center; justify-content:space-between; margin-bottom:18px;}
.cm-checklist-title{font-size:1.35rem; font-weight:800; color:var(--text);}
.cm-counter{
  font-size:1rem; font-weight:800; background:rgba(255,255,255,0.1); color:var(--text2);
  padding:6px 16px; border-radius:20px; transition:background .2s, color .2s;
}
.cm-counter.done{background:rgba(34,197,94,0.22); color:var(--green);}

.cm-checklist{display:flex; flex-direction:column; gap:12px; margin-bottom:40px;}
.cm-check-item{
  background:var(--card); border:2px solid var(--border); border-radius:14px;
  padding:20px 22px; display:flex; gap:16px; align-items:flex-start; cursor:pointer;
  transition:border-color .15s, background .15s; user-select:none;
}
.cm-check-item:hover{border-color:var(--accent-bright);}
.cm-check-item.checked{border-color:var(--accent); background:rgba(42,120,214,0.1);}
.cm-check-box{
  width:26px; height:26px; border-radius:7px; border:2px solid rgba(255,255,255,0.4);
  display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px;
  transition:background .15s, border-color .15s;
}
.cm-check-item.checked .cm-check-box{background:var(--accent); border-color:var(--accent);}
.cm-check-text{font-size:1.1rem; color:var(--text2); line-height:1.55; font-weight:500;}
.cm-check-item.checked .cm-check-text{color:var(--text); font-weight:600;}

.cm-sig-title{font-size:1.35rem; font-weight:800; color:var(--text); margin-bottom:20px;}
.cm-form-grid{display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;}
@media (max-width:540px){.cm-form-grid{grid-template-columns:1fr;}}
.cm-form-group{display:flex; flex-direction:column; gap:8px;}
.cm-form-group.full{grid-column:1 / -1;}
.cm-label{font-size:.95rem; font-weight:700; color:var(--text2); letter-spacing:.03em; text-transform:uppercase;}
.cm-input{
  background:var(--card); border:2px solid var(--border); border-radius:10px;
  padding:14px 16px; font-size:1.1rem; font-family:var(--font-body), sans-serif;
  color:var(--text); outline:none; transition:border-color .15s; width:100%;
}
.cm-input:focus{border-color:var(--accent);}
.cm-input[readonly]{background:rgba(255,255,255,0.06); color:var(--text2); cursor:default;}
.cm-input::placeholder{color:rgba(255,255,255,0.55);}

.cm-sig-pad-wrap{
  background:var(--card); border:2px solid var(--border); border-radius:14px;
  overflow:hidden; margin-bottom:10px; position:relative;
}
.cm-sig-hint{
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  font-size:1.05rem; color:var(--text3); pointer-events:none; transition:opacity .2s;
}
.cm-sig-canvas{display:block; width:100%; height:180px; cursor:crosshair; touch-action:none;}
.cm-sig-clear{
  font-size:1rem; font-weight:700; color:var(--text3); background:none; border:none;
  cursor:pointer; padding:0; text-decoration:underline; transition:color .15s;
}
.cm-sig-clear:hover{color:var(--text);}
.cm-witnessed{font-size:1rem; color:var(--text3); margin-top:14px; font-weight:500;}

.cm-cta-btn{
  width:100%; background:var(--accent); color:#fff; border:none; border-radius:14px;
  padding:20px 24px; font-size:1.25rem; font-weight:800; font-family:var(--font-body), sans-serif;
  cursor:pointer; transition:background .15s, transform .1s; margin-bottom:14px;
}
.cm-cta-btn:hover{background:var(--accent-hover);}
.cm-cta-btn:active{transform:scale(.99);}
.cm-cta-hint{text-align:center; font-size:1rem; color:var(--text3); font-weight:500;}

.cm-confirm{text-align:center; padding:70px 24px;}
.cm-confirm-icon{
  width:76px; height:76px; border-radius:50%; background:rgba(34,197,94,0.22);
  display:flex; align-items:center; justify-content:center; margin:0 auto 24px;
}
.cm-confirm-title{font-size:2.2rem; font-weight:800; margin-bottom:14px;}
.cm-confirm-sub{font-size:1.2rem; color:var(--text2); line-height:1.65; max-width:460px; margin:0 auto; font-weight:500;}
.cm-confirm-cta{
  display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:#fff;
  font-size:1.1rem; font-weight:700; padding:16px 32px; border-radius:12px;
  text-decoration:none; margin-top:26px;
}
.cm-confirm-cta:hover{background:var(--accent-hover);}

.cm-footer{
  text-align:center; font-size:.95rem; color:var(--text3); padding:36px 24px; line-height:1.6;
  border-top:1px solid var(--border); margin-top:44px; font-weight:500;
}

.cm-error{
  background:rgba(239,68,68,0.15); border:2px solid rgba(239,68,68,0.5); border-radius:10px;
  padding:16px 18px; font-size:1.05rem; color:#fca5a5; margin-bottom:16px; font-weight:600;
}
`;

export default function CommitmentPage() {
  const [checked, setChecked] = useState<boolean[]>(Array(TOTAL).fill(false));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateSigned, setDateSigned] = useState("");
  const [hasSig, setHasSig] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const today = new Date();
    setDateSigned(today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const src = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawingRef.current = true;
    const p = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const moveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if ("touches" in e) e.preventDefault();
    const p = getPos(e, canvas);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    setHasSig(true);
  };

  const endDraw = () => {
    drawingRef.current = false;
  };

  const clearSig = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSig(false);
  };

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const checkedCount = checked.filter(Boolean).length;

  const submit = () => {
    const allChecked = checkedCount === TOTAL;
    if (!allChecked || !name.trim() || !email.trim() || !hasSig) {
      setShowError(true);
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setShowError(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`cm-page ${fontHead.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="cm-header">
        <span className="cm-header-logo">EcomSimulation</span>
        <span className="cm-header-sep">·</span>
        <span className="cm-header-sub">Commitment</span>
      </div>

      <div className="cm-body">
        {!submitted ? (
          <>
            <div className="cm-eyebrow">Before You Start</div>
            <h1 className="cm-title">The Commitment Agreement</h1>
            <p className="cm-sub">
              This program works — but only if you do. Read every item below, check the ones you agree to, sign your
              name, and lock yourself in.
            </p>

            <div className="cm-quote">
              <strong>A note from your coach:</strong>
              <br />
              <br />
              This isn&apos;t a course you buy and forget about. This is a program for people who are serious about
              building a real income online. If you&apos;re looking for a shortcut or a magic button — this isn&apos;t
              for you.
              <br />
              <br />
              If you&apos;re willing to show up, do the work, and follow the process — I&apos;ll be right there with
              you every step of the way.
            </div>

            <div className="cm-checklist-header">
              <div className="cm-checklist-title">Your Commitments</div>
              <div className={`cm-counter ${checkedCount === TOTAL ? "done" : ""}`}>
                {checkedCount} of {TOTAL} agreed
              </div>
            </div>

            <div className="cm-checklist">
              {COMMITMENTS.map((text, i) => (
                <div
                  key={i}
                  className={`cm-check-item ${checked[i] ? "checked" : ""}`}
                  onClick={() => toggle(i)}
                >
                  <div className="cm-check-box">
                    {checked[i] && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="cm-check-text">{text}</div>
                </div>
              ))}
            </div>

            <div className="cm-sig-title">Sign Your Commitment</div>
            <div className="cm-form-grid">
              <div className="cm-form-group">
                <label className="cm-label">Full Legal Name</label>
                <input
                  className="cm-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="cm-form-group">
                <label className="cm-label">Email Address</label>
                <input
                  className="cm-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="cm-form-group full">
                <label className="cm-label">Date Signed</label>
                <input className="cm-input" type="text" value={dateSigned} readOnly />
              </div>
            </div>

            <label className="cm-label" style={{ display: "block", marginBottom: 8 }}>
              Your Signature
            </label>
            <div className="cm-sig-pad-wrap">
              {!hasSig && <span className="cm-sig-hint">Sign here with your mouse or finger</span>}
              <canvas
                ref={canvasRef}
                className="cm-sig-canvas"
                onMouseDown={startDraw}
                onMouseMove={moveDraw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={moveDraw}
                onTouchEnd={endDraw}
              />
            </div>
            <button className="cm-sig-clear" onClick={clearSig}>
              Clear Signature
            </button>
            <div className="cm-witnessed">Witnessed by: EcomSimulation</div>

            {showError && (
              <div className="cm-error" ref={errorRef} style={{ marginTop: 32 }}>
                Please check all commitments, fill in your name and email, and add your signature before locking in.
              </div>
            )}

            <button className="cm-cta-btn" style={{ marginTop: 32 }} onClick={submit}>
              I&apos;m ready. Lock me in →
            </button>
            <div className="cm-cta-hint">By clicking above you agree to all {TOTAL} commitments listed.</div>
          </>
        ) : (
          <div className="cm-confirm">
            <div className="cm-confirm-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="cm-confirm-title">You&apos;re Locked In.</h2>
            <p className="cm-confirm-sub">
              Your commitment has been recorded. Head back to the course portal and start building — you&apos;ve
              already taken the most important step.
            </p>
            <a className="cm-confirm-cta" href={PORTAL_URL}>
              Go to Course Portal →
            </a>
          </div>
        )}
      </div>

      <div className="cm-footer">
        © EcomSimulation. Results are not typical and are not guaranteed. Individual results will vary based on
        effort, experience, and market conditions.
      </div>
    </div>
  );
}
