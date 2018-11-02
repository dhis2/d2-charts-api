import getFilterTitle from '../getFilterTitle';

export default function(layout, metaData, dashboard) {
    const titleParts = [];

    if (layout.columns && !dashboard) {
        titleParts.push(getFilterTitle(layout.columns, metaData));
    }

    if (layout.filters && !dashboard) {
        titleParts.push(getFilterTitle(layout.filters, metaData));
    }

    return titleParts.length ? titleParts.join(' - ') : null;
}
