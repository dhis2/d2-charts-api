import isString from 'd2-utilizr/lib/isString';

const DEFAULT_TITLE = '';

function getFilterTitle(layout, names) {
    let title = DEFAULT_TITLE;

    layout.filters.forEach((dimension, index, array) => {
        dimension.items.forEach((item, index, array) => {
            title += names[item.id] + (index < array.length - 1 ? ', ' : '');
        });

        title +=  (index < array.length - 1 ? ' - ' : '');
    });

    return title;
}

export default function (layout, names) {
    return layout.hideTitle ? undefined : {
        text: isString(layout.title) ? layout.title : (layout.filters ? getFilterTitle(layout, names) : DEFAULT_TITLE)
    };
}