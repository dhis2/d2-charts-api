import { isDualAxis } from "./type";
import { multiAxisTheme1 } from "../../../util/colors/themes";
import { generateColors } from "../../../util/colors/gradientColorGenerator";

// {
//     abc: {
//         id: 'a',
//         axis: 1,
//         type: 'line',
//     }
// }
function getIdSeriesMap(chartSeries) {
    return chartSeries.reduce((map, series) => {
        map[series.id] = series;
        return map;
    });
}

// {
//     a: 1,
//     b: 1,
// }
function getIdAxisMap(chartSeries) {
    return chartSeries.reduce((map, series) => {
        map[series.id] = series.axis;
        return map;
    });
}

// [1,1,1,1,2,2] or [1,2]
function getAxes(chartSeries, unique) {
    const axes = chartSeries.map(series => series.axis);
    return unique ? [...(new Set(axes))] : axes;
}

function hasExtraAxis(chartSeries) {
    return Boolean(Object.values(getIdAxisMap(chartSeries)).length);
}

// {
//     0: ['a', 'b'],
//     1: ['c'],
// }
function getAxisIdMap(chartSeries, series) {
    const idAxisMap = getIdAxisMap(chartSeries);

    // add first axis ids to idAxisMap
    series.forEach(s => {
        if (!(s.id in idAxisMap)) {
            idAxisMap[s.id] = 0;
        }
    });

    return Object.entries(idAxisMap).reduce((map, [id, axis]) => {
        if (!(axis in map)) {
            map[axis] = [];
        }

        map[axis].push(id);
        return map;
    }, {});
}

// {
//     id1: 'color1',
//     id2: 'color2',
//     id3: 'color3',
// };
export function getIdColorMap(chartSeries, series, layout, extraOptions) {
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
            map[s.id] = colors[index];
        }, {});
    }
}