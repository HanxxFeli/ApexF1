"""
extract.py - ApexF1 ETL Pipeline: Step 1 of 3
Read raw CSV files from disk and store them in a dictionary of DataFrames.
"""

from pathlib import Path 
import pandas as pd
import logging 

# Logger Setup 
# logging.getLogger(__name__) creates a logger whose name is the file name 
logger = logging.getLogger(__name__)

# Encodings to try when reading a CSV
ENCODINGS_TO_TRY = ["utf-8", "latin-1", "cp1252"]


def load_csvs_from_folder(folder_path: str | Path) -> dict[str, pd.DataFrame]:
    """
    Find all CSV files from folder and load into dataframe.
    Return dict where the key is the file name and value is the dataframe.

    sample return value:
        {
            "circuits":  <DataFrame>,
            "drivers":   <DataFrame>,
        }
    """

    # define folder path
    folder = Path(folder_path)

    if not folder.exists():
        raise FileNotFoundError(f"Data folder not found: {folder}")
    
    # find all csv files using .glob
    csv_files = list(folder.glob("*.csv"))

    if not csv_files:
        logger.warning("No CSV files found in %s", folder)
        return {}
    
    logger.info("Found %d CSV file(s) in %s", len(csv_files), folder)

    # store dataframes into dictionary
    dataframes: dict[str, pd.DataFrame] = {}

    for file_path in csv_files:
        df = _try_read_csv(file_path) # use helper function for reading csv
        if df is not None:
            dataframes[file_path.stem] = df # key becomes the stem and the value is the df

    logger.info("Extraction done. Tables loaded: %s", list(dataframes.keys()))
    return dataframes

def _try_read_csv(file_path: Path) -> pd.DataFrame | None: 
    """
    Try to read one CSV file and tries the different ENCODINGS_TO_TRY.
    Returns a DataFrame if success and None if it fails.
    Internal helper function for load_csvs_from_folder function
    """

    for encoding in ENCODINGS_TO_TRY: 
        try: 
            df = pd.read_csv(file_path, encoding=encoding)
            logger.info("Loaded '%s' with encoding '%s' (%d rows)", file_path.stem, encoding, len(df))
            return df
        
        except UnicodeDecodeError: 
            # encoding failed. Try next encoding
            continue

        except Exception as e: 
            # something else went wrong 
            logger.error("Could not load '%s': %s", file_path.stem, e)
            return None
        
    logger.error("Could not load '%s' with any encoding", file_path.stem)
    return None

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(asctime)s - %(message)s")
    
    # get the file's current file path
    # go to the root etl file
    # add the path to the csv files (inside data folder)
    this_file = Path(__file__)
    project_root = this_file.parent.parent.parent.parent
    raw_data_path = project_root / "etl" / "data" / "raw" / "f1"
    
    dataframes = load_csvs_from_folder(raw_data_path)
    print(f"Loaded {len(dataframes)} table(s): {list(dataframes.keys())}")
