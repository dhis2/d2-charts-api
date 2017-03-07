import isString from 'd2-utilizr/lib/isString';

export default function (series, layout, dashboard, filterTitle) {
    const seriesName = series[0].name;

    const mergedTitle = seriesName + ' - ' + filterTitle;

    return {
        text: dashboard || isString(layout.title) ? mergedTitle : seriesName
    };
}