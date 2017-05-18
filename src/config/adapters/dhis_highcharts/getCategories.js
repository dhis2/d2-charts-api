import isArray from 'd2-utilizr/lib/isArray';

export default function (store, layout) {
    const metaData = store.data.metaData;
    const dimensionName = layout.rows[0].dimension;

    const dimensionIds = isArray(metaData.dimensions[dimensionName]) ? metaData.dimensions[dimensionName] : [];

    return dimensionIds.map(id => metaData.items[id].name);
};


/*
let categories;

if (isArray(ids) && ids.length) {
    categories = [];

    ids.forEach(id => {
        categories.push(metaData.items[id].name);
    });
}

return categories;
*/