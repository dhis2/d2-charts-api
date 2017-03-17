import { fitData } from '../../../../util/regression/jqplot_regression';
import { rgb } from 'd3-color';
import getStackedData from './../getStackedData';
import getCumulativeData from './../getCumulativeData';
import getPie from './pie';
import getGauge from './gauge';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '..';

const REGRESSION_TYPE_LINEAR = 'LINEAR';

const DEFAULT_ANIMATION_DURATION = 300;

const DEFAULT_TRENDLINE = {
    type: 'line',
    name: 'Trend',
    dashStyle: 'solid',
    color: '#333',
    lineWidth: 1,
    marker: {
        symbol: 'circle',
        radius: 2
    }
};

function getAdaptedRegressionData(data) {
    return data.map(array => array[1]);
}

function getRegressionData(data, isClean) {
    const adaptedRegressionData = getAdaptedRegressionData(fitData(data).data);
    let i = 0;

    return isClean ? adaptedRegressionData : data.map((value, index) => value === null ? value : adaptedRegressionData[i++]);
}

function getColor(colors, index) {
    return colors[index] || getColor(colors, index - colors.length);
}

function getDarkerColor(color) {
    return rgb(color).darker(0.5).toString();
}

function addTrendLines(series, isStacked) {
    if (isStacked) {
        return [
            ...series,
            Object.assign({}, DEFAULT_TRENDLINE, {
                data: getRegressionData(getStackedData(series, true))
            })
        ];
    }
    else {
        const newSeries = [];

        series.forEach(seriesObj => {
            newSeries.push(seriesObj, Object.assign({}, DEFAULT_TRENDLINE, {
                color: getDarkerColor(seriesObj.color),
                data: getRegressionData(seriesObj.data)
            }));
        });

        return newSeries;
    }
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

    if (layout.regressionType === REGRESSION_TYPE_LINEAR) {
        series = addTrendLines(series, isStacked);
    }

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
