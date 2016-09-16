import objectClean from 'd2-utilizr/lib/objectClean';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getLegend from './legend';
import getSortedConfig from './sortedConfig';

export default function ({ store, layout, el, extraConfig }) {
    let config = {

        // type
        chart: objectClean({
            type: layout.type.replace('stacked', '').toLowerCase(),
            renderTo: el || layout.el
        }),

        // title
        title: getTitle(layout),

        // x-axis
        xAxis: getXAxis(store, layout),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store, layout),

        // legend
        legend: getLegend(layout)
    };

    // sorting
    if (layout.sortOrder) {
        config = getSortedConfig(config, layout.sortOrder);
    }

    // force apply extra config
    Object.assign(config, extraConfig);

    return objectClean(config);
}
