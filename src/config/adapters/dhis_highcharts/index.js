import objectClean from 'd2-utilizr/lib/objectClean';
import getChart from './chart';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';
import getSubtitle from './subtitle';
import getLegend from './legend';
import getPane from './pane';
import getNoData from './noData';
import { getIsStacked } from './type';
import getSortedConfig from './getSortedConfig';
import getTrimmedConfig from './getTrimmedConfig';

export const CHART_TYPE_PIE = 'pie';
export const CHART_TYPE_GAUGE = 'gauge';

export default function ({ store, layout, el, extraConfig, extraOptions }) {
    let series = store.generateData({
        seriesId: layout.columns[0].dimension,
        categoryId: layout.rows[0].dimension
    });

    const isStacked = getIsStacked(layout.type);

    let config = {

        // type etc
        chart: getChart(layout, el, extraOptions.dashboard),

        // title
        title: getTitle(layout, store.data.metaData, extraOptions.dashboard),

        // subtitle
        subtitle: getSubtitle(series, layout, store.data.metaData, extraOptions.dashboard),

        // x-axis
        xAxis: getXAxis(store, layout),

        // y-axis
        yAxis: getYAxis(layout, extraOptions),

        // series
        series: getSeries(series.slice(), store, layout, isStacked, extraOptions),

        // legend
        legend: getLegend(layout, extraOptions.dashboard),

        // pane
        pane: getPane(layout.type),

        // no data
        noData: getNoData(),

        // credits
        credits: {
            enabled: false
        },

        // exporting
        exporting: {
            // disable exporting context menu
            enabled: false
        }
    };

    // hide empty categories
    if (layout.hideEmptyRows) {
        config = getTrimmedConfig(config);
    }

    // sorting
    if (layout.sortOrder) {
        config = getSortedConfig(config, layout, isStacked);
    }

    // force apply extra config
    Object.assign(config, extraConfig);

    return objectClean(config);
}
