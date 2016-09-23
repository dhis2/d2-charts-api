import getGauge from './gauge';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '..';

const DEFAULT_SUBTITLE = {
    style: {
        fontSize: '13px',
        color: '#444',
        textShadow: '0 0 #999'
    }
};

const DASHBOARD_SUBTITLE = {
    style: {
        fontSize: '12px'
    }
};

export default function (series, layout, dashboard) {
    let subtitle;

    switch(layout.type) {
        case CHART_TYPE_PIE:
        case CHART_TYPE_GAUGE:
            subtitle = getGauge(series);
            break;
        default:
            subtitle = undefined;
    }

    return subtitle ? Object.assign({}, DEFAULT_SUBTITLE, (dashboard ? DASHBOARD_SUBTITLE : undefined), subtitle) : subtitle;
}