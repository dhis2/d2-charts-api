import isString from 'd2-utilizr/lib/isString';
import getGauge from './gauge';
import getFilterTitle from '../getFilterTitle';
import { CHART_TYPE_PIE, CHART_TYPE_GAUGE } from '..';

const DEFAULT_SUBTITLE = {
    style: {
        // DHIS2-578: dynamically truncate subtitle when it's taking more than 1 line
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        fontSize: '14px',
        color: '#555',
        textShadow: '0 0 #999'
    }
};

const DASHBOARD_SUBTITLE = {
    style: {
        // DHIS2-578: dynamically truncate subtitle when it's taking more than 1 line
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        fontSize: '12px'
    }
};

function getDefault(layout, dashboard, filterTitle) {
    return {
        text: dashboard || isString(layout.title) ? filterTitle : undefined
    };
}

export default function (series, layout, metaData, dashboard) {
    if (layout.hideSubtitle) {
        return null;
    }

    let subtitle;

    // DHIS2-578: allow for optional custom subtitle
    if (isString(layout.subtitle)) {
        subtitle = { text: layout.subtitle };
    }
    else {
        const filterTitle = getFilterTitle(layout, metaData);

<<<<<<< HEAD
    switch(layout.type) {
        case CHART_TYPE_PIE:
        case CHART_TYPE_GAUGE:
            subtitle = getGauge(series, layout, dashboard, filterTitle);
            break;
        default:
            subtitle = getDefault(layout, dashboard, filterTitle);
=======
        switch(layout.type) {
            case CHART_TYPE_PIE:
            case CHART_TYPE_GAUGE:
                subtitle = getGauge(series, layout, metaData, dashboard, filterTitle);
                break;
            default:
                subtitle = getDefault(layout, dashboard, filterTitle);
        }
>>>>>>> ed691407b31210de6654f72aef63c9a9c838ee9c
    }

    return subtitle ? Object.assign(
        {},
        DEFAULT_SUBTITLE,
        dashboard ? DASHBOARD_SUBTITLE : undefined,
        subtitle
    ) : subtitle;
}
