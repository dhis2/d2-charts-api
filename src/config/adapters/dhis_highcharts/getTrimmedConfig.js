import arrayContains from 'd2-utilizr/lib/arrayContains';
import arrayUnique from 'd2-utilizr/lib/arrayUnique';

function arrayCleanUndefined(array) {
    var results = [];

    array.forEach(item => {
        if (item !== undefined) {
            results.push(item);
        }
    });

    return results;
}

function arrayNullsOnly(array) {
    return arrayContains(array, null) && arrayUnique(array).length === 1;
}

function getEmptySeriesIndexes(series) {
    const emptyIndexes = [];
    let seriesValues;

    series[0].data.forEach((value, index) => {
        seriesValues = [];

        series.forEach(seriesObj => {
            seriesValues.push(seriesObj.data[index]);
        });

        if (arrayNullsOnly(seriesValues)) {
            emptyIndexes.push(index);
        }
    });

    return emptyIndexes;
}

function getTrimmedXAxisObject(xAxis, emptySeriesIndexes) {
    return {
        xAxis: {
            ...xAxis,
            categories: arrayCleanUndefined(xAxis.categories.map((category, index) => arrayContains(emptySeriesIndexes, index) ? undefined : category))
        }
    };
}

function getTrimmedSeriesObject(series, emptySeriesIndexes) {
    return {
        series: series.map(seriesObj => ({
            ...seriesObj,
            data: arrayCleanUndefined(seriesObj.data.map((value, index) => arrayContains(emptySeriesIndexes, index) ? undefined : value))
        }))
    };
}

export default function (config) {
    const emptySeriesIndexes = getEmptySeriesIndexes(config.series);

    return emptySeriesIndexes.length && config.xAxis && config.series ?
        Object.assign({}, config, getTrimmedXAxisObject(config.xAxis, emptySeriesIndexes), getTrimmedSeriesObject(config.series, emptySeriesIndexes)) : config;
}