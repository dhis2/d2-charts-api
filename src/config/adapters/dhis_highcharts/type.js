import arrayContains from 'd2-utilizr/lib/arrayContains';

const typeMap = new Map([

    // radar
    ['radar', {
        type: 'line',
        polar: true
    }],

    // gauge
    ['gauge', {
        type: 'solidgauge'
    }]
]);

const stackedTypes = ['area'];

export function getIsStacked(type) {
    return type.indexOf('stacked') !== -1 || arrayContains(stackedTypes, type);
}

export default function (type) {
    return typeMap.get(type) || {
        type: type.toLowerCase().replace('stacked', '')
    };
}