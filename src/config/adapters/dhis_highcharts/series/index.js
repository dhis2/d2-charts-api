import getCumulativeData from './../getCumulativeData';
import getPie from './pie';
import getGauge from './gauge';
import getType, { isDualAxis } from '../type';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '../type';
import getIdAxisMap from '../getIdAxisMap';

const DEFAULT_ANIMATION_DURATION = 200;

const HIGHCHARTS_TYPE_COLUMN = 'column';
const HIGHCHARTS_TYPE_BAR = 'bar';
const HIGHCHARTS_TYPE_PERCENT = 'percent';
const HIGHCHARTS_TYPE_NORMAL = 'normal';

const epiCurveTypes = [HIGHCHARTS_TYPE_COLUMN, HIGHCHARTS_TYPE_BAR];

function getColor(colors, index) {
    return colors[index] || getColor(colors, index - colors.length);
}

function getAnimation(option, fallback) {
    return typeof option === 'number' ? option : fallback;
}

function getDefault(series, store, layout, isStacked, extraOptions) {
    const idAxisMap = getIdAxisMap(layout.chartSeries);

    series.forEach((seriesObj, index) => {
        // show values
        if (layout.showValues || layout.showData) {
            seriesObj.dataLabels = {
                enabled: true,
            };
        }

        // stacked
        if (isStacked) {
            // DHIS2-1060: stacked charts can optionally be shown as 100% stacked charts
            seriesObj.stacking = layout.percentStackedValues === true ? HIGHCHARTS_TYPE_PERCENT : HIGHCHARTS_TYPE_NORMAL;
        }

        // DHIS2-2101
        // show bar/column chart as EPI curve (basically remove spacing between bars/columns)
        if (layout.noSpaceBetweenColumns) {
            const seriesType = getType(layout.type).type;

            if (arrayContains(epiCurveTypes, seriesType)) {
                seriesObj.pointPadding = 0;
                seriesObj.groupPadding = 0;
            }
        }

        // color
        seriesObj.color = getColor(extraOptions.colors, index);

        // custom names for series for Year on year chart type
        if (extraOptions.yearlySeries) {
            seriesObj.name = extraOptions.yearlySeries[index];
        }

        // dual axis number
        if (isDualAxis(layout.type) && idAxisMap && idAxisMap[seriesObj.id]) {
            seriesObj.yAxis = idAxisMap[seriesObj.id];
        }
    });

    // DHIS2-701: use cumulative values
    if (layout.cumulativeValues === true) {
        series = getCumulativeData(series);
    }

    return series;
}

export default function(series, store, layout, isStacked, extraOptions) {
    switch (layout.type) {
        case CHART_TYPE_PIE:
            series = getPie(series, store, layout, isStacked, extraOptions.colors);
            break;
        case CHART_TYPE_GAUGE:
            series = getGauge(series, extraOptions.dashboard);
            break;
        default:
            series = getDefault(series, store, layout, isStacked, extraOptions);
    }

    series.forEach(seriesObj => {
        // animation
        seriesObj.animation = {
            duration: getAnimation(extraOptions.animation, DEFAULT_ANIMATION_DURATION),
        };
    });

    return series;
}
