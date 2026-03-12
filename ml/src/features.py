import logging

# DNF keywords used to flag entries where a driver did not finish
DNF_KEYWORDS = [
    'retired', 'accident', 'collision', 'disqualified',
    'engine', 'gearbox', 'hydraulics', 'suspension', 'brakes',
    'electrical', 'electronics', 'power', 'ers', 'turbo',
    'transmission', 'fuel', 'oil', 'overheating', 'water',
    'driveshaft', 'cooling', 'mechanical', 'wheel', 'puncture',
    'spun', 'withdrew', 'damage', 'vibrations'
]
DNF_PATTERN = '|'.join(DNF_KEYWORDS)


def engineer_performance_features(results):
    """Add rolling point averages and DNF indicators to ``results``.

    - ``avg_last_5``: mean of ``points`` from the previous five races
    - ``dnf``: binary flag if the status contains a known DNF keyword
    - ``dnf_rate_5``: rolling mean of the ``dnf`` indicator

    A copy is returned and ``results`` is not mutated.
    """
    results = results.copy()
    results['avg_last_5'] = (
        results.groupby('driver_id')['points']
        .transform(lambda x: x.shift(1).rolling(5, min_periods=1).mean())
    )
    results['dnf'] = (
        results['status']
        .str.contains(DNF_PATTERN, case=False, na=False)
        .astype(int)
    )
    results['dnf_rate_5'] = (
        results.groupby('driver_id')['dnf']
        .transform(lambda x: x.shift(1).rolling(5, min_periods=1).mean())
    )
    logging.info("Performance features engineered: avg_last_5, dnf, dnf_rate_5")
    return results


def merge_qualifying_data(results, qualifying):
    """Attach qualifying positions to the ``results`` DataFrame.

    A left join is performed on ``race_id`` and ``driver_id`` so that
    every result keeps its row even if qualifying data is missing.
    """
    qualifying_merge = (
        qualifying[['race_id', 'driver_id', 'position']]
        .rename(columns={'position': 'qualifying_position'})
    )
    results = results.merge(
        qualifying_merge,
        on=['race_id', 'driver_id'],
        how='left'
    )
    logging.info(f"Qualifying data merged: {results.shape[0]} records")
    return results


def merge_circuit_data(results, races):
    """Attach ``circuit_id`` from the ``races`` table."""
    results = results.merge(
        races[['race_id', 'circuit_id']],
        on='race_id',
        how='left'
    )
    logging.info(f"Circuit data merged: {results.shape[0]} records")
    return results


def calculate_pts_before_race(results):
    """Compute cumulative driver points prior to each race within a season."""
    results = results.copy()
    results.sort_values(['driver_id', 'season', 'round'], inplace=True)
    results['driver_pts_before_race'] = (
        results
        .groupby(['driver_id', 'season'])['points']
        .transform(lambda x: x.shift(1).cumsum().fillna(0))
    )
    return results
