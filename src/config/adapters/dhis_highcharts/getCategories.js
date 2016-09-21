import isArray from 'd2-utilizr/lib/isArray';

export default function (store, layout) {
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
