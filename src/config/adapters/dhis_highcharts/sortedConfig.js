import arrayPluck from 'd2-utilizr/lib/arrayPluck';
import arraySort from 'd2-utilizr/lib/arraySort';

const sortOrderMap = new Map([
    [-1, 'ASC'],
    [1, 'DESC']
]);

function getStackedData(series) {
    return series[0].data.map((value, index) => {
        return series.reduce((total, obj) => {
            return total + obj.data[index];
        }, 0);
    });
}

function getIndexOrder(config, isStacked, direction) {
    const dataToBeSorted = isStacked ? getStackedData(config.series) : config.series[0].data.slice();
    const dataObjectsToBeSorted = dataToBeSorted.map((value, index) => ({ index, value }));

    arraySort(dataObjectsToBeSorted, direction, 'value');

    return arrayPluck(dataObjectsToBeSorted, 'index');
}

function getSortedConfig(config, isStacked, direction) {
    const categories = config.xAxis.categories;
    const series = config.series;
    const indexOrder = getIndexOrder(config, isStacked, direction);
    const sortedConfig = Object.assign({}, config);

    sortedConfig.xAxis.categories = indexOrder.map(index => categories[index]);
    sortedConfig.series = series.map(seriesObj => ({
        ...seriesObj,
        data: seriesObj.data.map((value, index) => seriesObj.data[indexOrder[index]])
    }));

    return sortedConfig;
}

export default function (config, layout) {
    const isStacked = layout.type.toLowerCase().indexOf('stacked') !== -1;
    const direction = sortOrderMap.get(parseInt(layout.sortOrder));

    return getSortedConfig(config, isStacked, direction);
}
