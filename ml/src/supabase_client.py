import os
import logging
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client, Client


# list of tables to fetch from Supabase; these mirror the notebook's TABLES
TABLES = [
    "circuits",
    "constructors",
    "constructor_standings",
    "drivers",
    "driver_standings",
    "qualifying",
    "races",
    "results",
    "to_predict",
]


def get_supabase_client() -> Client:
    """Return a Supabase client based on credentials in the environment.

    The function will read SUPABASE_URL and SUPABASE_KEY from a .env file
    located in the working directory (or use already-populated
    ``os.environ``).  It logs and raises if the values are missing.
    """
    # load .env if present (safe to call repeatedly)
    env_path = Path.cwd() / ".env"
    load_dotenv(dotenv_path=env_path)

    url: str = os.getenv("SUPABASE_URL")
    key: str = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise EnvironmentError("SUPABASE_URL and SUPABASE_KEY must be set in your .env file.")
    logging.info("Connecting to Supabase...")
    return create_client(url, key)



def _fetch_all_data(client: Client, table_name: str) -> list[dict]:
    """Fetch all rows from a Supabase table by paginating in batches.

    Supabase limits responses to 1000 rows, therefore this helper
    repeatedly requests ranges of that size until no more data is
    returned.
    """
    all_data = []
    offset = 0
    batch_size = 1000

    while True:
        response = client.table(table_name).select("*").range(offset, offset + batch_size - 1).execute()
        data = response.data
        if not data:
            break
        all_data.extend(data)
        if len(data) < batch_size:
            break
        offset += batch_size

    return all_data


def pull_all_tables(client: Client | None = None) -> dict[str, "pd.DataFrame"]:
    """Download every table listed in :data:`TABLES` and return DataFrames.

    An existing client may be supplied for testing; if ``None`` this
    routine obtains its own using :func:`get_supabase_client`.
    """
    import pandas as pd

    if client is None:
        client = get_supabase_client()

    dataframes: dict[str, pd.DataFrame] = {}
    for table_name in TABLES:
        logging.info(f"Pulling '{table_name}'...")
        data = _fetch_all_data(client, table_name)
        df = pd.DataFrame(data)
        dataframes[table_name] = df
        logging.info(f"Pulled '{table_name}' with {len(df)} rows")

    logging.info("Pull complete")
    return dataframes
