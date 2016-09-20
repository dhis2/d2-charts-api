import objectClean from 'd2-utilizr/lib/objectClean';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getLegend from './legend';
import getType from './type';
import getSortedConfig from './getSortedConfig';

const STACKED = 'stacked';
const DEFAULT_SPACING_TOP = 20;

export default function ({ store, layout, el, extraConfig, extraOptions }) {
    const type = getType(layout.type);
    const isStacked = type.indexOf(STACKED) !== -1;

    let config = {

        // type
        chart: objectClean({
            type: type.replace(STACKED, ''),
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
