import math
import pandas as pd
from supabase import Client
import numpy as np

BATCH_SIZE = 500


def _clean_types(records: list[dict]) -> list[dict]:
    """Convert pandas/numpy types to plain Python types for JSON serialization."""
    cleaned = []
    for record in records:
        clean_row = {}
        for key, value in record.items():
            if isinstance(value, pd.Timestamp):
                clean_row[key] = value.isoformat()
            elif isinstance(value, np.integer):
                clean_row[key] = int(value)
            elif isinstance(value, (np.floating, float)) and (isinstance(value, np.floating) or math.isnan(value)):
                clean_row[key] = None if math.isnan(float(value)) else float(value)
            else:
                clean_row[key] = value
        cleaned.append(clean_row)
    return cleaned



def _clear_table(client: Client, table_name: str) -> None:
    """Delete all rows from ``table_name`` in the given Supabase client."""
    client.table(table_name).delete().neq("race_id", " ").execute()


def _insert_batched(client: Client, table_name: str, records: list[dict]) -> int:
    """Insert ``records`` in batches, returning the total inserted count."""
    total = 0
    for start in range(0, len(records), BATCH_SIZE):
        batch = records[start : start + BATCH_SIZE]
        response = client.table(table_name).insert(batch).execute()
        if response.data:
            total += len(response.data)
    return total


def _prepare_records(df: pd.DataFrame) -> list[dict]:
    """Turn a DataFrame into a list of clean dicts ready for upload."""
    df = df.where(pd.notnull(df), other=None)
    return _clean_types(df.to_dict(orient="records"))


def push_table(client: Client, table_name: str, df: pd.DataFrame) -> int:
    """Empty ``table_name`` and insert all rows of ``df``.

    This mirrors the logic from the notebook that clears the table before
    pushing fresh predictions.
    """
    _clear_table(client, table_name)
    records = _prepare_records(df)
    return _insert_batched(client, table_name, records)
