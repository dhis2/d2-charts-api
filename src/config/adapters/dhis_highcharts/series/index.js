import getCumulativeData from './../getCumulativeData';
import getPie from './pie';
import getGauge from './gauge';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '..';

const DEFAULT_ANIMATION_DURATION = 300;

function getColor(colors, index) {
    return colors[index] || getColor(colors, index - colors.length);
}

function getDefault(series, store, layout, isStacked, colors) {
    series.forEach((seriesObj, index) => {
        // show values
        if (layout.showValues) {
            seriesObj.dataLabels = {
                enabled: true
            };
        }

        // stacked
        if (isStacked) {
            // DHIS2-1060: stacked charts can optionally be shown as 100% stacked charts
            seriesObj.stacking = layout.percentStackedValues === true ? 'percent' : 'normal';
        }

        // color
        seriesObj.color = getColor(colors, index);
    });

    // DHIS2-701: use cumulative values
    if (layout.cumulativeValues === true) {
        series = getCumulativeData(series);
    }

    return series;
}

export default function (series, store, layout, isStacked, extraOptions) {
    switch(layout.type) {
        case CHART_TYPE_PIE:
            series = getPie(series, store, layout, isStacked, extraOptions.colors);
            break;
        case CHART_TYPE_GAUGE:
            series = getGauge(series, extraOptions.dashboard);
            break;
        default:
            series = getDefault(series, store, layout, isStacked, extraOptions.colors);
    }

    series.forEach(seriesObj => {

        // animation
        seriesObj.animation = {
            duration: DEFAULT_ANIMATION_DURATION
        };
    });

    return series;
}
