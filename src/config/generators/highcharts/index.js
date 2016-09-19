import H from 'highcharts';

export default function (config, el) {
    config.chart.renderTo = el || config.chart.renderTo;
console.log("configobj", config);
    return new H.Chart(config);
};
