import isArray from 'd2-utilizr/lib/isArray';

export default function (filters, metaData) {
    let title;

    if (isArray(filters) && filters.length) {
        title = '';

        let filterItems,
            filterItemsIndex;

        filters.forEach((dimension, index, array) => {
            filterItems = metaData.dimensions[dimension.dimension];
            filterItemsIndex = 0;

            if (isArray(filterItems)) {
                for (let id of filterItems) {
                    // if the value is present in items take the name to show from there
                    if (metaData.items[id]) {
                        title += metaData.items[id].name + (filterItemsIndex < filterItems.length - 1 ? ', ' : '');
                    }
                    // otherwise use the values directly
                    // this is a temporary fix to avoid app crashing when using filters with data items in EV
                    else {
                        title += metaData.items[dimension.dimension].name + ': ' + filterItems.join(', ');

                        break;
                    }

                    filterItemsIndex++;
                }

                title += (index < array.length - 1 ? ' - ' : '');
            }
        });
    }

    return title || null;
}
