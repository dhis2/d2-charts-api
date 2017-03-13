import isArray from 'd2-utilizr/lib/isArray';

export default function (filters, metaData) {
    let title;

    if (isArray(filters) && filters.length) {
        title = '';

        filters.forEach((dimension, index, array) => {
            metaData.dimensions[dimension.dimension].forEach((id, index, array) => {
                title += metaData.items[id].name + (index < array.length - 1 ? ', ' : '');
            });

            title += (index < array.length - 1 ? ' - ' : '');
        });
    }

    return title || null;
}
