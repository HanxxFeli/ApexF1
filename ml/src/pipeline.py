import logging

# configure logging once for the entire package
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)
logger = logging.getLogger(__name__)


def run_pipeline(n_trials: int = 50):
    """Execute the full training and prediction pipeline.

    This function mirrors the steps in the notebook and can be called from a
    CI/CD system or invoked directly.
    """
    from .data_loader import load_all_tables, prepare_results_base
    from .features import (
        engineer_performance_features,
        merge_qualifying_data,
        merge_circuit_data,
        calculate_pts_before_race,
    )
    from .preprocessing import prepare_ml_dataset
    from .modeling import (
        split_train_test,
        optimize_hyperparameters,
        train_final_model,
        evaluate_model,
    )
    from .predict import make_predictions, push_predictions
    from .supabase_client import get_supabase_client

    # --- data loading ---
    dataframes = load_all_tables()
    circuits = dataframes['circuits']
    constructors = dataframes['constructors']
    constructor_standings = dataframes['constructor_standings']
    drivers = dataframes['drivers']
    driver_standings = dataframes['driver_standings']
    qualifying = dataframes['qualifying']
    races = dataframes['races']
    results = dataframes['results']
    to_predict = dataframes['to_predict']

    results = prepare_results_base(results)

    # --- feature engineering ---
    results = engineer_performance_features(results)
    results = merge_qualifying_data(results, qualifying)
    results = calculate_pts_before_race(results)
    results = merge_circuit_data(results, races)

    # --- prepare ML dataset ---
    X, y, encoders = prepare_ml_dataset(results)

    BASE_FEATURES = [
    'race_id',
    'driver_id',
    'constructor_id',
    'grid',
    'season',
    'round',
    'avg_last_5',
    'dnf_rate_5',
    'qualifying_position',
    'circuit_id',
    'driver_pts_before_race'
]

    # --- training / evaluation ---
    X = X.reindex(columns=BASE_FEATURES)
    X_train, X_test, y_train, y_test = split_train_test(X, y)
    best_params, class_weight = optimize_hyperparameters(
        X_train, X_test, y_train, y_test, n_trials=n_trials
    )
    model = train_final_model(X_train, y_train, best_params, class_weight)
    y_pred = evaluate_model(model, X_test, y_test, BASE_FEATURES)

    # --- prediction on new rows ---
    predictions = make_predictions(to_predict, model, encoders)
    client = get_supabase_client()
    push_predictions(predictions, client)

    logger.info("Pipeline completed successfully.")
    return model, encoders, predictions


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Run the F1 ML pipeline")
    parser.add_argument(
        "--trials",
        type=int,
        default=50,
        help="Number of Optuna trials to perform for hyperparameter search",
    )
    args = parser.parse_args()
    run_pipeline(n_trials=args.trials)
