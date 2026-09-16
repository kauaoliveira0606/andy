import { Plus_Jakarta_Sans, Barlow } from "next/font/google";

const fontHead = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-head" });
const fontBody = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

const CALL_URL = "https://calendly.com/admin-andystauring/1-on-1-onboarding-with-andy-ecom-simulation";
const FORM_URL = "https://form.typeform.com/to/eLLp15s9";
const COMMITMENT_URL = "/commitment";
const SKOOL_URL = "https://www.skool.com/dropship";

const CSS = `
.ob-page{
  --bg:#0A0A0C; --card:#0d1520; --card2:#122036; --border:rgba(143,199,255,0.22);
  --text:#ffffff; --text2:rgba(255,255,255,0.82); --text3:rgba(255,255,255,0.62);
  --accent:#2A78D6; --accent-bright:#8FC7FF; --accent-deep:#1B5FB0;
  font-family:var(--font-body), system-ui, sans-serif;
  background:var(--bg); color:var(--text);
  min-height:100vh; overflow-x:hidden; position:relative;
}
.ob-page *{box-sizing:border-box;}
.ob-page h1,.ob-page h2,.ob-page h3{font-family:var(--font-head), system-ui, sans-serif;}

.ob-bg{position:fixed; inset:0; background:linear-gradient(160deg,#000 0%,#040d18 45%,#000 100%); z-index:0; overflow:hidden; pointer-events:none;}
.ob-ray{position:absolute; width:1.5px; border-radius:9999px; transform-origin:top center; animation:ob-ray-pulse ease-in-out infinite alternate;}
@keyframes ob-ray-pulse{0%{opacity:.06;}100%{opacity:.2;}}
.ob-ray:nth-child(1){height:100vh; left:26%; top:0; background:linear-gradient(to bottom, rgba(42,120,214,0), rgba(42,120,214,.6) 40%, rgba(143,199,255,.9) 70%, rgba(42,120,214,0)); transform:rotate(8deg); animation-duration:6s;}
.ob-ray:nth-child(2){height:85vh; left:31%; top:5%; background:linear-gradient(to bottom, rgba(42,120,214,0), rgba(42,120,214,.4) 50%, rgba(42,120,214,0)); transform:rotate(8.5deg); animation-duration:8s; animation-delay:1s;}
.ob-ray:nth-child(3){height:90vh; left:66%; top:10%; background:linear-gradient(to bottom, rgba(42,120,214,0), rgba(80,150,240,.55) 45%, rgba(143,199,255,.8) 65%, rgba(42,120,214,0)); transform:rotate(11deg); animation-duration:7s; animation-delay:2s;}
.ob-meteor{position:absolute; top:-120px; width:1.5px; border-radius:9999px; background:linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,.9) 50%, rgba(255,255,255,0)); animation:ob-meteor-fall linear infinite;}
@keyframes ob-meteor-fall{0%{transform:translateY(0) translateX(0) rotate(15deg); opacity:0;}5%{opacity:1;}95%{opacity:.5;}100%{transform:translateY(110vh) translateX(90px) rotate(15deg); opacity:0;}}
.ob-meteor:nth-child(4){left:4%; height:70px; animation-duration:4.2s;}
.ob-meteor:nth-child(5){left:14%; height:55px; animation-duration:5.8s; animation-delay:1.4s;}
.ob-meteor:nth-child(6){left:24%; height:85px; animation-duration:3.9s; animation-delay:2.8s;}
.ob-meteor:nth-child(7){left:40%; height:60px; animation-duration:5.1s; animation-delay:.7s;}
.ob-meteor:nth-child(8){left:52%; height:90px; animation-duration:4.6s; animation-delay:3.3s;}
.ob-meteor:nth-child(9){left:64%; height:65px; animation-duration:6.2s; animation-delay:1.1s;}
.ob-meteor:nth-child(10){left:76%; height:75px; animation-duration:4.4s; animation-delay:2s;}
.ob-meteor:nth-child(11){left:85%; height:50px; animation-duration:5.5s; animation-delay:.4s;}
.ob-meteor:nth-child(12){left:93%; height:80px; animation-duration:3.7s; animation-delay:1.8s;}

.ob-content{position:relative; z-index:1;}

.ob-hero{text-align:center; padding:64px 24px 56px; max-width:860px; margin:0 auto;}
.ob-eyebrow{
  display:inline-block; font-size:.85rem; font-weight:800; letter-spacing:.18em; text-transform:uppercase;
  color:var(--accent-bright); margin-bottom:22px; padding:8px 20px; border:1px solid rgba(143,199,255,.35);
  border-radius:999px; background:rgba(143,199,255,.08);
}
.ob-hero h1{
  font-size:clamp(2.4rem,6vw,4.2rem); font-weight:900; line-height:1.12; letter-spacing:-.02em;
  background:linear-gradient(180deg,#ffffff 0%,#e0e8f0 30%,#ffffff 60%,#c0cfe0 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  margin-bottom:28px;
}
.ob-hero-divider{width:64px; height:3px; background:linear-gradient(to right, var(--accent-deep), var(--accent-bright)); border-radius:999px; margin:0 auto 28px;}
.ob-hero p{font-size:clamp(1.05rem,2.2vw,1.3rem); color:var(--text2); line-height:1.8; max-width:640px; margin:0 auto; font-weight:500;}

.ob-divider{width:100%; height:1px; background:linear-gradient(to right, transparent, rgba(143,199,255,.3), transparent); margin-bottom:72px;}

.ob-section{max-width:900px; margin:0 auto; padding:0 24px 72px;}
.ob-section-eyebrow{font-size:.85rem; font-weight:800; letter-spacing:.16em; color:var(--accent-bright); text-transform:uppercase; margin-bottom:12px; text-align:center;}
.ob-section-title{font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; color:var(--text); text-align:center; margin-bottom:12px;}
.ob-section-sub{font-size:clamp(1rem,1.8vw,1.15rem); color:var(--text2); text-align:center; line-height:1.7; max-width:600px; margin:0 auto 48px; font-weight:500;}

.ob-call-card{
  background:linear-gradient(135deg, var(--card), var(--card2)); border:1px solid var(--border);
  border-radius:22px; padding:40px 36px; display:flex; align-items:center; gap:24px; flex-wrap:wrap;
}
.ob-call-badge{
  background:linear-gradient(135deg, var(--accent-deep), var(--accent-bright)); border-radius:50%;
  width:72px; height:72px; display:flex; align-items:center; justify-content:center; font-size:2rem;
  flex-shrink:0; box-shadow:0 0 32px rgba(143,199,255,.35);
}
.ob-call-text{flex:1; min-width:220px;}
.ob-call-text h3{font-size:1.3rem; font-weight:900; color:var(--text); margin-bottom:8px;}
.ob-call-text p{font-size:1.05rem; color:var(--text2); line-height:1.6; font-weight:500;}

.ob-steps{display:flex; flex-direction:column; gap:22px;}
.ob-step-card{
  display:flex; gap:26px; align-items:flex-start; background:linear-gradient(135deg, var(--card), var(--card2));
  border:1px solid var(--border); border-radius:20px; padding:36px; transition:border-color .25s;
}
.ob-step-card:hover{border-color:rgba(143,199,255,.5);}
.ob-step-num{
  flex-shrink:0; width:48px; height:48px; border-radius:50%;
  background:linear-gradient(135deg, var(--accent-deep), var(--accent-bright));
  display:flex; align-items:center; justify-content:center; font-size:1.15rem; font-weight:900;
  color:#fff; box-shadow:0 0 22px rgba(143,199,255,.35); margin-top:2px;
}
.ob-step-body{flex:1;}
.ob-step-label{font-size:.78rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:var(--accent-bright); margin-bottom:8px;}
.ob-step-title{font-size:clamp(1.2rem,2.5vw,1.5rem); font-weight:900; color:var(--text); margin-bottom:14px; line-height:1.3;}
.ob-step-desc{font-size:1.05rem; color:var(--text2); line-height:1.75; margin-bottom:26px; font-weight:500;}
.ob-step-desc strong{color:var(--text); font-weight:800;}

.ob-btn{
  display:inline-flex; align-items:center; gap:10px; background:linear-gradient(135deg, var(--accent-deep), var(--accent-bright));
  color:#fff; font-family:var(--font-body), sans-serif; font-size:1rem; font-weight:800; padding:16px 32px;
  border-radius:999px; text-decoration:none; letter-spacing:.03em; box-shadow:0 0 30px rgba(143,199,255,.32);
  transition:opacity .2s, transform .2s; border:none; cursor:pointer;
}
.ob-btn:hover{opacity:.88; transform:translateY(-1px);}
.ob-btn-icon{font-size:1.2rem;}

.ob-footer{background:#000; border-top:1px solid rgba(255,255,255,.08); padding:36px 20px; text-align:center; position:relative; z-index:1;}
.ob-footer-links{display:flex; justify-content:center; gap:26px; flex-wrap:wrap; margin-bottom:18px;}
.ob-footer-links a{color:var(--text3); text-decoration:none; font-size:.85rem; letter-spacing:.08em; text-transform:uppercase; transition:color .2s; font-weight:600;}
.ob-footer-links a:hover{color:#fff;}
.ob-footer-disc{font-size:.85rem; color:rgba(255,255,255,.4); max-width:680px; margin:0 auto; line-height:1.65; font-weight:500;}

@media (max-width:560px){
  .ob-step-card{flex-direction:column; gap:18px; padding:26px 22px;}
  .ob-call-card{flex-direction:column; align-items:flex-start; padding:30px 26px;}
}
`;

export default function OnboardingPage() {
  return (
    <div className={`ob-page ${fontHead.variable} ${fontBody.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="ob-bg">
        <div className="ob-ray"></div>
        <div className="ob-ray"></div>
        <div className="ob-ray"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
        <div className="ob-meteor"></div>
      </div>

      <div className="ob-content">
        <section className="ob-hero">
          <span className="ob-eyebrow">You&apos;re In</span>
          <h1>Welcome to EcomSimulation</h1>
          <div className="ob-hero-divider"></div>
          <p>Thank you for trusting us. We will put everything we have into making sure you get results.</p>
        </section>

        <div className="ob-divider"></div>

        <section className="ob-section">
          <p className="ob-section-eyebrow">First step</p>
          <h2 className="ob-section-title">Schedule Your Onboarding Call</h2>
          <p className="ob-section-sub">
            Your first call is your onboarding call. This is where we map out your brand, your goals, and exactly
            how we&apos;re going to attack this together from day one.
          </p>

          <div className="ob-call-card">
            <div className="ob-call-badge">📞</div>
            <div className="ob-call-text">
              <h3>Book Your Onboarding Call with Andy</h3>
              <p>See exactly where you are and what steps you need to take to find success.</p>
            </div>
            <a className="ob-btn" href={CALL_URL} target="_blank" rel="noopener noreferrer">
              <span className="ob-btn-icon">📅</span> Schedule Your Call
            </a>
          </div>
        </section>

        <div className="ob-divider"></div>

        <section className="ob-section">
          <p className="ob-section-eyebrow">Your next steps</p>
          <h2 className="ob-section-title">Here&apos;s how to get started</h2>
          <p className="ob-section-sub">Follow these steps in order. Each one builds on the last — don&apos;t skip ahead.</p>

          <div className="ob-steps">
            <div className="ob-step-card">
              <div className="ob-step-num">1</div>
              <div className="ob-step-body">
                <p className="ob-step-label">Required</p>
                <h3 className="ob-step-title">Fill Out Your Onboarding Form</h3>
                <p className="ob-step-desc">
                  This is so we can have a better understanding of you and best serve you. <strong>Fill it out before your call</strong> so we have everything we need to know about your background, your goals, and where you&apos;re starting from.
                </p>
                <a className="ob-btn" href={FORM_URL} target="_blank" rel="noopener noreferrer">
                  <span className="ob-btn-icon">📋</span> Fill Out Onboarding Form
                </a>
              </div>
            </div>

            <div className="ob-step-card">
              <div className="ob-step-num">2</div>
              <div className="ob-step-body">
                <p className="ob-step-label">Before you start</p>
                <h3 className="ob-step-title">Sign Your Commitment</h3>
                <p className="ob-step-desc">
                  Sign the commitment form so you know what your expectations are for building a successful brand and being able to achieve your goals. <strong>This is your word — take it seriously.</strong>
                </p>
                <a className="ob-btn" href={COMMITMENT_URL} target="_blank" rel="noopener noreferrer">
                  <span className="ob-btn-icon">✍️</span> Sign the Commitment Form
                </a>
              </div>
            </div>

            <div className="ob-step-card">
              <div className="ob-step-num">3</div>
              <div className="ob-step-body">
                <p className="ob-step-label">Where the community lives</p>
                <h3 className="ob-step-title">Join the Skool Community</h3>
                <p className="ob-step-desc">
                  Join the Skool and introduce yourself — where you&apos;re from, what your goals are, and why you&apos;re committed to success right now. <strong>You can&apos;t get started with any material until you&apos;ve done that.</strong>
                </p>
                <a className="ob-btn" href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
                  <span className="ob-btn-icon">👋</span> Join the Skool
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="ob-footer">
        <div className="ob-footer-links">
          <a href="/home">Home</a>
          <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a>
          <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <div className="ob-footer-disc">© {new Date().getFullYear()} EcomSimulation. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
