import { ArrowMark } from "../components/icons/AppIcons";
import { MarkerDot } from "../components/shared/MarkerDot";

export function WhyItMattersSection({ points }) {
  return (
    <section
      id="why-it-matters"
      className="scroll-mt-28 rounded-[40px] border border-white/70 bg-white/56 p-6 shadow-soft backdrop-blur-2xl sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="rounded-[36px] bg-[linear-gradient(180deg,#f8faf5_0%,#edf3eb_100%)] p-6 shadow-halo">
          <div className="relative mx-auto flex h-[380px] max-w-[320px] items-center justify-center">
            <div className="absolute inset-x-10 top-6 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0.28))] blur-xl" />
            <div className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f6d3c8] shadow-[0_10px_30px_rgba(218,164,146,0.25)]" />
            <div className="absolute left-1/2 top-[94px] h-40 w-32 -translate-x-1/2 rounded-[44px] bg-[linear-gradient(180deg,#f9ddd1_0%,#f8cfc1_100%)] shadow-[0_18px_36px_rgba(218,164,146,0.18)]" />
            <div className="absolute left-[22%] top-[122px] h-32 w-8 rounded-full bg-[linear-gradient(180deg,#f8ddd0_0%,#f3cabc_100%)]" />
            <div className="absolute right-[22%] top-[122px] h-32 w-8 rounded-full bg-[linear-gradient(180deg,#f8ddd0_0%,#f3cabc_100%)]" />
            <div className="absolute left-[38%] top-[226px] h-28 w-8 rounded-full bg-[linear-gradient(180deg,#f6d9cc_0%,#efc0b1_100%)]" />
            <div className="absolute right-[38%] top-[226px] h-28 w-8 rounded-full bg-[linear-gradient(180deg,#f6d9cc_0%,#efc0b1_100%)]" />

            <MarkerDot className="left-[48%] top-[118px]" label="1" />
            <MarkerDot className="left-[26%] top-[212px]" label="2" />
            <MarkerDot className="right-[22%] top-[248px]" label="3" />

            <div className="absolute right-0 top-[138px] w-44 rounded-[22px] border border-white/80 bg-white/90 p-4 shadow-soft backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-sage">Your scan</p>
              <p className="mt-2 text-sm font-semibold text-ink">Review suspicious spots earlier</p>
              <p className="mt-2 text-xs leading-5 text-ink/52">
                Upload a focused lesion photo and inspect the ranked result.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sage">Why it matters</p>
          <h2 className="mt-3 max-w-[14ch] font-display text-4xl leading-none sm:text-5xl">
            Early skin review can make follow-up decisions clearer.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/66">
            A guided image check can help surface concerning lesions sooner, make it easier to
            compare changes over time, and support a more informed next conversation with a
            dermatologist.
          </p>

          <div className="mt-6 space-y-3">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef6e4] text-lime">
                  <ArrowMark />
                </span>
                <p className="text-base leading-8 text-ink/68">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
