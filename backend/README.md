# Skin Cancer App

FastAPI backend plus a React + Tailwind frontend for serving two skin-cancer classification models trained on the HAM10000 28x28 RGB dataset.

## What It Includes

- `ANN` model for flattened pixel input
- `CNN` model for image input
- `ensemble` prediction mode that averages ANN and CNN probabilities
- Training endpoint and standalone training script
- React dashboard for system health, image upload, prediction, training, and label reference

## Setup

```powershell
pip install -r backend/requirements.txt
npm.cmd install --prefix frontend
```

## Run The Backend

```powershell
uvicorn backend.app.main:app --reload
```

The API will start at `http://127.0.0.1:8000`.

## Run The Frontend

In a second terminal:

```powershell
npm.cmd run dev --prefix frontend
```

The Vite app starts at `http://127.0.0.1:5173` and proxies `/api` requests to the backend.

If you want to point the frontend at a different backend URL, create `frontend/.env` and set:

```powershell
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Train The Models

From the project root:

```powershell
python -m backend.scripts.train_models
```

This saves:

- `backend/models/ann_model.keras`
- `backend/models/cnn_model.keras`

## API Endpoints

- `GET /api/health`
- `GET /api/labels`
- `GET /api/models/status`
- `POST /api/models/train`
- `POST /api/predict?model=ann|cnn|ensemble`

## Notes

- The backend resizes uploads to `28x28` RGB to match the dataset used by your notebooks.
- The frontend lives in `frontend/` and has been verified with `npm.cmd run build`.
