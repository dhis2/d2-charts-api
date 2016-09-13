import isArray from 'd2-utilizr/lib/isArray';
import isString from 'd2-utilizr/lib/isString';
import objectClean from 'd2-utilizr/lib/objectClean';

function getCategories(layout, store) {
    const metaData = store.data.metaData;
    let categories;

    const ids = metaData[layout.rows[0].dimension];

    if (isArray(ids) && ids.length) {
        categories = [];

        ids.forEach(id => {
            categories.push(metaData.names[id]);
        });
    }

    return categories;
}

function getTitle(layout) {
    return isString(layout.domainAxisTitle) ? {
        text: layout.domainAxisTitle
    } : undefined;
}

export default function (layout, store) {
    return objectClean({
        categories: getCategories(layout, store),
        title: getTitle(layout)
    });
}
