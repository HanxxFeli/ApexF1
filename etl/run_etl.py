"""
run_etl.py - ApexF1 Pipeline Runner
Runs the extract, transform and load python files (scripts)
"""

import logging 
import sys
from pathlib import Path

# Import the functions from extract, transform and load
from src.extract import load_csvs_from_folder
from src.transform import transform_all
from src.load import load_all, get_supabase_client

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)

logger = logging.getLogger(__name__)

RAW_DATA_PATH = "data/raw/f1"

def run_pipeline():
    logger.info("--- ApexF1 ETL Pipeline starting ---")

    # Step 1 - Extract
    logger.info("[1/3] EXTRACT")
    raw_dataframes = load_csvs_from_folder(RAW_DATA_PATH)

    if not raw_dataframes: 
        logger.error("No data found. Check that %s exists and has CSV files.", RAW_DATA_PATH)
        sys.exit(1) # exit the program

    # Step 2 - Transform 
    logger.info("[2/3] TRANSFORM]")
    cleaned_dataframes = transform_all(raw_dataframes)

    # Step 3: Load 
    logger.info("[3/3] LOAD")
    client = get_supabase_client()
    results = load_all(cleaned_dataframes, client=client)

    logger.info("--- Pipeline complete ---")
    for table, count in results.items():
        logger.info("  %s: %d rows", table, count)


    # # Temporary logger without step 3 
    # logger.info("--- Pipeline complete (load skipped) ---")
    # for table, df in cleaned_dataframes.items():
    #     logger.info("  %s: %d rows", table, len(df))

if __name__=="__main__":
    run_pipeline()