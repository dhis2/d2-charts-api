import { fitData } from '../../../util/regression/jqplot_regression';
import { rgb } from 'd3-color';
import getStackedData from './getStackedData';

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

function getRegressionData(data) {
    return getAdaptedRegressionData(fitData(data).data);
}

function getColor(colors, index) {
    return colors[index] || getColor(index - colors.length);
}

function getDarkerColor(color) {
    return rgb(color).darker(0.5).toString();
}

function addTrendLines(series, isStacked) {
    if (isStacked) {
        return [
            ...series,
            Object.assign({}, DEFAULT_TRENDLINE, {
                data: getRegressionData(getStackedData(series))
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

export default function (store, layout, isStacked, colors) {
    let series = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

    series.forEach((seriesObj, index) => {

        // show values
        if (layout.showValues) {
            seriesObj.dataLabels = {
                enabled: true
            };
        }

        // stacked
        if (isStacked) {
            seriesObj.stacking = 'normal';
        }

        // color
        seriesObj.color = getColor(colors, index);
    });

    if (layout.showTrendLine) {
        series = addTrendLines(series, isStacked);
    }

    series.forEach(series => {

        // animation
        series.animation = {
            duration: DEFAULT_ANIMATION_DURATION
        };
    });

    return series;
}
