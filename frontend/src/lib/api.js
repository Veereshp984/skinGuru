export const MODEL_NAME = "ensemble";
export const API_BASE = getApiBase();

export async function analyzeSkinImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_BASE}/api/predict?model=${MODEL_NAME}`, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.detail || "Analysis failed.");
  }

  return payload;
}

function getApiBase() {
  const configuredBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  if (configuredBase) {
    return configuredBase;
  }

  if (typeof window === "undefined") {
    return "";
  }

  const { protocol, hostname, port } = window.location;
  if (new Set(["localhost", "127.0.0.1"]).has(hostname) && port !== "8000") {
    return `${protocol}//${hostname}:8000`;
  }

  return "";
}
