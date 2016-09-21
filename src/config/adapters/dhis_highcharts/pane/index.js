import getGauge from './gauge';
import { CHART_TYPE_GAUGE } from '..';

export default function(type) {
    switch (type) {
        case CHART_TYPE_GAUGE:
            return getGauge();
            break;
        default:
            return undefined;
    }
}