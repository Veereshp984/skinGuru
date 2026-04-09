from __future__ import annotations

from io import BytesIO

import numpy as np
from PIL import Image
from tensorflow import keras

from backend.app.config import ANN_MODEL_PATH, CNN_MODEL_PATH
from backend.app.constants import IMAGE_SIZE, LABELS
from backend.app.schemas import PredictionEntry, PredictionResponse


class ModelService:
    def __init__(self) -> None:
        self._ann_model: keras.Model | None = None
        self._cnn_model: keras.Model | None = None

    def model_status(self) -> dict[str, bool]:
        return {
            "ann_model_present": ANN_MODEL_PATH.exists(),
            "cnn_model_present": CNN_MODEL_PATH.exists(),
        }

    def _load_ann(self) -> keras.Model:
        if self._ann_model is None:
            if not ANN_MODEL_PATH.exists():
                raise FileNotFoundError(f"ANN model not found at {ANN_MODEL_PATH}")
            self._ann_model = keras.models.load_model(ANN_MODEL_PATH)
        return self._ann_model

    def _load_cnn(self) -> keras.Model:
        if self._cnn_model is None:
            if not CNN_MODEL_PATH.exists():
                raise FileNotFoundError(f"CNN model not found at {CNN_MODEL_PATH}")
            self._cnn_model = keras.models.load_model(CNN_MODEL_PATH)
        return self._cnn_model

    def preprocess_upload(self, image_bytes: bytes) -> tuple[np.ndarray, np.ndarray]:
        image = Image.open(BytesIO(image_bytes)).convert("RGB").resize(IMAGE_SIZE)
        array = np.asarray(image, dtype=np.float32) / 255.0
        cnn_ready = np.expand_dims(array, axis=0)
        ann_ready = cnn_ready.reshape((1, -1))
        return ann_ready, cnn_ready

    def predict(self, image_bytes: bytes, model_name: str) -> PredictionResponse:
        ann_input, cnn_input = self.preprocess_upload(image_bytes)

        if model_name == "ann":
            probabilities = self._load_ann().predict(ann_input, verbose=0)[0]
        elif model_name == "cnn":
            probabilities = self._load_cnn().predict(cnn_input, verbose=0)[0]
        else:
            ann_probs = self._load_ann().predict(ann_input, verbose=0)[0]
            cnn_probs = self._load_cnn().predict(cnn_input, verbose=0)[0]
            probabilities = (ann_probs + cnn_probs) / 2.0

        entries = [
            PredictionEntry(
                index=index,
                code=label.code,
                name=label.name,
                description=label.description,
                probability=float(probabilities[index]),
            )
            for index, label in LABELS.items()
        ]
        entries.sort(key=lambda item: item.probability, reverse=True)

        return PredictionResponse(
            model=model_name,
            top_prediction=entries[0],
            predictions=entries,
        )


model_service = ModelService()
