function ScanCorner({ className }) {
  return (
    <div
      className={`pointer-events-none absolute h-11 w-11 border-l-[5px] border-t-[5px] border-white/80 ${className}`}
    />
  );
}

export function ScannerUploadCard({
  modelName,
  previewUrl,
  imageFile,
  isDragging,
  isPredicting,
  onOpenFilePicker,
  onUploadKeyDown,
  onDragOver,
  onDragLeave,
  onDrop,
  onPredict,
}) {
  return (
    <article className="flex min-h-[500px] flex-col overflow-hidden rounded-[44px] border border-white/80 bg-[#fbfcf7]/92 p-5 shadow-device backdrop-blur-xl xl:h-full xl:min-h-[calc(100vh-8.75rem)]">
      <div className="flex items-center justify-between text-[11px] font-semibold">
        <span>9:41</span>
        <div className="h-5 w-14 rounded-full bg-stone-200/85" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sage">Image scanner</p>
          <p className="mt-2 text-xl font-semibold text-ink sm:text-2xl">Drop, preview, analyze</p>
        </div>
        <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage shadow-halo">
          {modelName}
        </span>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onOpenFilePicker}
        onKeyDown={onUploadKeyDown}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`mt-5 flex flex-1 flex-col rounded-[36px] bg-[linear-gradient(180deg,#f8faf5_0%,#e7efe5_100%)] p-4 transition ${
          isDragging ? "ring-2 ring-lime/70 ring-offset-4 ring-offset-foam" : ""
        }`}
      >
        <div className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_35%,rgba(134,214,29,0.28),transparent_32%),linear-gradient(180deg,#f7f8f4_0%,#ebefe6_100%)] shadow-halo sm:min-h-[340px] xl:min-h-0">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected lesion"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="px-8 text-center">
              <div className="mx-auto flex h-28 w-24 items-center justify-center rounded-[28px] bg-[linear-gradient(180deg,#9cd365_0%,#7abd47_48%,#f8faf5_48%,#f8faf5_100%)] shadow-[0_24px_40px_rgba(92,130,78,0.22)]">
                <div className="h-16 w-12 rounded-[18px] bg-white/16" />
              </div>
              <p className="mt-5 text-sm leading-6 text-ink/62">
                Drag an image here or tap to browse from your device.
              </p>
            </div>
          )}

          <div className="pointer-events-none absolute inset-6 rounded-[28px] border border-white/80" />
          <ScanCorner className="left-7 top-7" />
          <ScanCorner className="right-7 top-7 rotate-90" />
          <ScanCorner className="bottom-7 left-7 -rotate-90" />
          <ScanCorner className="bottom-7 right-7 rotate-180" />
          <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_26px_rgba(255,255,255,0.95)] animate-scan" />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={onPredict}
          disabled={isPredicting}
          className="inline-flex min-h-14 w-full max-w-[320px] items-center justify-center rounded-full bg-lime px-8 py-4 text-base font-semibold text-forest shadow-[0_18px_40px_rgba(134,214,29,0.28)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime/30 disabled:cursor-progress disabled:opacity-60"
        >
          {isPredicting ? "Analyzing..." : "Get result"}
        </button>

        <div className="w-full rounded-[24px] border border-white/70 bg-white/74 px-4 py-4">
          <p className="text-sm font-semibold text-ink">
            {imageFile ? imageFile.name : "Waiting for upload"}
          </p>
          <p className="mt-1 text-sm leading-6 text-ink/56">
            {imageFile
              ? "Your image is loaded and ready for analysis."
              : "Once an image is uploaded, you can run the scan."}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-sage">
            {imageFile ? "Tap the button to analyze" : "Upload to unlock analysis"}
          </p>
        </div>
      </div>
    </article>
  );
}
