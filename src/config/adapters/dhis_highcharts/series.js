const DEFAULT_ANIMATION_DURATION = 300;

export default function (store, layout, isStacked) {
    const data = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

    data.forEach(series => {

        // trend line
        if (layout.showTrendLine) {
            series.regression = true;
        }

        // show values
        if (layout.showValues) {
            series.dataLabels = {
                enabled: true
            };
        }

        // stacked
        if (isStacked) {
            series.stacking = 'normal';
        }

        // animation
        series.animation = {
            duration: DEFAULT_ANIMATION_DURATION
        };
    });

    return data;
}
