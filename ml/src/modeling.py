import logging
import optuna
from optuna.logging import set_verbosity
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import pandas as pd

# features that will be used in model training; external code may reindex
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


def split_train_test(X, y, test_size=0.2, random_state=406962):
    """Stratified train/test split returning all four partitions."""
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=test_size,
        random_state=random_state,
        stratify=y
    )
    logging.info("Train-Test Split:")
    logging.info(f"  - Training set: {X_train.shape[0]} samples ({100*(1-test_size):.0f}%)")
    logging.info(f"  - Test set: {X_test.shape[0]} samples ({100*test_size:.0f}%)")
    return X_train, X_test, y_train, y_test


def create_objective_function(X_train, X_test, y_train, y_test, class_weight):
    """Return an Optuna-compatible objective using the supplied data."""

    def objective(trial):
        params = {
            'n_estimators': trial.suggest_int('n_estimators', 100, 600),
            'max_depth': trial.suggest_int('max_depth', 3, 10),
            'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
            'subsample': trial.suggest_float('subsample', 0.6, 1.0),
            'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
            'min_child_weight': trial.suggest_int('min_child_weight', 1, 10),
            'gamma': trial.suggest_float('gamma', 0, 5),
            'scale_pos_weight': class_weight,
            'eval_metric': 'logloss',
            'random_state': 42,
        }
        model = xgb.XGBClassifier(**params)
        model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)
        return accuracy_score(y_test, model.predict(X_test))

    return objective


def optimize_hyperparameters(X_train, X_test, y_train, y_test, n_trials=50):
    """Run an Optuna study and return best params along with class weight."""
    class_weight = (y_train == 0).sum() / (y_train == 1).sum()
    objective = create_objective_function(X_train, X_test, y_train, y_test, class_weight)
    logging.info("Hyperparameter Optimization")
    study = optuna.create_study(direction='maximize')
    set_verbosity(optuna.logging.WARNING)
    study.optimize(objective, n_trials=n_trials, show_progress_bar=True)
    logging.info("Optimization Complete!")
    logging.info(f"  Best Accuracy: {study.best_value:.4f}")
    logging.info(f"  Best Parameters: {study.best_params}")
    return study.best_params, class_weight


def train_final_model(X_train, y_train, best_params, class_weight):
    """Fit an XGBClassifier with the best parameters and return it."""
    final_params = best_params.copy()
    final_params.update({
        'scale_pos_weight': class_weight,
        'eval_metric': 'logloss',
        'random_state': 42,
    })
    model = xgb.XGBClassifier(**final_params)
    model.fit(X_train, y_train, verbose=False)
    logging.info("Final model trained successfully!")
    return model


def evaluate_model(model, X_test, y_test, feature_names):
    """Log classification report and feature importance; return predictions."""
    y_pred = model.predict(X_test)
    logging.info("Model Evaluation Results")
    logging.info("Classification Report:")
    print(classification_report(y_test, y_pred, target_names=['Not Top 10', 'Top 10']))
    feature_importance = pd.Series(
        model.feature_importances_,
        index=feature_names
    ).sort_values(ascending=False)
    logging.info("Feature Importances:")
    print(feature_importance.to_string())
    return y_pred
