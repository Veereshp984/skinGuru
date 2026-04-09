export function MarkerDot({ className, label }) {
  return (
    <div
      className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-blush shadow-soft ${className}`}
    >
      {label}
    </div>
  );
}
