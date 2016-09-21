import objectClean from 'd2-utilizr/lib/objectClean';
import getChart from './chart';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getSubtitle from './subtitle';
import getLegend from './legend';
import getPane from './pane';
import { isStacked } from './type';
import getSortedConfig from './getSortedConfig';

export const CHART_TYPE_GAUGE = 'gauge';

export default function ({ store, layout, el, extraConfig, extraOptions }) {
    let series = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

    let config = {

        // type etc
        chart: getChart(layout, el),

        // title
        title: getTitle(layout, store.data.metaData.names),

        // subtitle
        subtitle: getSubtitle(series.slice(), layout),

        // x-axis
        xAxis: getXAxis(store, layout),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(series.slice(), layout, isStacked(layout.type), extraOptions.colors),

        // legend
        legend: getLegend(layout),

        // pane
        pane: getPane(layout.type),

        // credits
        credits: {
            enabled: false
        }
    };

    // sorting
    if (layout.sortOrder) {
        config = getSortedConfig(config, layout);
    }

    // force apply extra config
    Object.assign(config, extraConfig);

    return objectClean(config);
}
