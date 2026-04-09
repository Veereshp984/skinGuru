export const MODEL_NAME = "ensemble";
export const API_BASE = getApiBase();

export async function analyzeSkinImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(`${API_BASE}/api/predict?model=${MODEL_NAME}`, {
      method: "POST",
      body: formData,
    });

    const payload = await parseApiResponse(response);
    if (!response.ok) {
      throw new Error(payload.detail || `Analysis failed with status ${response.status}.`);
    }

    return payload;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Could not reach the SkinGuru API. Check that VITE_API_BASE_URL uses your HTTPS Render URL and wait a moment if the free backend is waking up.",
      );
    }

    throw error;
  }
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

async function parseApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { detail: text || "The server returned an empty response." };
}
