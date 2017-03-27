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

function getFirstLastValueIndexes(series) {
    let firstValueIndex = 0;
    let lastValueIndex = 0;
    let data = [];
    let i;

    series.forEach(seriesObj => {
        // make a copy of the array so we can reverse it
        // without affecting the original
        data = seriesObj.data.slice();

        i = data.findIndex(value => { return value != undefined });

        if (i > -1) {
            firstValueIndex = Math.min(firstValueIndex, i);
        }

        i = data.reverse().findIndex(value => { return value != undefined });

        if (i > -1) {
            lastValueIndex = Math.max(lastValueIndex, (data.length - 1 - i));
        }
    });

    return { firstValueIndex, lastValueIndex };
}

function cleanData(data, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows) {
    let cleanedData;

    switch (hideEmptyRows) {
        case 'ALL':
            cleanedData = arrayCleanUndefined(data.map((value, index) => arrayContains(emptySeriesIndexes, index) ? undefined : value));
            break;
        case 'BEFORE_FIRST':
            cleanedData = data.slice(firstValueIndex);
            break;
        case 'AFTER_LAST':
            cleanedData = data.slice(0, lastValueIndex + 1);
            break;
        case 'BEFORE_FIRST_AFTER_LAST':
            cleanedData = data.slice(firstValueIndex, lastValueIndex + 1);
            break;
        default:
            cleanedData = data;
    }

    return cleanedData;
}

function getTrimmedXAxisObject(xAxis, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows) {
    return {
        xAxis: {
            ...xAxis,
            categories: cleanData(xAxis.categories, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows)
        }
    };
}

function getTrimmedSeriesObject(series, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows) {
    return {
        series: series.map(seriesObj => ({
            ...seriesObj,
            data: cleanData(seriesObj.data, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows)
        }))
    };
}

export default function (config, hideEmptyRows) {
    const emptySeriesIndexes = getEmptySeriesIndexes(config.series);

    const { firstValueIndex, lastValueIndex } = getFirstLastValueIndexes(config.series);

    return emptySeriesIndexes.length && config.xAxis && config.series ?
        Object.assign({},
            config,
            getTrimmedXAxisObject(config.xAxis, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows),
            getTrimmedSeriesObject(config.series, emptySeriesIndexes, firstValueIndex, lastValueIndex, hideEmptyRows)
        ) : config;
}
