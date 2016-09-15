export default function (store, layout) {
    const sorting = layout.sortOrder ? {
        direction: layout.sortOrder === 1 ? 'ASC' : 'DESC'
    } : undefined;

    const data = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

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
