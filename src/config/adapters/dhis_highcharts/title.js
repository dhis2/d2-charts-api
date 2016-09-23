import isString from 'd2-utilizr/lib/isString';

const DEFAULT_TITLE = {
    margin: 30,
    y: 18,
    style: {
        color: '#111'
    }
};

const DASHBOARD_TITLE = {
    margin: 15,
    y: 12,
    style: {
        fontSize: '13px',
        fontWeight: 'bold'
    }
};

function getFilterTitle(layout, metaData) {
    let title = '';

    layout.filters.forEach((dimension, index, array) => {
        metaData[dimension.dimension].forEach((id, index, array) => {
            title += metaData.names[id] + (index < array.length - 1 ? ', ' : '');
        });

        title +=  (index < array.length - 1 ? ' - ' : '');
    });

    return title;
}

function getText(layout, metaData) {
    return isString(layout.title) ? layout.title : (layout.filters ? getFilterTitle(layout, metaData) : null);
}

function getTextObject(layout, metaData) {
    return {
        text: layout.hideTitle ? null : getText(layout, metaData)
    };
}

export default function (layout, metaData, dashboard) {
    return Object.assign(getTextObject(layout, metaData), DEFAULT_TITLE, dashboard ? DASHBOARD_TITLE : undefined);
}