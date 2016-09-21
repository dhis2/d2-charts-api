export default function (store, layout, isStacked, colors) {
    let series = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

    return [{
        name: series[0].name,
        data: series[0].data.slice(0, 1),
        dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
            format: '<div style="text-align:center"><span style="font-size:25px;color:#000">{y}</span></div>'
        }
    }];
}