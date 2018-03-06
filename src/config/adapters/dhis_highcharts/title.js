import isString from 'd2-utilizr/lib/isString';
import getFilterTitle from './getFilterTitle';

const DEFAULT_TITLE_STYLE = {
    margin: 30,
    y: 18,
    style: {
        color: '#111'
    }
};

const DASHBOARD_TITLE_STYLE = {
    margin: 15,
    y: 12,
    style: {
        fontSize: '13px',
        fontWeight: 'bold'
    }
};

function getText(layout, metaData, dashboard) {

    // title
    if (isString(layout.title) && layout.title.length) {
        return layout.title;
    }

    // name - REMOVED: APPS SHOULD HANDLE THIS
    // if (dashboard && (isString(layout.name) && layout.name.length)) {
    //     return layout.name;
    // }

    // filters
    if (layout.filters && !dashboard) {
        return getFilterTitle(layout.filters, metaData);
    }

    return null;
}

function getTextObject(layout, metaData, dashboard) {
    return {
        text: layout.hideTitle ? null : getText(layout, metaData, dashboard)
    };
}

export default function (layout, metaData, dashboard) {
    return Object.assign(
        getTextObject(layout, metaData, dashboard),
        DEFAULT_TITLE_STYLE,
        dashboard ? DASHBOARD_TITLE_STYLE : undefined
    );
};
