import getCumulativeData from './../getCumulativeData';
import getPie from './pie';
import getGauge from './gauge';
import getType, { isDualAxis } from '../type';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '../type';
import { getFullIdAxisMap, getAxisIdMap, hasExtraAxis } from '../chartSeries';
import { defaultMultiAxisTheme1 } from '../../../../util/colors/themes';
import { generateColors } from '../../../../util/colors/gradientColorGenerator';

const DEFAULT_ANIMATION_DURATION = 200;

const HIGHCHARTS_TYPE_COLUMN = 'column';
const HIGHCHARTS_TYPE_BAR = 'bar';
const HIGHCHARTS_TYPE_PERCENT = 'percent';
const HIGHCHARTS_TYPE_NORMAL = 'normal';

const epiCurveTypes = [HIGHCHARTS_TYPE_COLUMN, HIGHCHARTS_TYPE_BAR];

function getAnimation(option, fallback) {
    return typeof option === 'number' ? option : fallback;
}

function getColor(colors, index) {
    return colors[index] || getColor(colors, index - colors.length);
}

// returns:
// {
//     id1: 'color1',
//     id2: 'color2',
//     id3: 'color3',
// };
function getIdColorMap(chartSeries, series, layout, extraOptions) {
    console.log("getIdColorMap", chartSeries);
     if (hasExtraAxis(chartSeries) && isDualAxis(layout.type)) {
        // {
        //     0: ['id1', 'id2', 'id3'],
        //     1: ['id4', 'id5'],
        // };
        const axisIdMap = getAxisIdMap(chartSeries, series);
        // {
        //     0: {
        //         startColor: '#3f6a92',
        //         endColor: '#6cb8ff'
        //     },
        //     1: {
        //         startColor: '#9e3640',
        //         endColor: '#ff5666',
        //     },
        // };
        const theme = extraOptions.multiAxisTheme || defaultMultiAxisTheme1;
        // {
        //     0: ['color1', 'color2', 'color3'],
        //     1: ['color4', 'color5'],
        // };
        const colorsByAxis = Object.keys(axisIdMap).reduce((map, axis) => {
            const numberOfIds = axisIdMap[axis].length;
            map[axis] = generateColors(theme[axis].startColor, theme[axis].endColor, numberOfIds);
            return map;
        }, {});

        return Object.keys(colorsByAxis).reduce((map, axis) => {
            const colors = colorsByAxis[axis];
            const ids = axisIdMap[axis];

            ids.forEach((id, index) => {
                map[id] = colors[index];
            });

            return map;
        }, {});
    }
    else {
        const colors = extraOptions.colors;

        return series.reduce((map, s, index) => {
            map[s.id] = getColor(colors, index);
        }, {});
    }
}

function getDefault(series, store, layout, isStacked, extraOptions) {
    const fullIdAxisMap = getFullIdAxisMap(layout.chartSeries, series);
    const idColorMap = getIdColorMap(layout.chartSeries, series, layout, extraOptions);
console.log("fullIdAxisMap", fullIdAxisMap);
console.log("idColorMap", idColorMap);
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

        seriesObj.yAxis = fullIdAxisMap[seriesObj.id];

        // custom names for "year over year" series
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
console.log("extraOptions", extraOptions);
    series.forEach(seriesObj => {
        // animation
        seriesObj.animation = {
            duration: getAnimation(extraOptions.animation, DEFAULT_ANIMATION_DURATION),
        };
    });

    return series;
}
