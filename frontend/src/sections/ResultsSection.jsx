import { ResultRow } from "../components/results/ResultRow";
import { formatProbability } from "../lib/format";

export function ResultsSection({
  sectionRef,
  prediction,
  topPrediction,
  previewUrl,
  isPredicting,
  isDownloadingReport,
  onDownloadReport,
  onOpenFilePicker,
}) {
  return (
    <section
      id="results"
      ref={sectionRef}
      className="scroll-mt-28 rounded-[40px] border border-white/70 bg-white/60 p-6 shadow-soft backdrop-blur-2xl sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sage">Result</p>
          <h2 className="mt-3 font-display text-4xl leading-none">Your assessment output</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {topPrediction ? (
            <>
              <div className="rounded-full bg-[#eef3ea] px-4 py-2 text-sm font-semibold text-sage">
                Confidence {formatProbability(topPrediction.probability)}
              </div>
              <button
                type="button"
                onClick={onDownloadReport}
                disabled={isDownloadingReport}
                className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-progress disabled:opacity-60"
              >
                {isDownloadingReport ? "Preparing PDF..." : "Download detailed PDF"}
              </button>
            </>
          ) : (
            <div className="rounded-full bg-white/80 px-4 py-2 text-sm text-ink/56">
              No result yet
            </div>
          )}
        </div>
      </div>

      {prediction ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-[32px] bg-[linear-gradient(145deg,#223029_0%,#314238_100%)] p-5 text-white shadow-device">
            <p className="text-xs uppercase tracking-[0.24em] text-white/52">Most likely match</p>
            {previewUrl ? (
              <div className="mt-5 overflow-hidden rounded-[24px]">
                <img src={previewUrl} alt="Lesion preview" className="h-56 w-full object-cover" />
              </div>
            ) : null}
            <h3 className="mt-5 font-display text-5xl leading-none">{topPrediction.name}</h3>
            <p className="mt-4 inline-flex rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/70">
              {topPrediction.code}
            </p>
            <p className="mt-5 text-sm leading-7 text-white/78">{topPrediction.description}</p>
            <button
              type="button"
              onClick={onDownloadReport}
              disabled={isDownloadingReport}
              className="mt-6 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-forest transition hover:-translate-y-0.5 disabled:cursor-progress disabled:opacity-60"
            >
              {isDownloadingReport ? "Preparing report..." : "Download detailed PDF report"}
            </button>
          </article>

          <div className="grid gap-3">
            {prediction.predictions.map((entry, index) => (
              <ResultRow key={entry.code} entry={entry} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[28px] border border-dashed border-line bg-white/58 px-6 py-14 text-center">
          <p className="text-lg font-semibold text-ink">
            {isPredicting ? "Your image is being analyzed." : "No analysis yet"}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/56">
            Upload an image in the section above and press `Get result` to see the top prediction
            and the ranked probability list here.
          </p>
          <button
            type="button"
            onClick={onOpenFilePicker}
            className="mt-6 rounded-full bg-lime px-6 py-4 text-sm font-semibold text-forest transition hover:-translate-y-0.5"
          >
            Upload image
          </button>
        </div>
      )}
    </section>
  );
}
