export default function (store, layout) {
    const data = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);
    const isStacked = layout.type.toLowerCase().indexOf('stacked') !== -1;

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
    });

    return data;
}
