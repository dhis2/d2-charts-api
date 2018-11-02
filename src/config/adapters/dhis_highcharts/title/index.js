import isString from 'd2-utilizr/lib/isString';
import getFilterTitle from '../getFilterTitle';
import { CHART_TYPE_YEAR_OVER_YEAR_LINE } from '..';
import { getYearOverYear } from './yearOverYear';

const DEFAULT_TITLE_STYLE = {
    margin: 30,
    y: 18,
    style: {
        color: '#111',
    },
};

const DASHBOARD_TITLE_STYLE = {
    margin: 15,
    y: 12,
    style: {
        fontSize: '13px',
        fontWeight: 'bold',
    },
};

function getDefault(layout, metaData, dashboard) {
    // filters
    if (layout.filters && !dashboard) {
        return getFilterTitle(layout.filters, metaData);
    }

    return null;
}

export default function(layout, metaData, dashboard) {
    if (layout.hideTitle) {
        return null;
    }

    const title = {
        text: null,
    };

    if (isString(layout, title) && layout.title.length) {
        title.text = layout.title;
    } else {
        switch (layout.type) {
            case CHART_TYPE_YEAR_OVER_YEAR_LINE:
                //  case CHART_TYPE_YEAR_OVER_YEAR_COLUMN:
                title.text = getYearOverYear(layout, metaData, dashboard);
                break;
            default:
                title.text = getDefault(layout, metaData, dashboard);
                break;
        }
    }

    return Object.assign(
        {},
        DEFAULT_TITLE_STYLE,
        dashboard ? DASHBOARD_TITLE_STYLE : undefined,
        title
    );
}
