import os
import pickle
import logging
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# default location for encoder storage
ENCODER_FILE = "encoders.pkl"


def save_encoders(encoders, filepath=ENCODER_FILE):
    """Persist a dictionary of ``LabelEncoder`` objects to disk."""
    with open(filepath, 'wb') as f:
        pickle.dump(encoders, f)
    logging.info(f"Encoders saved to {filepath}")


def load_encoders(filepath=ENCODER_FILE):
    """Load encoders from disk; return empty dict if file is missing."""
    if os.path.exists(filepath):
        with open(filepath, 'rb') as f:
            encoders = pickle.load(f)
        logging.info(f"Encoders loaded from {filepath}")
        return encoders
    logging.warning(f"Encoder file not found at {filepath}, returning empty dict.")
    return {}


def encode_categorical_features(data, columns_to_encode, existing_encoders=None):
    """Label-encode columns, optionally reusing/expanding existing encoders.

    Unseen categories are appended to ``classes_`` rather than raising an
    error; integer-looking values are ignored when expanding to avoid
    unintentionally encoding already-numeric data.
    """
    data = data.copy()
    encoders = {} if existing_encoders is None else existing_encoders.copy()

    for col in columns_to_encode:
        data[col] = data[col].astype(str)
        if col in encoders:
            le = encoders[col]
            unseen = set(data[col].unique()) - set(le.classes_)
            unseen = {v for v in unseen if not v.isdigit()}
            if unseen:
                le.classes_ = np.concatenate([le.classes_, list(unseen)])
        else:
            le = LabelEncoder()
            le.fit(data[col])
        data[col] = le.transform(data[col])
        encoders[col] = le
        logging.info(f"  Encoded '{col}' — {len(le.classes_)} unique values")

    return data, encoders


def transform_with_encoders(data, encoders):
    """Apply previously-fitted encoders to a new dataset, adding unseen labels."""
    data = data.copy()
    for col, le in encoders.items():
        if col in data.columns:
            data[col] = data[col].astype(str)
            unseen = set(data[col].unique()) - set(le.classes_)
            unseen = {v for v in unseen if not v.isdigit()}
            if unseen:
                le.classes_ = np.concatenate([le.classes_, list(unseen)])
            data[col] = le.transform(data[col])
    return data


def decode_categorical_features(data, encoders):
    """Reverse the encoding for one or more columns using supplied encoders."""
    data = data.copy()
    for col, le in encoders.items():
        if col in data.columns:
            try:
                data[col] = le.inverse_transform(data[col].astype(int))
            except ValueError:
                mapping = {i: cls for i, cls in enumerate(le.classes_)}
                data[col] = data[col].map(mapping).astype(object)
    return data


def handle_missing_values(data):
    """Impute missing values according to predefined strategies."""
    data = data.copy()
    logging.info("Handling missing values:")
    if 'avg_last_5' in data.columns:
        data['avg_last_5'] = data['avg_last_5'].fillna(data['avg_last_5'].mean())
        logging.info("  - avg_last_5: filled with mean")
    if 'dnf_rate_5' in data.columns:
        data['dnf_rate_5'] = data['dnf_rate_5'].fillna(data['dnf_rate_5'].mean())
        logging.info("  - dnf_rate_5: filled with mean")
    if 'qualifying_position' in data.columns:
        worst_per_race = data.groupby('race_id')['qualifying_position'].transform('max')
        data['qualifying_position'] = data['qualifying_position'].fillna(worst_per_race + 1)
        logging.info("  - qualifying_position: filled with worst position + 1")
    return data


def create_target_variable(data):
    """Add binary ``best_10`` target indicating top‑10 finish."""
    data = data.copy()
    data['best_10'] = (data['position_order'] <= 10).astype(int)
    class_distribution = data['best_10'].value_counts()
    logging.info("Target variable created (best_10):")
    logging.info(f"  - Top 10 (1): {class_distribution.get(1, 0)}")
    logging.info(f"  - Outside Top 10 (0): {class_distribution.get(0, 0)}")
    return data


def prepare_ml_dataset(results):
    """Create feature matrix ``X``, target ``y``, and encoders for training.

    This function performs the same sequence of operations as the notebook:
    drop ``status``, encode categorical ids, impute missing values, create
    the target column, and finally remove columns that would leak future
    information.
    """
    ml_data = results.drop(columns=['status']).copy()
    logging.info("Encoding categorical features...")
    existing_encoders = load_encoders()
    columns_to_encode = ['race_id', 'driver_id', 'constructor_id', 'circuit_id']
    ml_data, encoders = encode_categorical_features(ml_data, columns_to_encode, existing_encoders)
    save_encoders(encoders)
    logging.info("Handling missing values...")
    ml_data = handle_missing_values(ml_data)
    logging.info("Creating target variable...")
    ml_data = create_target_variable(ml_data)
    columns_to_drop = [
        'best_10', 'position', 'position_order', 'points', 'laps', 'dnf'
    ]
    X = ml_data.drop(columns=columns_to_drop)
    y = ml_data['best_10']
    logging.info("ML Dataset prepared:")
    logging.info(f"  - Features shape: {X.shape}")
    logging.info(f"  - Target shape: {y.shape}")
    logging.info(f"  - Feature columns: {list(X.columns)}")
    return X, y, encoders
