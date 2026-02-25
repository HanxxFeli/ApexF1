"""
load.py - ApexF1 ETL Pipeline: Step 3 of 3
Write the cleaned DataFrames from transform.py into Supabase.
Use "upsert" instead of "insert". "upsert" will update if row exists
and insert if row doesnt exist. 
"""

import os 
import math
import logging 
import numpy as np
from pathlib import Path 
import pandas as pd 
from dotenv import load_dotenv
from supabase import create_client, Client


logger = logging.getLogger(__name__)

# read the .env file to add values into os.environ
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# Send only 500 rows to Supabase in one API call (avoid payload size limit)
BATCH_SIZE = 500

# Table primary keys need to match Supabase schema
TABLE_PRIMARY_KEYS = { 
    "circuits": ["circuit_id"],
    "constructors": ["constructor_id"],
    "constructor_standings": ["season", "round", "constructor_id"],
    "drivers": ["driver_id"],
    "driver_standings": ["season", "round", "driver_id"],
    "qualifying": ["race_id", "driver_id"],
    "races": ["race_id"],
    "results": ["race_id", "driver_id"],
}


def get_supabase_client() -> Client: 
    """
    Read credentials from environment and return supabase client 
    """

    url: str = os.getenv("SUPABASE_URL")
    key: str = os.getenv("SUPABASE_KEY")

    if not url or not key: 
        raise EnvironmentError("SUPABASE_URL and SUPABASE_KEY must be set in your .env file.")
    logger.info("Connecting to Supabase...")
    
    return create_client(url, key)

def load_all(cleaned_dataframes: dict[str, pd.DataFrame], client: Client | None = None) -> dict[str, int]:
    """
    Loop through all cleaned tabled and upsert each one into Supbase 
    cleaned_dataframes dictionary comes from transform_all() from transform.py
    if no client is passed, create one from .env variables
    """

    if client is None: 
        client = get_supabase_client()

    results = {}

    for table_name, df in cleaned_dataframes.items():
        pk_columns = TABLE_PRIMARY_KEYS.get(table_name)

        if pk_columns is None: 
            logger.warning("No primary key defined for '%s' - skipping.", table_name)
            continue

        logger.info("Loading '%s' (%d rows)...", table_name, len(df))
        rows_loaded = _upsert_table(client, table_name, df, pk_columns)
        results[table_name] = rows_loaded
        logger.info("'%s' done - %d rows upserted", table_name, rows_loaded)
    
    logger.info("Load complete: %s", results)

    return results


def _upsert_table(client: Client, table_name: str, df: pd.DataFrame, pk_columns: list[str]) -> int:
    """
    Convert a dataframe to a list of dictionaries and send it to supabase in batches
    return total rows upserted
    """
    df = df.where(pd.notnull(df), other=None)
    records = df.to_dict(orient="records")
    records = _clean_types(records)

    # total rows upserted
    total = 0

    # send in chucks of BATCH_SIZE rows
    for start in range(0, len(records), BATCH_SIZE):
        batch = records[start : start + BATCH_SIZE]

        # define the response 
        response = (
            client.table(table_name)
            .upsert(batch, on_conflict=",".join(pk_columns))
            .execute()
        )

        # add the amount of rows in the response data to total
        if response.data:
            total += len(response.data)

    return total

def _clean_types(records: list[dict]) -> list[dict]:
    """
    Convert pandas/numpy tyupes to plain python types before sending in JSON
    """
    cleaned = []

    for record in records: 
        clean_row = {}

        for key, value in record.items():
            if isinstance(value, pd.Timestamp):
                # ex. Timestamp('2015-03-15') -> "2015-03-15T00:00:00"
                clean_row[key] = value.isoformat()
                
            elif isinstance(value, np.integer):
                # ex. numpy.int64(25) -> 25
                clean_row[key] = int(value)

            elif isinstance(value, np.floating):
                # ex. numpy.float64(1.5) -> 1.5
                # ex. NaN -> None
                clean_row[key] = float(value)

            elif isinstance(value, float) and math.isnan(value):
                clean_row[key] = None
                
            else: 
                clean_row[key] = value

        cleaned.append(clean_row)
    return cleaned

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(asctime)s - %(message)s")
    client = get_supabase_client
