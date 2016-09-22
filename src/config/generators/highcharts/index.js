import H from 'highcharts';
import HM from 'highcharts-more';
import HSG from 'highcharts-solid-gauge';

// apply
HM(H);
HSG(H);

export default function (config, el) {
    config.chart.renderTo = el || config.chart.renderTo;

console.log("configobj", config, JSON.stringify(config));

    return new H.Chart(config);
};