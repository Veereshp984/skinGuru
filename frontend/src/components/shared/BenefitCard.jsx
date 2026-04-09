export function BenefitCard({ title, text, Icon }) {
  return (
    <article className="rounded-[32px] border border-white/70 bg-white/72 p-5 shadow-soft backdrop-blur-xl">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#43c3cf] text-white shadow-halo">
        <Icon />
      </div>
      <p className="mt-5 text-2xl font-semibold text-ink">{title}</p>
      <p className="mt-3 text-sm leading-7 text-ink/58">{text}</p>
    </article>
  );
}
