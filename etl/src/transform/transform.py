"""
transform.py — ApexF1 ETL Pipeline: Transformation Layer
=========================================================
Responsible for cleaning, filtering, and reshaping the raw DataFrames
produced by extract.py before they are loaded into Supabase.

General cleaning rules applied across tables:
  - Strip trailing whitespace from column names
  - Filter data to 2015–present (the era relevant to the ML model)
  - Drop columns not needed for analysis (e.g. Wikipedia URLs)
  - Rename camelCase columns to snake_case for SQL consistency
  - Cast columns to their correct data types
  - Log duplicate counts and null value summaries for visibility
"""

import pandas as pd 
import logging 


logger = logging.getLogger(__name__)

# Only get season data from 2015 onwards
SEASON_START = 2015

def transform_all(dataframes: dict[str, pd.DataFrame]) -> dict[str, pd.DataFrame]:
    """
    1. Run the clean function for each table.
    2. Take the raw dict from extract.py and return the cleaned DataFrame

    dataframes is a dictionary from extract.py :  { "circuits": <DataFrame>, ...}
    """

    # (Dispatch Table) Dictionary to map each table name to the function that cleans it 
    transform_map = { 
        "circuits": transform_circuits,
        "constructors": transform_constructors,
        "constructor_standings": transform_constructor_standings,
        "drivers": transform_drivers,
        "driver_standings": transform_driver_standings,
        "qualifying": transform_qualifying,
        "races": transform_races,
        "results": transform_results,
    }

    # dictionary containing cleaned dataframes 
    cleaned: dict[str, pd.DataFrame] = {}

    for table_name, clean_function in transform_map.items():
        if table_name not in dataframes: 
            logger.warning("'%s' not found in extracted data - skipping.", table_name)
            continue

        logger.info("Transfomring '%s'...", table_name)
        try: 
            cleaned[table_name] = clean_function(dataframes[table_name].copy())
            logger.info("'%s' done - %d rows", table_name, len(cleaned[table_name]))        

        except Exception as e: 
            logger.error("Failed to transform '%s': '%s'", table_name, e)
            raise

    return cleaned


# ---
# Table-specific functions
# ---

def transform_circuits(df: pd.DataFrame) -> pd.DataFrame:
    # remove wikipedia url column 
    df.columns = df.columns.str.strip()
    df = df.drop(columns=["Wikipedia_url"])
    _check_quality(df, "circuits")
    return df

def transform_constructors(df: pd.DataFrame) -> pd.DataFrame:
    # remove wikipedia url column 
    df.columns = df.columns.str.strip()
    df = df.drop(columns=["Wikipedia_url"])
    _check_quality(df, "constructors")
    return df

def transform_constructor_standings(df: pd.DataFrame) -> pd.DataFrame:
    # filter the seasons to >= 2015
    df = df[df["season"] >= SEASON_START].copy()
    _check_quality(df, "constructor_standings")
    return df

def transform_drivers(df: pd.DataFrame) -> pd.DataFrame:
    # renaming columns to snake_case
    df = df.rename(columns={"givenName": "given_name", "familyName": "family_name"})
    _check_quality(df, "drivers")
    return df

def transform_driver_standings(df: pd.DataFrame) -> pd.DataFrame:
    df = df[df["season"] >= SEASON_START].copy()
    
    # log the 3 drivers iwth no position but do not remove
    null_rows = df[df["position"].isna()]
    if not null_rows.empty: 
        logger.warning(
            "%d driver(s) have no position (entered but did not race): %s",
            len(null_rows),
            null_rows["driver_id"].tolist()
        )

    _check_quality(df, "driver_standings") 
    return df

def transform_qualifying(df: pd.DataFrame) -> pd.DataFrame:
    # split race_id into 2 separate columns
    df[["season", "round"]] = df["race_id"].str.split("_", expand=True).astype(int)
    df = df[df["season"] >= SEASON_START].copy()

    # Q2 and Q3 nulls are expected 
    logger.info(
        "qualifying: q2 nulls=%d, q3 nulls=%d (expected, not errors)",
        df["q2"].isna().sum(), df["q3"].isna().sum()
    )

    _check_quality(df, "qualifying")
    return df

def transform_races(df: pd.DataFrame) -> pd.DataFrame:
    df = df[df["season"] >= SEASON_START].copy()
    df["date"] = pd.to_datetime(df["date"])
    df = df.drop(columns=["time"])
    _check_quality(df, "races")
    return df

def transform_results(df: pd.DataFrame) -> pd.DataFrame:
    df[["season", "round"]] = df["race_id"].str.split("_", expand=True).astype(int)
    df = df[df["season"] >= SEASON_START].copy()

    # points will be casted into int since it was loaded as a float
    df["points"] = df["points"].astype(int)

    _check_quality(df, "results")
    return df


# ---
# Shared helper function
# ---

def _check_quality(df: pd.DataFrame, table_name: str) -> None:
    """
    Quality check for the table: duplicate count and null counts.
    runs in every transform function
    """

    # duplicate checking 
    duplicates = df.duplicated().sum()
    if duplicates > 0:
        logger.warning("%s: %d duplicate row(s) found!", table_name, duplicates)
    else: 
        logger.info("%s: 0 duplicates", table_name)

    # null checking 
    nulls = df.isna().sum()
    columns_with_nulls = nulls[nulls > 0]

    if columns_with_nulls.empty: 
        logger.info("%s: 0 null values", table_name)
    else: 
        logger.info("%s nulls:\n%s", table_name, columns_with_nulls.to_string())