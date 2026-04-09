from __future__ import annotations

from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from backend.app.config import DATASET_PATH
from backend.app.constants import LABELS
from backend.app.ml.service import model_service
from backend.app.schemas import HealthResponse, LabelResponse, TrainingResponse
from backend.scripts.train_models import train_and_save_models

app = FastAPI(
    title="Skin Cancer Prediction API",
    version="0.1.0",
    description="Backend API for ANN, CNN, and ensemble skin cancer predictions.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "SkinGuru API is running.",
        "health": "/api/health",
        "docs": "/docs",
    }


@app.get("/api/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    status = model_service.model_status()
    return HealthResponse(
        status="ok",
        dataset_present=DATASET_PATH.exists(),
        ann_model_present=status["ann_model_present"],
        cnn_model_present=status["cnn_model_present"],
    )


@app.get("/api/labels", response_model=list[LabelResponse])
def get_labels() -> list[LabelResponse]:
    return [
        LabelResponse(
            index=index,
            code=label.code,
            name=label.name,
            description=label.description,
        )
        for index, label in LABELS.items()
    ]


@app.get("/api/models/status")
def get_model_status() -> dict[str, bool]:
    return model_service.model_status()


@app.post("/api/models/train", response_model=TrainingResponse)
def train_models() -> TrainingResponse:
    try:
        return train_and_save_models()
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Training failed: {exc}") from exc


@app.post("/api/predict")
async def predict(
    image: UploadFile = File(...),
    model: str = Query(default="ensemble", pattern="^(ann|cnn|ensemble)$"),
):
    image_bytes = await image.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    try:
        return model_service.predict(image_bytes=image_bytes, model_name=model)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}") from exc
