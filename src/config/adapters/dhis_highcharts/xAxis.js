import isDefined from 'd2-utilizr/lib/isDefined';
import isString from 'd2-utilizr/lib/isString';

function getCategories(store) {
    let categories;
    const metaData = store.inputData.metaData;

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

export default function getXAxis(layout, store) {
    const axis = {
        categories: getCategories(store)
    };

    // title
    const title = getTitle(layout);

    if (isDefined(title)) {
        axis.title = title;
    }

    return axis;
}
