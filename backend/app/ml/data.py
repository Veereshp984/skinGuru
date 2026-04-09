from __future__ import annotations

from dataclasses import dataclass
from typing import Final

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical

from backend.app.config import DATASET_PATH
from backend.app.constants import NUM_CLASSES, PIXEL_COLUMNS

DEFAULT_SAMPLE_SIZE: Final[int] = 3000
DEFAULT_RANDOM_STATE: Final[int] = 42


@dataclass(frozen=True)
class DatasetSplit:
    x_train_flat: np.ndarray
    x_test_flat: np.ndarray
    x_train_image: np.ndarray
    x_test_image: np.ndarray
    y_train: np.ndarray
    y_test: np.ndarray
    y_train_one_hot: np.ndarray
    y_test_one_hot: np.ndarray


def load_dataset(
    csv_path=DATASET_PATH,
    sample_size: int | None = DEFAULT_SAMPLE_SIZE,
    random_state: int = DEFAULT_RANDOM_STATE,
) -> DatasetSplit:
    if not csv_path.exists():
        raise FileNotFoundError(f"Dataset not found at {csv_path}")

    frame = pd.read_csv(csv_path)
    if sample_size is not None and 0 < sample_size < len(frame):
        frame, _ = train_test_split(
            frame,
            train_size=sample_size,
            stratify=frame["label"],
            random_state=random_state,
        )
        frame = frame.reset_index(drop=True)

    features = frame[PIXEL_COLUMNS].to_numpy(dtype=np.float32) / 255.0
    labels = frame["label"].to_numpy(dtype=np.int32)

    x_train_flat, x_test_flat, y_train, y_test = train_test_split(
        features,
        labels,
        test_size=0.2,
        random_state=random_state,
        stratify=labels,
    )

    x_train_image = x_train_flat.reshape((-1, 28, 28, 3))
    x_test_image = x_test_flat.reshape((-1, 28, 28, 3))
    y_train_one_hot = to_categorical(y_train, num_classes=NUM_CLASSES)
    y_test_one_hot = to_categorical(y_test, num_classes=NUM_CLASSES)

    return DatasetSplit(
        x_train_flat=x_train_flat,
        x_test_flat=x_test_flat,
        x_train_image=x_train_image,
        x_test_image=x_test_image,
        y_train=y_train,
        y_test=y_test,
        y_train_one_hot=y_train_one_hot,
        y_test_one_hot=y_test_one_hot,
    )
