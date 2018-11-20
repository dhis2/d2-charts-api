import getCumulativeData from './../getCumulativeData';
import getPie from './pie';
import getGauge from './gauge';
import getType from '../type';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '../type';

const DEFAULT_ANIMATION_DURATION = 200;

function getColor(colors, index) {
    return colors[index] || getColor(colors, index - colors.length);
}

function getAnimation(option, fallback) {
    return typeof option === 'number' ? option : fallback;
}

function getDefault(series, store, layout, isStacked, extraOptions) {
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
            seriesObj.stacking = layout.percentStackedValues === true ? 'percent' : 'normal';
        }

        // DHIS2-2101
        // show bar/columm chart as EPI curve (basically remove spacing between bars/columns)
        const seriesType = getType(layout.type).type;

        if ((seriesType === 'column' || seriesType === 'bar') && layout.noSpaceBetweenColumns) {
            seriesObj.pointPadding = 0;
            seriesObj.groupPadding = 0;
        }

        // color
        seriesObj.color = getColor(extraOptions.colors, index);

        // custom names for series for Year on year chart type
        if (extraOptions.yearlySeries) {
            seriesObj.name = extraOptions.yearlySeries[index];
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
