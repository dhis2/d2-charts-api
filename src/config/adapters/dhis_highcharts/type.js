import arrayContains from 'd2-utilizr/lib/arrayContains';

// Note: IE11 does not support passing the array directly to the constructor
const chartTypeMap = new Map();

chartTypeMap.set('radar', { type: 'line', polar: true });
chartTypeMap.set('gauge', { type: 'solidgauge' });
chartTypeMap.set('stackedcolumn', { type: 'column' });
chartTypeMap.set('stackedbar', { type: 'bar' });

const stackedTypes = ['stackedcolumn', 'stackedbar', 'area'];

export function getIsStacked(type) {
    return arrayContains(stackedTypes, type.toLowerCase());
}

export default function (type) {
    return chartTypeMap.get(type.toLowerCase()) || {
        type: type.toLowerCase()
    };
}
