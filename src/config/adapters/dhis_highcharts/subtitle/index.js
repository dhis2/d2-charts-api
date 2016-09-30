import isString from 'd2-utilizr/lib/isString';
import getGauge from './gauge';
import getFilterTitle from '../getFilterTitle';
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

function getDefault(layout, dashboard, filterTitle) {
    return {
        text: dashboard || isString(layout.title) ? filterTitle : undefined
    };
}

export default function (series, layout, metaData, dashboard) {
    let subtitle;

    const filterTitle = getFilterTitle(layout, metaData);

    switch(layout.type) {
        case CHART_TYPE_PIE:
        case CHART_TYPE_GAUGE:
            subtitle = getGauge(series, layout, metaData, dashboard, filterTitle);
            break;
        default:
            subtitle = getDefault(layout, dashboard, filterTitle);
    }

    return subtitle ? Object.assign(
        {},
        DEFAULT_SUBTITLE,
        dashboard ? DASHBOARD_SUBTITLE : undefined,
        subtitle
    ) : subtitle;
}