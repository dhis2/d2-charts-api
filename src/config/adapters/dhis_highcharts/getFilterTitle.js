import isArray from 'd2-utilizr/lib/isArray';

export default function (layout, metaData) {
    let title = '';

    if (isArray(layout.filters)) {
        layout.filters.forEach((dimension, index, array) => {
            metaData.dimensions[dimension.dimension].forEach((id, index, array) => {
                title += metaData.items[id].name + (index < array.length - 1 ? ', ' : '');
            });

            title += (index < array.length - 1 ? ' - ' : '');
        });
    }

    return title;
}
