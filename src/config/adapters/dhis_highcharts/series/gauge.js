export default function (series) {
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