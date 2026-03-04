# Machine Learning Pipeline

This repository contains a clean, modular implementation of an F1
machine-learning pipeline originally developed in a Jupyter notebook.

## Structure

- `src/` - Python packages and scripts used by the pipeline
  - `supabase_client.py` – helpers for connecting to Supabase and pulling
    tables
  - `data_loader.py` – high‑level data‑loading wrappers
  - `features.py` – feature engineering routines
  - `preprocessing.py` – encoding, imputation and dataset preparation
  - `modeling.py` – model training, hyperparameter search and evaluation
  - `predict.py` – scoring and pushing predictions back to Supabase
  - `utils.py` – generic helpers for serialization and database writes
  - `pipeline.py` – orchestration script that ties all stages together
  - `__main__.py` – enables `python -m src` execution

- `ml.ipynb` / `ml_clean.ipynb` – exploratory notebooks from earlier
  development
- `requirements.txt` – dependencies required to run the code

## Usage

Run the full pipeline from the command line:

```bash
cd c:\VSC_FIles\ApexF1\ml
python -m src.pipeline --trials 100   # adjust trials as needed
```

Or simply execute the package:

```bash
python -m src
```

Before running, ensure the `.env` file contains your Supabase
credentials (`SUPABASE_URL` and `SUPABASE_KEY`).

Logs will be emitted to the console; the final predictions are written
back to the `predictions` table after clearing any existing rows.
