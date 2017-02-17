import arrayContains from 'd2-utilizr/lib/arrayContains';

const chartTypeMap = new Map([

    // radar
    ['radar', {
        type: 'line',
        polar: true
    }],

    // gauge
    ['gauge', {
        type: 'solidgauge'
    }],

    // stackedcolumn
    ['stackedcolumn', {
        type: 'column'
    }],

    // stackedbar
    ['stackedbar', {
        type: 'bar'
    }]

]);

const stackedTypes = ['stackedcolumn', 'stackedbar', 'area'];

export function getIsStacked(type) {
    return arrayContains(stackedTypes, type.toLowerCase());
}

export default function (type) {
    return chartTypeMap.get(type.toLowerCase()) || {
        type: type.toLowerCase()
    };
}
