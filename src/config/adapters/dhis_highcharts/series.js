import { fitData } from '../../../util/regression/jqplot_regression';
import getStackedData from './getStackedData';

const DEFAULT_ANIMATION_DURATION = 300;

function getTrendLines(series, isStacked) {
    const trendLines = [];

    if (isStacked) {
        trendLines.push({
            name: 'Trend',
            type: 'line',
            data: fitData(getStackedData(series)).data
        });
    }
    else {
        series.forEach(seriesObj => {
            trendLines.push({
                name: `(Trend) ${seriesObj.name}`,
                type: 'line',
                data: fitData(seriesObj.data.slice())
            });
        });
    }

    return trendLines;
}

export default function (store, layout, isStacked) {
    let series = store.generateData(layout.columns[0].dimension, layout.rows[0].dimension);

    series.forEach(series => {

        // show values
        if (layout.showValues) {
            series.dataLabels = {
                enabled: true
            };
        }

        // stacked
        if (isStacked) {
            series.stacking = 'normal';
        }
    });

    if (layout.showTrendLine) {
        series = series.concat(getTrendLines(series, isStacked));
    }

    series.forEach(series => {

        // animation
        series.animation = {
            duration: DEFAULT_ANIMATION_DURATION
        };
    });

    return series;
}
