import H from 'highcharts';
import HM from 'highcharts-more';

// apply highcharts-more
HM(H);

export default function (config, el) {
    config.chart.renderTo = el || config.chart.renderTo;

console.log("configobj", config);

    return new H.Chart(config);
};
