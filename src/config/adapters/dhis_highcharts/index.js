import arrayContains from 'd2-utilizr/lib/arrayContains';
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
import addTrendLines from './addTrendLines';

<<<<<<< HEAD
export const CHART_TYPE_PIE = 'PIE';
export const CHART_TYPE_GAUGE = 'GAUGE';

const getTransformedLayout = layout => ({
    ...layout,
    type: String(layout.type).toUpperCase(),
});

export default function ({ store, layout, el, extraConfig, extraOptions }) {
    const _layout = getTransformedLayout(layout);

    let series = store.generateData({
        seriesId: _layout.columns[0].dimension,
        categoryId: _layout.rows[0].dimension
=======
export const CHART_TYPE_PIE = 'pie';
export const CHART_TYPE_GAUGE = 'gauge';
export const CHART_TYPE_YEAR_ON_YEAR = 'yearonyear';

export default function({ store, layout, el, extraConfig, extraOptions }) {
    let series = store.generateData({
        seriesId: layout.columns[0].dimension,
        categoryId: layout.rows[0].dimension,
>>>>>>> bc158e0da1a55213754b4258f0b83ce8f0a5576f
    });

    const isStacked = getIsStacked(_layout.type);

    let config = {
        // type etc
        chart: getChart(_layout, el, extraOptions.dashboard),

        // title
<<<<<<< HEAD
        title: getTitle(_layout, store.data.metaData, extraOptions.dashboard),

        // subtitle
        subtitle: getSubtitle(series, _layout, store.data.metaData, extraOptions.dashboard),
=======
        title: getTitle(layout, store.data[0].metaData, extraOptions.dashboard),

        // subtitle
        subtitle: getSubtitle(series, layout, store.data[0].metaData, extraOptions.dashboard),
>>>>>>> bc158e0da1a55213754b4258f0b83ce8f0a5576f

        // x-axis
        xAxis: getXAxis(store, _layout),

        // y-axis
        yAxis: getYAxis(_layout, extraOptions),

        // series
        series: getSeries(series.slice(), store, _layout, isStacked, extraOptions),

        // legend
        legend: getLegend(_layout, extraOptions.dashboard),

        // pane
        pane: getPane(_layout.type),

        // no data
        noData: getNoData(),

        // credits
        credits: {
            enabled: false,
        },

        // exporting
        exporting: {
            // disable exporting context menu
            enabled: false,
        },
    };

    // hide empty categories
    if (_layout.hideEmptyRowItems !== 'NONE') {
        config = getTrimmedConfig(config, _layout.hideEmptyRowItems);
    }

    // sorting
    if (_layout.sortOrder) {
        config = getSortedConfig(config, _layout, isStacked);
    }

    // DHIS2-1243 add trend lines after sorting
    // trend line on pie and gauge does not make sense
    if (!arrayContains([CHART_TYPE_GAUGE, CHART_TYPE_PIE], _layout.type) && _layout.regressionType !== 'NONE') {
        config.series = addTrendLines(_layout.regressionType, config.series, isStacked);
    }

    // force apply extra config
    Object.assign(config, extraConfig);

    return objectClean(config);
}
