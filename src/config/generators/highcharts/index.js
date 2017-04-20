import H from 'highcharts';
import HM from 'highcharts-more';
import HSG from 'highcharts-solid-gauge';
import HNDTD from 'highcharts-no-data-to-display';
import HE from 'highcharts-exporting';
import HOE from 'highcharts-offline-exporting';

// apply
HM(H);
HSG(H);
HNDTD(H);
HE(H);
HOE(H);

export default function (config, el) {
    if (config) {
        config.chart.renderTo = el || config.chart.renderTo;

        return new H.Chart(config);
    }
};