import isString from 'd2-utilizr/lib/isString';

const DEFAULT_PROPS = {
    margin: 30,
    y: 18
};

function getFilterTitle(layout, names) {
    let title = '';

    layout.filters.forEach((dimension, index, array) => {
        dimension.items.forEach((item, index, array) => {
            title += names[item.id] + (index < array.length - 1 ? ', ' : '');
        });

        title +=  (index < array.length - 1 ? ' - ' : '');
    });

    return title;
}

function getText(layout, names) {
    return isString(layout.title) ? layout.title : (layout.filters ? getFilterTitle(layout, names) : null);
}

function getTextObject(layout, names) {
    return {
        text: layout.hideTitle ? null : getText(layout, names)
    };
}

export default function (layout, names) {
    return Object.assign(getTextObject(layout, names), DEFAULT_PROPS);
}