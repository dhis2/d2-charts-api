import arrayContains from 'd2-utilizr/lib/arrayContains';

// Note: IE11 does not support passing the array directly to the constructor
const typeMap = new Map();

typeMap.set('radar', { type: 'line', polar: true });
typeMap.set('gauge', { type: 'solidgauge' });

const stackedTypes = ['area'];

export function getIsStacked(type) {
    return type.indexOf('stacked') !== -1 || arrayContains(stackedTypes, type);
}

export default function (type) {
    return typeMap.get(type) || {
        type: type.toLowerCase().replace('stacked', '')
    };
}
