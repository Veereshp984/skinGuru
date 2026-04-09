import { useEffect, useRef, useState } from "react";
import { analyzeSkinImage, MODEL_NAME } from "../lib/api";
import { generateAnalysisReport } from "../lib/report";

export function useSkinAnalysis() {
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isDownloadingReport, setIsDownloadingReport] = useState(false);
  const [predictMessage, setPredictMessage] = useState("Upload an image to begin.");
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl("");
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(nextPreviewUrl);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [imageFile]);

  function applySelectedFile(file) {
    setImageFile(file);
    setPrediction(null);
    setPredictMessage(file ? "Ready to analyze." : "Upload an image to begin.");

    if (!file && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const [file] = event.target.files || [];
    applySelectedFile(file || null);
  }

  function handleUploadKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(event) {
    event.preventDefault();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragging(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const [file] = Array.from(event.dataTransfer.files || []).filter((item) =>
      item.type.startsWith("image/"),
    );

    if (!file) {
      setPredictMessage("Drop a PNG or JPG image file to continue.");
      return;
    }

    applySelectedFile(file);
  }

  async function handlePredict() {
    if (!imageFile) {
      setPredictMessage("Select an image before running analysis.");
      return;
    }

    setIsPredicting(true);
    setPredictMessage("Analyzing image...");

    try {
      const payload = await analyzeSkinImage(imageFile);
      setPrediction(payload);
      setPredictMessage("Analysis complete.");
    } catch (error) {
      setPredictMessage(error.message);
    } finally {
      setIsPredicting(false);
    }
  }

  async function handleDownloadReport() {
    if (!prediction) {
      return;
    }

    setIsDownloadingReport(true);

    try {
      await generateAnalysisReport({
        prediction,
        imageFile,
        modelName: MODEL_NAME,
      });
    } catch (error) {
      setPredictMessage("The PDF report could not be generated right now.");
    } finally {
      setIsDownloadingReport(false);
    }
  }

  return {
    fileInputRef,
    imageFile,
    previewUrl,
    isDragging,
    isPredicting,
    isDownloadingReport,
    predictMessage,
    prediction,
    topPrediction: prediction?.top_prediction ?? null,
    modelName: MODEL_NAME,
    applySelectedFile,
    openFilePicker,
    handleFileChange,
    handleUploadKeyDown,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handlePredict,
    handleDownloadReport,
  };
}
