export default function(chartSeries) {
    if (!(Array.isArray(chartSeries) && chartSeries.length)) {
        return null;
    }

    return chartSeries.reduce((map, series) => {
        map[series.id] = series.axis;
        return map;
    }, {});
}