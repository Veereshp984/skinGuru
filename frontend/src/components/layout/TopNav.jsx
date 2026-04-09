import { BrandMark } from "../icons/AppIcons";
import { SITE_NAME } from "../../constants/content";

export function TopNav({ navItems, imageFile, fileSizeLabel, onOpenFilePicker }) {
  return (
    <div className="sticky top-4 z-30 animate-rise pb-4 lg:pb-6">
      <nav className="flex items-center justify-between gap-3 rounded-full border border-white/75 bg-white/72 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-5">
        <a href="#upload" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-forest shadow-halo">
            <BrandMark />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] uppercase tracking-[0.3em] text-sage">
              {SITE_NAME}
            </p>
            <p className="truncate text-sm font-medium text-ink/72">
              AI skin screening flow
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/68 transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {imageFile ? (
            <span className="hidden rounded-full bg-[#eef3ea] px-4 py-2 text-sm text-sage sm:inline-flex">
              {fileSizeLabel}
            </span>
          ) : null}
          <button
            type="button"
            onClick={onOpenFilePicker}
            className="rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Upload image
          </button>
        </div>
      </nav>
    </div>
  );
}
