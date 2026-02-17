
## EXTRACTING DATA FROM KAGGLE

from pathlib import Path 
import pandas as pd 

# store the different dataframes into 1 dictionary
dataframes = {}
encodings_to_try = ["utf-8", "latin-1", "cp1252"]

# loop over files in the folder and get all the csv files
folder_path = Path('etl/data/raw/f1')
csv_files = list(folder_path.glob("*.csv"))

# for each CSV found, create a df using the frame and store it in the dataframes dictionary
for file_path in csv_files:
    for enc in encodings_to_try:
        try: 
            # try to read csv using the encodings listed
            df = pd.read_csv(f"{file_path}", encoding=enc)
            
            # if successful, store to dataframe with the stem as the key
            dataframes[file_path.stem] = df
            print(f"Loaded {file_path.stem} into dataframe successfully with encoding {enc}")
            break

        except UnicodeDecodeError: 
            continue

        except Exception as e:
            # catch other types of errors
            print(f"Failed to load {file_path.stem} {e}")
            break

# display all loaded CSVs using the keys
print(f"All loaded CSVs: {dataframes.keys()}")

    
