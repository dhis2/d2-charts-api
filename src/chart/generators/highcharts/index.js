import H from 'highcharts';

export default function (config, el) {
    const chartConfig = config.getConfig();

    chartConfig.chart.renderTo = el || chartConfig.chart.renderTo;
console.log("chartConfig", JSON.stringify(chartConfig));
    return new H.Chart(chartConfig);
};
