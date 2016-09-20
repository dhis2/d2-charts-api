const typeMap = new Map([

    // area
    ['area', {
        type: 'stackedarea'
    }],

    // radar
    ['radar', {
        type: 'area',
        polar: true
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