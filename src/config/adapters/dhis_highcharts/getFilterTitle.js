export default function (layout, metaData) {
    let title = '';

    layout.filters.forEach((dimension, index, array) => {
        metaData[dimension.dimension].forEach((id, index, array) => {
            title += metaData.names[id] + (index < array.length - 1 ? ', ' : '');
        });

        title +=  (index < array.length - 1 ? ' - ' : '');
    });

    return title;
}
