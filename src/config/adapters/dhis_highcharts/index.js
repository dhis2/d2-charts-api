import isDefined from 'd2-utilizr/lib/isDefined';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';

export default function adapter(store, layout, response, extraConfig) {
    const config = {

        // type
        chart: {
            type: layout.type
        },

        // x-axis
        xAxis: getXAxis(layout, response),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store)
    };

    // element
    const el = layout.el;

    if (el) {
        config.chart.renderTo = el;
    }

    // title
    const title = getTitle(layout);

    if (isDefined(title)) {
        config.title = title;
    }

    // legend
    const legend = getLegend(layout);

    if (isDefined(legend)) {
        config.legend = legend;
    }

    // force apply extra config
    Object.assign(config, extraConfig);

    return config;
}
