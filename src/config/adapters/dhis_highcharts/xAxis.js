import isDefined from 'd2-utilizr/lib/isDefined';
import isString from 'd2-utilizr/lib/isString';

function getCategories(store) {
    let categories;
    const metaData = store.data.metaData;

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
        categories: getCategories(store),
        title: getTitle(layout)
    });
}
