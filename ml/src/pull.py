"""
pull.py - ApexF1 ETL Pipeline: Pull tables from Supabase

This module provides functionality to pull all F1-related tables from Supabase
and convert them into pandas DataFrames for analysis. It handles pagination
to fetch complete datasets, as Supabase has a default limit of 1000 rows per query.
"""

import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client
import pandas as pd

logger = logging.getLogger(__name__)

# read the .env file to add values into os.environ
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# List of F1 tables to pull from Supabase
# These correspond to the tables loaded in the ETL pipeline
TABLES = [
    "circuits",
    "constructors",
    "constructor_standings",
    "drivers",
    "driver_standings",
    "qualifying",
    "races",
    "results",
]


def get_supabase_client() -> Client:
    """
    Read credentials from environment and return supabase client.
    
    This function loads Supabase URL and API key from the .env file
    to establish a connection to the database. Raises an error if
    credentials are missing.
    """
    url: str = os.getenv("SUPABASE_URL")
    key: str = os.getenv("SUPABASE_KEY")

    if not url or not key:
        raise EnvironmentError("SUPABASE_URL and SUPABASE_KEY must be set in your .env file.")
    logger.info("Connecting to Supabase...")
    return create_client(url, key)


def _fetch_all_data(client: Client, table_name: str) -> list[dict]:
    """
    Fetch all data from a Supabase table by paginating through results.
    
    Supabase limits queries to 1000 rows by default. This function uses
    the range() method to fetch data in batches of 1000 rows until all
    data is retrieved. This ensures we get complete datasets even for
    large tables like 'qualifying' and 'results'.
    
    Args:
        client: Supabase client instance
        table_name: Name of the table to fetch data from
        
    Returns:
        List of dictionaries representing all rows in the table
    """
    all_data = []
    offset = 0
    batch_size = 1000

    while True:
        # Fetch a batch of up to 1000 rows starting from the current offset
        response = client.table(table_name).select("*").range(offset, offset + batch_size - 1).execute()
        data = response.data
        if not data:
            break
        all_data.extend(data)
        # If we got fewer than batch_size rows, we've reached the end
        if len(data) < batch_size:
            break
        offset += batch_size

    return all_data


def pull_all_tables(client: Client | None = None) -> dict[str, pd.DataFrame]:
    """
    Pull all F1 tables from Supabase, convert to DataFrames, and return as a dictionary.
    
    This is the main function that orchestrates pulling data from all tables.
    It uses pandas DataFrames for easy data manipulation and analysis.
    If no client is provided, it creates one using environment credentials.
    
    Args:
        client: Optional Supabase client. If None, creates a new one.
        
    Returns:
        Dictionary with table names as keys and pandas DataFrames as values
    """
    if client is None:
        client = get_supabase_client()

    dataframes = {}

    for table_name in TABLES:
        logger.info(f"Pulling '{table_name}'...")
        # Fetch complete data using pagination
        data = _fetch_all_data(client, table_name)
        # Convert to pandas DataFrame for easy analysis
        df = pd.DataFrame(data)
        dataframes[table_name] = df
        logger.info(f"Pulled '{table_name}' with {len(df)} rows")

    logger.info("Pull complete")
    return dataframes


if __name__ == "__main__":
    # When run directly, pull all tables and print the table names
    # This is useful for testing the connection and data retrieval
    logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(asctime)s - %(message)s")
    data = pull_all_tables()
    print("Pulled tables:", list(data.keys()))