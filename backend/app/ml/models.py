from __future__ import annotations

from tensorflow import keras
from tensorflow.keras import layers

from backend.app.constants import NUM_CLASSES


def build_ann_model(input_dim: int = 28 * 28 * 3) -> keras.Model:
    model = keras.Sequential(
        [
            layers.Input(shape=(input_dim,)),
            layers.Dense(64, activation="relu"),
            layers.Dense(32, activation="relu"),
            layers.Dense(16, activation="relu"),
            layers.Dense(NUM_CLASSES, activation="softmax"),
        ]
    )
    model.compile(
        optimizer="adam",
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    return model


def build_cnn_model(input_shape: tuple[int, int, int] = (28, 28, 3)) -> keras.Model:
    model = keras.Sequential(
        [
            layers.Input(shape=input_shape),
            layers.Conv2D(16, (3, 3), activation="relu", padding="same"),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(32, (3, 3), activation="relu", padding="same"),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation="relu", padding="same"),
            layers.Flatten(),
            layers.Dense(64, activation="relu"),
            layers.Dropout(0.2),
            layers.Dense(NUM_CLASSES, activation="softmax"),
        ]
    )
    model.compile(
        optimizer="adam",
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    return model
