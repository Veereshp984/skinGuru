from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class LabelInfo:
    code: str
    name: str
    description: str


LABELS: dict[int, LabelInfo] = {
    0: LabelInfo("akiec", "Actinic keratoses", "Precancerous rough or scaly skin lesions."),
    1: LabelInfo("bcc", "Basal cell carcinoma", "A common slow-growing type of skin cancer."),
    2: LabelInfo("bkl", "Benign keratosis-like lesions", "Typically non-cancerous keratin growths."),
    3: LabelInfo("df", "Dermatofibroma", "Usually benign fibrous skin nodules."),
    # HMNIST / HAM10000 CSV label encoding used by this project:
    # 4 -> nv, 5 -> vasc, 6 -> mel
    4: LabelInfo("nv", "Melanocytic nevi", "Common moles that are usually benign."),
    5: LabelInfo("vasc", "Vascular lesions", "Lesions related to blood vessels."),
    6: LabelInfo("mel", "Melanoma", "An aggressive form of skin cancer needing urgent review."),
}

IMAGE_SIZE = (28, 28)
NUM_CLASSES = len(LABELS)
PIXEL_COLUMNS = [f"pixel{i:04d}" for i in range(IMAGE_SIZE[0] * IMAGE_SIZE[1] * 3)]
