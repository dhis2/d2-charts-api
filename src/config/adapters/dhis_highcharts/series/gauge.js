export default function (store, layout, isStacked, colors) {
    let series = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

    return [{
        name: series[0].name,
        data: series[0].data.slice(0, 1),
        enableMouseTracking: false,
        dataLabels: {
            y: 0,
            borderWidth: 0,
            verticalAlign: 'bottom',
            style: {
                fontSize: 35
            }
        }
    }];
}