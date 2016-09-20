import objectClean from 'd2-utilizr/lib/objectClean';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getLegend from './legend';
import getSortedConfig from './getSortedConfig';

const DEFAULT_SPACING_TOP = 20;

const typeMap = new Map([
    ['area', 'stackedarea']
]);

function getType(type) {
    return typeMap.get(type) || type;
}

export default function ({ store, layout, el, extraConfig, extraOptions }) {
    const type = getType(layout.type);
    const isStacked = type.toLowerCase().indexOf('stacked') !== -1;

    let config = {

        // type
        chart: objectClean({
            type: type.toLowerCase().replace('stacked', ''),
            spacingTop: DEFAULT_SPACING_TOP,
            renderTo: el || layout.el
        }),

        // title
        title: getTitle(layout, store.data.metaData.names),

        // x-axis
        xAxis: getXAxis(store, layout),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store, layout, isStacked, extraOptions.colors),

        // legend
        legend: getLegend(layout)
    };

    // sorting
    if (layout.sortOrder) {
        config = getSortedConfig(config, layout);
    }

    // force apply extra config
    Object.assign(config, extraConfig);

    return objectClean(config);
}
