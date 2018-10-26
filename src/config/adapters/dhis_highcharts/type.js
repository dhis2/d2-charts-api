import arrayContains from 'd2-utilizr/lib/arrayContains';

const stackedTypes = ['STACKED_COLUMN', 'STACKEDCOLUMN', 'STACKED_BAR', 'STACKEDBAR',  'AREA'];

export function getIsStacked(type) {
    return arrayContains(stackedTypes, String(type).toUpperCase());
}

export default function(type) {
    switch (String(type).toUpperCase()) {
        case 'BAR':
        case 'STACKED_BAR':
        case 'STACKEDBAR':
            return { type: 'bar' };
        case 'LINE':
            return { type: 'line' };
        case 'AREA':
            return { type: 'area' };
        case 'PIE':
            return { type: 'pie' };
        case 'RADAR':
            return { type: 'line', polar: true };
        case 'GAUGE':
            return { type: 'solidgauge' };
        case 'COLUMN':
        case 'STACKED_COLUMN':
        case 'STACKEDCOLUMN':
        default:
            return { type: 'column' };
    }
}