import logging

from .modeling import BASE_FEATURES


def make_predictions(to_predict, model, encoders):
    """Encode ``to_predict`` table, run the model, and decode results.

    Returns the original DataFrame with a new ``top10_predicted`` column.
    """
    from .preprocessing import transform_with_encoders, decode_categorical_features

    # keep only the features the model expects; missing columns become NaN
    to_predict = to_predict.reindex(columns=BASE_FEATURES)
    to_predict = transform_with_encoders(to_predict, encoders)
    preds = model.predict(to_predict)
    to_predict['top10_predicted'] = preds
    to_predict = decode_categorical_features(to_predict, encoders)
    return to_predict


def push_predictions(to_predict, client):
    """Send prediction rows back to Supabase under the "predictions" table."""
    from .utils import push_table

    df = to_predict[['race_id', 'driver_id', 'top10_predicted']]
    rows = push_table(client, "predictions", df)
    logging.info("%d prediction rows upserted to Supabase", rows)
    return rows
