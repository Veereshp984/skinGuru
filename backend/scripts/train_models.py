from __future__ import annotations

import os
from pathlib import Path

from tensorflow.keras.callbacks import EarlyStopping

from backend.app.config import ANN_MODEL_PATH, CNN_MODEL_PATH, MODEL_DIR
from backend.app.ml.data import DEFAULT_SAMPLE_SIZE, load_dataset
from backend.app.ml.models import build_ann_model, build_cnn_model
from backend.app.schemas import TrainingMetrics, TrainingResponse

DEFAULT_BATCH_SIZE = 64
DEFAULT_ANN_EPOCHS = 6
DEFAULT_CNN_EPOCHS = 5
DEFAULT_PATIENCE = 2


def _final_metrics(history) -> TrainingMetrics:
    return TrainingMetrics(
        loss=float(history.history["loss"][-1]),
        accuracy=float(history.history["accuracy"][-1]),
        val_loss=float(history.history["val_loss"][-1]),
        val_accuracy=float(history.history["val_accuracy"][-1]),
    )


def _ensure_model_dir() -> Path:
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    return MODEL_DIR


def _get_int_env(name: str, default: int | None) -> int | None:
    raw = os.getenv(name)
    if raw is None or raw == "":
        return default
    value = int(raw)
    if value <= 0:
        return None
    return value


def train_and_save_models() -> TrainingResponse:
    _ensure_model_dir()
    sample_size = _get_int_env("TRAIN_SAMPLE_SIZE", DEFAULT_SAMPLE_SIZE)
    ann_epochs = _get_int_env("TRAIN_ANN_EPOCHS", DEFAULT_ANN_EPOCHS) or DEFAULT_ANN_EPOCHS
    cnn_epochs = _get_int_env("TRAIN_CNN_EPOCHS", DEFAULT_CNN_EPOCHS) or DEFAULT_CNN_EPOCHS
    batch_size = _get_int_env("TRAIN_BATCH_SIZE", DEFAULT_BATCH_SIZE) or DEFAULT_BATCH_SIZE
    patience = _get_int_env("TRAIN_PATIENCE", DEFAULT_PATIENCE) or DEFAULT_PATIENCE

    dataset = load_dataset(sample_size=sample_size)

    early_stopping = EarlyStopping(
        monitor="val_loss",
        patience=patience,
        restore_best_weights=True,
    )

    ann_model = build_ann_model()
    ann_history = ann_model.fit(
        dataset.x_train_flat,
        dataset.y_train_one_hot,
        validation_split=0.1,
        epochs=ann_epochs,
        batch_size=batch_size,
        callbacks=[early_stopping],
        verbose=1,
    )
    ann_model.save(ANN_MODEL_PATH)

    cnn_model = build_cnn_model()
    cnn_history = cnn_model.fit(
        dataset.x_train_image,
        dataset.y_train_one_hot,
        validation_split=0.1,
        epochs=cnn_epochs,
        batch_size=batch_size,
        callbacks=[early_stopping],
        verbose=1,
    )
    cnn_model.save(CNN_MODEL_PATH)

    return TrainingResponse(
        message=(
            "ANN and CNN models trained and saved successfully "
            f"using sample_size={sample_size or 'full'}, ann_epochs={ann_epochs}, "
            f"cnn_epochs={cnn_epochs}, batch_size={batch_size}."
        ),
        ann=_final_metrics(ann_history),
        cnn=_final_metrics(cnn_history),
    )


if __name__ == "__main__":
    result = train_and_save_models()
    print(result.model_dump_json(indent=2))
