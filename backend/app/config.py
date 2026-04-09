from __future__ import annotations

from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[2]
DATASET_PATH = ROOT_DIR / "hmnist_28_28_RGB.csv"
METADATA_PATH = ROOT_DIR / "HAM10000_metadata.csv"
MODEL_DIR = ROOT_DIR / "backend" / "models"
ANN_MODEL_PATH = MODEL_DIR / "ann_model.keras"
CNN_MODEL_PATH = MODEL_DIR / "cnn_model.keras"
