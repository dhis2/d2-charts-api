import { fitData } from '../../../util/regression/jqplot_regression';
import { rgb } from 'd3-color';
import getStackedData from './getStackedData';

export const REGRESSION_TYPE_LINEAR = 'LINEAR';

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

export default function (series, isStacked) {
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
