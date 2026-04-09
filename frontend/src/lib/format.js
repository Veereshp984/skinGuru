export function formatProbability(value) {
  return `${(value * 100).toFixed(2)}%`;
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatReportDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

export function buildReportFileName(name) {
  const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${safeName || "skin-scan"}-report.pdf`;
}

export function getReportRecommendation(entry) {
  if (entry.code === "mel") {
    return "This top result points to melanoma. Consider prompt dermatologist follow-up, especially if the lesion is changing, asymmetrical, irregular, or newly appearing.";
  }

  if (["bcc", "akiec"].includes(entry.code)) {
    return "This result suggests a lesion type that is worth professional review. Consider booking a dermatologist appointment and comparing the area with past photos if available.";
  }

  return "Use this result as one screening signal. If the lesion is changing, bleeding, painful, or unusual for you, consider follow-up with a dermatologist.";
}
