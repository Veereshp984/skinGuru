import {
  buildReportFileName,
  formatProbability,
  formatReportDate,
  getReportRecommendation,
} from "./format";

export async function generateAnalysisReport({ prediction, imageFile, modelName }) {
  const { jsPDF } = await import("jspdf");
  const topPrediction = prediction.top_prediction;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 42;
  let cursorY = 42;

  doc.setFillColor(34, 48, 41);
  doc.roundedRect(margin, cursorY, pageWidth - margin * 2, 104, 22, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("AI LESION SCAN REPORT", margin + 22, cursorY + 28);
  doc.setFontSize(24);
  doc.text(topPrediction.name, margin + 22, cursorY + 62);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Generated on ${formatReportDate(new Date())}`, margin + 22, cursorY + 86);
  doc.text(`Model: ${modelName.toUpperCase()}`, pageWidth - margin - 112, cursorY + 86);

  cursorY += 132;

  if (imageFile) {
    const imageDataUrl = await fileToDataUrl(imageFile);
    const imageFormat = imageDataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
    const { width, height } = await getImageDimensions(imageDataUrl);
    const imageWidth = 180;
    const imageHeight = (height / width) * imageWidth;

    doc.setFillColor(246, 247, 242);
    doc.roundedRect(margin, cursorY, 200, Math.max(imageHeight + 20, 220), 18, 18, "F");
    doc.addImage(imageDataUrl, imageFormat, margin + 10, cursorY + 10, imageWidth, imageHeight);
    doc.setTextColor(31, 39, 35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Uploaded image", margin + 14, cursorY + Math.max(imageHeight + 34, 202));
  }

  const detailsX = margin + 224;
  doc.setTextColor(31, 39, 35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Assessment Summary", detailsX, cursorY + 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const summaryLines = [
    `File name: ${imageFile ? imageFile.name : "Not available"}`,
    `Top result: ${topPrediction.name} (${topPrediction.code.toUpperCase()})`,
    `Confidence: ${formatProbability(topPrediction.probability)}`,
    "This report summarizes the current image analysis and should be reviewed alongside clinical judgment.",
  ];

  let summaryY = cursorY + 48;
  summaryLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, pageWidth - detailsX - margin);
    doc.text(wrapped, detailsX, summaryY);
    summaryY += wrapped.length * 16 + 4;
  });

  doc.setFont("helvetica", "bold");
  doc.text("Recommended follow-up", detailsX, summaryY + 10);
  doc.setFont("helvetica", "normal");
  const followUpLines = doc.splitTextToSize(
    getReportRecommendation(topPrediction),
    pageWidth - detailsX - margin,
  );
  doc.text(followUpLines, detailsX, summaryY + 32);

  cursorY += 256;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Ranked prediction results", margin, cursorY);
  cursorY += 22;

  prediction.predictions.forEach((entry, index) => {
    if (cursorY > pageHeight - 88) {
      doc.addPage();
      cursorY = margin;
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(219, 228, 217);
    doc.roundedRect(margin, cursorY, pageWidth - margin * 2, 62, 16, 16, "FD");

    doc.setTextColor(31, 39, 35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${entry.name}`, margin + 16, cursorY + 24);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const description = doc.splitTextToSize(
      `${entry.code.toUpperCase()} - ${entry.description}`,
      pageWidth - margin * 2 - 160,
    );
    doc.text(description, margin + 16, cursorY + 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(formatProbability(entry.probability), pageWidth - margin - 88, cursorY + 24);

    doc.setFillColor(
      index === 0 ? 134 : index === 1 ? 107 : index === 2 ? 255 : 196,
      index === 0 ? 214 : index === 1 ? 122 : index === 2 ? 127 : 196,
      index === 0 ? 29 : index === 1 ? 110 : index === 2 ? 143 : 196,
    );
    doc.roundedRect(
      margin + 16,
      cursorY + 50,
      Math.max((pageWidth - margin * 2 - 32) * entry.probability, 18),
      6,
      4,
      4,
      "F",
    );

    cursorY += 76;
  });

  cursorY += 12;
  if (cursorY > pageHeight - 70) {
    doc.addPage();
    cursorY = margin;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Important note", margin, cursorY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const note = doc.splitTextToSize(
    "This PDF is generated from an AI-assisted image analysis workflow. It is intended for informational support only and should not be treated as a medical diagnosis.",
    pageWidth - margin * 2,
  );
  doc.text(note, margin, cursorY + 18);

  doc.save(buildReportFileName(topPrediction.name));
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the uploaded file."));
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("Could not load the uploaded image."));
    image.src = src;
  });
}
