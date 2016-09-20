import objectClean from 'd2-utilizr/lib/objectClean';
import getChart from './chart';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getLegend from './legend';
import { isStacked } from './type';
import getSortedConfig from './getSortedConfig';

export default function ({ store, layout, el, extraConfig, extraOptions }) {
    let config = {

        // type etc
        chart: getChart(layout, el),

        // title
        title: getTitle(layout, store.data.metaData.names),

        // x-axis
        xAxis: getXAxis(store, layout),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store, layout, isStacked(layout.type), extraOptions.colors),

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
