export default function (store, layout) {
    const data = store.getData(layout.columns[0].dimension, layout.rows[0].dimension);

    if (layout.showTrendLine) {
        data.forEach(series => {
            series.regression = true;
        });
    }

    if (layout.showValues) {
        data.forEach(series => {
            series.dataLabels = {
                enabled: true
            };
        });
    }

    return data;
}
