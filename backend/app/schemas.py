from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


ModelName = Literal["ann", "cnn", "ensemble"]


class HealthResponse(BaseModel):
    status: str
    dataset_present: bool
    ann_model_present: bool
    cnn_model_present: bool


class LabelResponse(BaseModel):
    index: int
    code: str
    name: str
    description: str


class PredictionEntry(BaseModel):
    index: int
    code: str
    name: str
    description: str
    probability: float = Field(ge=0.0, le=1.0)


class PredictionResponse(BaseModel):
    model: ModelName
    top_prediction: PredictionEntry
    predictions: list[PredictionEntry]


class TrainingMetrics(BaseModel):
    loss: float
    accuracy: float
    val_loss: float
    val_accuracy: float


class TrainingResponse(BaseModel):
    message: str
    ann: TrainingMetrics
    cnn: TrainingMetrics
