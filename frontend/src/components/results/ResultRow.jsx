import { formatProbability } from "../../lib/format";

export function ResultRow({ entry, index }) {
  return (
    <article className="rounded-[26px] border border-line bg-white/78 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3ea] text-sm font-semibold text-sage">
              0{index + 1}
            </span>
            <div>
              <p className="text-base font-semibold text-ink">{entry.name}</p>
              <p className="mt-1 text-sm leading-6 text-ink/58">
                {entry.code.toUpperCase()} - {entry.description}
              </p>
            </div>
          </div>
        </div>
        <strong className="text-base text-ink">{formatProbability(entry.probability)}</strong>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e6ece3]">
        <div
          className={`h-full rounded-full ${
            index === 0 ? "bg-lime" : index === 1 ? "bg-sage" : index === 2 ? "bg-blush" : "bg-stone-300"
          }`}
          style={{ width: `${Math.max(entry.probability * 100, 4)}%` }}
        />
      </div>
    </article>
  );
}
