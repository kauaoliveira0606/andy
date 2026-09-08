import type { Metadata } from "next";

/* ---------------------------------------------------------------------- */
/* Theme                                                                   */
/* ---------------------------------------------------------------------- */

const BG = "#F3EFE1";
const PANEL = "#FFFFFF";
const BORDER = "#E3DAC0";
const INK = "#000000";
const MUTED = "#262319";
const ACCENT = "#2a78d6"; // blue (replaces the source page's orange)

/* Placeholder — wire this up to the real booking/application URL later. */
const BOOK_CALL_URL = "#book";

export const metadata: Metadata = {
  title: "EcomSimulation — Apply",
  description: "[Placeholder meta description for the EcomSimulation landing page.]",
};

/* ---------------------------------------------------------------------- */
/* Content (placeholder copy — replace before launch)                     */
/* ---------------------------------------------------------------------- */

const FEATURED_IN = ["[Logo One]", "[Logo Two]", "[Logo Three]", "[Logo Four]", "[Logo Five]", "[Logo Six]"];

const TESTIMONIALS = [
  { name: "[Member Name]", quote: "[Short verbatim quote about the result they got.]" },
  { name: "[Member Name]", quote: "[Short verbatim quote about the result they got.]" },
  { name: "[Member Name]", quote: "[Short verbatim quote about the result they got.]" },
  { name: "[Member Name]", quote: "[Short verbatim quote about the result they got.]" },
  { name: "[Member Name]", quote: "[Short verbatim quote about the result they got.]" },
  { name: "[Member Name]", quote: "[Short verbatim quote about the result they got.]" },
];

const TEAM = [
  { name: "[Team Member]", title: "[Founder / CEO]", bio: "[One line on what they do and why they're credible.]" },
  { name: "[Team Member]", title: "[Head of Coaching]", bio: "[One line on what they do and why they're credible.]" },
  { name: "[Team Member]", title: "[Lead Strategist]", bio: "[One line on what they do and why they're credible.]" },
  { name: "[Team Member]", title: "[Success Coach]", bio: "[One line on what they do and why they're credible.]" },
  { name: "[Team Member]", title: "[Success Coach]", bio: "[One line on what they do and why they're credible.]" },
  { name: "[Team Member]", title: "[Onboarding]", bio: "[One line on what they do and why they're credible.]" },
];

/* ---------------------------------------------------------------------- */
/* Building blocks                                                         */
/* ---------------------------------------------------------------------- */

function CtaButton({ children, href = BOOK_CALL_URL }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-extrabold transition-opacity hover:opacity-90"
      style={{ background: ACCENT, color: "#ffffff" }}
    >
      {children}
      <span aria-hidden>&rarr;</span>
    </a>
  );
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: INK }}>
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-2 max-w-2xl text-sm" style={{ color: MUTED }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed" style={{ color: MUTED, opacity: 0.75 }}>
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                     */
/* ---------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <div style={{ background: BG, color: INK }}>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <header className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            EcomSimulation — [Program / Tier Name]
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl" style={{ color: INK }}>
            [Big outcome headline — who this is for and the result they get]
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg" style={{ color: MUTED }}>
            [Subheadline expanding on the mechanism — how members achieve the outcome above, in one sentence.]
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaButton>Book a call</CtaButton>
            <p className="text-xs" style={{ color: MUTED }}>
              [A 30-minute call with a senior member of our team]
            </p>
          </div>

          {/* VSL / video area */}
          <div
            className="mx-auto mt-12 flex aspect-video w-full max-w-3xl items-center justify-center rounded-xl"
            style={{ background: PANEL, border: `1px solid ${BORDER}` }}
          >
            <span className="text-sm font-bold" style={{ color: MUTED }}>
              [ VSL video embed goes here ]
            </span>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Social proof — featured in                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-12" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUTED }}>
          As featured in · Trusted by the industry
        </p>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {FEATURED_IN.map((logo, i) => (
            <span key={i} className="text-sm font-bold" style={{ color: MUTED, opacity: 0.7 }}>
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="What Members Say"
            sub="Verified, public reviews · not testimonials we curated for a landing page"
          />

          <div className="mx-auto mb-8 w-fit rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: PANEL, border: `1px solid ${BORDER}`, color: MUTED }}>
            ★★★★★ Excellent · Verified reviews
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="rounded-lg p-5" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
                <div className="text-sm" style={{ color: ACCENT }}>
                  ★★★★★
                </div>
                <blockquote className="mt-2 text-sm leading-relaxed" style={{ color: INK }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold" style={{ color: MUTED }}>
                  {t.name}
                </figcaption>
                <p className="mt-2 text-[10px]" style={{ color: MUTED, opacity: 0.7 }}>
                  Individual experience. Not typical results. Past performance is not indicative.
                </p>
              </figure>
            ))}
          </div>

          <Disclaimer>
            Individual experiences. Not typical results. The members featured above describe their own experiences.
            Individual results vary significantly and depend on personal circumstances, market conditions, and individual
            decisions. [Add offer-specific risk language here before launch.]
          </Disclaimer>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Meet the team                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            title="Meet the Team"
            sub="The coaches, strategists and operators on the line with you when you join"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <div key={i} className="rounded-lg p-5" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
                <div className="h-14 w-14 rounded-full" style={{ background: BG, border: `1px solid ${BORDER}` }} />
                <p className="mt-3 text-sm font-extrabold" style={{ color: INK }}>
                  {m.name}
                </p>
                <p className="text-xs font-bold" style={{ color: ACCENT }}>
                  {m.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: MUTED }}>
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Next step CTA                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            Next Step
          </p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl" style={{ color: INK }}>
            Book your call
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: MUTED }}>
            [By application only. Cohorts are capped. We typically respond within one business day.]
          </p>
          <div className="mt-6">
            <CtaButton>Book a call</CtaButton>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-16" style={{ background: INK }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm leading-relaxed" style={{ color: "#ffffff", opacity: 0.85 }}>
            [One-paragraph summary of what EcomSimulation is: who it&rsquo;s for, what members get — training, frameworks,
            and direct access to the team.]
          </p>
          <div className="mt-6">
            <CtaButton>Book a call</CtaButton>
          </div>
          <p className="mt-4 text-[11px]" style={{ color: "#ffffff", opacity: 0.55 }}>
            [Application-based · Cohorts capped · Add any audit/verification line here]
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                           */}
      {/* ---------------------------------------------------------------- */}
      <footer className="px-6 py-10" style={{ background: INK }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-[11px] leading-relaxed" style={{ color: "#ffffff", opacity: 0.5 }}>
            [EcomSimulation provides general information and educational content only. We do not provide personal
            financial, tax, or legal advice. Past performance is not indicative of future returns. Results vary. Consult a
            licensed adviser before acting on any information. Replace this entire block with your reviewed legal
            disclaimer before launch.]
          </p>
          <p className="mt-4 text-center text-[11px]" style={{ color: "#ffffff", opacity: 0.4 }}>
            © {new Date().getFullYear()} EcomSimulation · [company / domain]
          </p>
        </div>
      </footer>
    </div>
  );
}
