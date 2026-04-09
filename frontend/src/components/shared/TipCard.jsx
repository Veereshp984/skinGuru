export function TipCard({ step, title, text }) {
  return (
    <article className="rounded-[30px] border border-white/70 bg-white/62 p-5 shadow-soft backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.24em] text-sage">{step}</p>
      <p className="mt-4 text-lg font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-7 text-ink/58">{text}</p>
    </article>
  );
}
