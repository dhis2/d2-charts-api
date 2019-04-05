// returns:
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

// returns:
// {
//     a: 1,
//     b: 1,
// }
export function getIdAxisMap(chartSeries) {
    return chartSeries.reduce((map, series) => {
        map[series.id] = series.axis;
        return map;
    }, {});
}

export function getFullIdAxisMap(chartSeries, series) {
    const idAxisMap = getIdAxisMap(chartSeries);

    // adds first axis ids to idAxisMap
    series.forEach(s => {
        if (!(s.id in idAxisMap)) {
            idAxisMap[s.id] = 0;
        }
    });

    return idAxisMap;
}

// returns: [1,1,1,1,2,2] or [1,2]
function getAxes(chartSeries, unique) {
    const axes = chartSeries.map(series => series.axis);
    return unique ? [...(new Set(axes))] : axes;
}

// returns: true or false
export function hasExtraAxis(chartSeries) {
    return Boolean(Object.keys(getIdAxisMap(chartSeries)).length);
}

// returns:
// {
//     0: ['a', 'b'],
//     1: ['c'],
// }
export function getAxisIdMap(chartSeries, series) {
    const fullIdAxisMap = getFullIdAxisMap(chartSeries, series);

    return Object.entries(fullIdAxisMap).reduce((map, [id, axis]) => {
        if (!(axis in map)) {
            map[axis] = [];
        }

        map[axis].push(id);
        return map;
    }, {});
}
