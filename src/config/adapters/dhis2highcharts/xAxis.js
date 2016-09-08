import isDefined from 'd2-utilizr/lib/isDefined';
import isString from 'd2-utilizr/lib/isString';

function getCategories(response) {
    let categories;
    const ids = response.metaData[layout.rows[0].dimension];

    if (isArray(ids) && ids.length) {
        categories = [];

        ids.forEach(id => {
            categories.push(response.metaData.names[id]);
        });
    }

    return categories;
}

function getTitle(layout) {
    return isString(layout.domainAxisTitle) ? {
        text: layout.domainAxisTitle
    } : undefined;
}

export default function getXAxis(layout, response) {
    const axis = {};

    // categories
    const categories = getCategories(response);

    if (isDefined(categories)) {
        axis.categories = categories;
    }

    // title
    const title = getTitle(layout);

    if (isDefined(title)) {
        axis.title = title;
    }

    return axis;
}
