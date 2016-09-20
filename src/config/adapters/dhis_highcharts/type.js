const typeMap = new Map([

    // area
    ['area', {
        type: 'stackedarea'
    }],

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

export function isStacked(type) {
    return type.indexOf('stacked') !== -1;
}

export default function (type) {
    return typeMap.get(type) || {
        type: type.toLowerCase()
    };
}