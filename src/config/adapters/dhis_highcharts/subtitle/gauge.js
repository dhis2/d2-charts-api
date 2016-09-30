import getFilterTitle from '../getFilterTitle';

export default function (series, layout, metaData, dashboard, filterTitle) {
    const seriesName = series[0].name;
    const mergedTitle = seriesName + ' - ' + filterTitle;

    return {
        text: dashboard || isString(layout.title) ? mergedTitle : seriesName
    };
}