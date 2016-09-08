import isString from 'd2-utilizr/lib/isString';

function getCategories(response) {
    const ids = response.metaData[layout.rows[0].dimension];
    const categories = [];

    ids.forEach(id => {
        categories.push(response.metaData.names[id]);
    });

    return categories;
}

function getTitle(layout) {
    const title;

    if (isString(layout.domainAxisTitle)) {
        title = {
            text: layout.domainAxisTitle
        };
    }

    return title;
}

export default function getXAxis(layout, response) {
    return {
        categories: getCategories(response),
        title: getTitle(layout)
    };
}
