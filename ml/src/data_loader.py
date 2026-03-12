import logging


def prepare_results_base(results):
    """Sort results by driver_id, season and round.

    The operation returns a sorted **copy** of ``results``; it does not
    mutate the passed-in DataFrame.  This is used early in the pipeline to
    ensure that later rolling computations operate on correctly ordered
    data.
    """
    results = results.sort_values(["driver_id", "season", "round"], inplace=False)
    logging.info(f"Results sorted: {results.shape[0]} records")
    return results


def load_all_tables():
    """Wrapper around :func:`supabase_client.pull_all_tables` that logs shape.

    Returns a dictionary mapping table names to DataFrames.  This mirrors
    the notebook version and is convenient when building pipelines.
    """
    from .supabase_client import pull_all_tables

    dataframes = pull_all_tables()
    logging.info("Data Loading Summary:")
    logging.info("-" * 50)
    for name, df in dataframes.items():
        logging.info(f"  {name:30s} Shape: {df.shape}")
    logging.info("-" * 50)
    return dataframes
