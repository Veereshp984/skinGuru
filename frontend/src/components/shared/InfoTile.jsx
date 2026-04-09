export function InfoTile({ title, text }) {
  return (
    <article className="rounded-[28px] border border-white/70 bg-white/76 p-4 shadow-halo">
      <p className="text-xs uppercase tracking-[0.24em] text-sage">{title}</p>
      <p className="mt-3 text-sm leading-6 text-ink/62">{text}</p>
    </article>
  );
}
