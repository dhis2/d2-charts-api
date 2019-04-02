export default function(chartSeries, axisNumber) {
    return (chartSeries || []).filter(series => series.axis === axisNumber);
}