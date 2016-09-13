import H from 'highcharts';

export default function (config, el) {
    config.chart.renderTo = config.chart.renderTo || el;

    return new H.Chart(config);
};
