import objectClean from 'd2-utilizr/lib/objectClean';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getLegend from './legend';
import getSortedConfig from './sortedConfig';

export default function ({ store, layout, el, extraConfig }) {
    const isStacked = layout.type.toLowerCase().indexOf('stacked') !== -1;

    let config = {

        // type
        chart: objectClean({
            type: layout.type.toLowerCase().replace('stacked', ''),
            renderTo: el || layout.el
        }),

        // title
        title: getTitle(layout, store.data.metaData.names),

        // x-axis
        xAxis: getXAxis(store, layout),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store, layout, isStacked),

        // legend
        legend: getLegend(layout)
    };

    // sorting
    if (layout.sortOrder) {
        config = getSortedConfig(config, layout);
    }

    // force apply extra config
    Object.assign(config, extraConfig);


console.log("layout", layout);
    return objectClean(config);
}
