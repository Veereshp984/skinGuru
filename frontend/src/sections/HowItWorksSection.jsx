import { TipCard } from "../components/shared/TipCard";

export function HowItWorksSection({ steps }) {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 rounded-[40px] border border-white/70 bg-white/52 p-6 shadow-soft backdrop-blur-2xl sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sage">How it works</p>
          <h2 className="mt-3 font-display text-4xl leading-none">Three simple steps.</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-ink/58">
          The flow is intentionally simple: choose a photo, run the AI scan, then review the
          returned result and probability ranking.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <TipCard key={step.step} step={step.step} title={step.title} text={step.text} />
        ))}
      </div>
    </section>
  );
}
