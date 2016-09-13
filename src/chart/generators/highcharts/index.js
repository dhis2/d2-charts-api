import H from 'highcharts';

export default function (config, el) {

console.log("config", config, el);
    chartConfig = config.getConfig();

    chartConfig.chart.renderTo = el || chartConfig.chart.renderTo;

    return new H.Chart(chartConfig);
};
