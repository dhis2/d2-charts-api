const VALUE_ID = 'value';

function getHeaderIdIndexMap(headers) {
    const map = new Map();

    headers.forEach((header, index) => {
        map.set(header.name, index);
    });

    return map;
}

function getPrefixedId(row, header) {
    return (header.isPrefix ? (header.name + '_') : '') + row[header.index];
}

function getIdValueMap(rows, seriesHeader, categoryHeader, valueIndex) {
    const map = new Map();

    let key;
    let value;

    rows.forEach(row => {
        key = getPrefixedId(row, seriesHeader) + '-' + getPrefixedId(row, categoryHeader);
        value = row[valueIndex];

        map.set(key, value);
    });

    return map;
}

function getData(seriesIds, categoryIds, idValueMap, metaDataItems) {
    const data = [];
    let dataItem;
    let value;

    seriesIds.forEach(seriesId => {
        dataItem = {
            name: metaDataItems[seriesId].name,
            data: []
        };

<<<<<<< HEAD
        categoryIds.forEach(categoryId => {
            key = seriesId + '-' + categoryId;

            value = parseFloat(idValueMap.get(key)) || null;
=======
        categoryItems.forEach(categoryItem => {
            value = idValueMap.get(`${ seriesItem }-${ categoryItem }`);
>>>>>>> ed691407b31210de6654f72aef63c9a9c838ee9c

            // DHIS2-1261: 0 is a valid value
            // undefined value means the key was not found within the rows
            // in that case null is returned as value in the serie for highcharts
            dataItem.data.push((value === undefined) ? null : parseFloat(value));
        });

        data.push(dataItem);
    });

    return data;
}

export default function ({ data, seriesDimensionName = data.headers[0].name, categoryDimensionName = data.headers[1].name }) {
    const headers = data.headers;
    const metaData = data.metaData;
    const rows = data.rows;
    const headerIdIndexMap = getHeaderIdIndexMap(headers);

    const seriesIndex = headerIdIndexMap.get(seriesDimensionName);
    const categoryIndex = headerIdIndexMap.get(categoryDimensionName);
    const valueIndex = headerIdIndexMap.get(VALUE_ID);

    const seriesHeader = headers[seriesIndex];
    const categoryHeader = headers[categoryIndex];

    const idValueMap = getIdValueMap(rows, seriesHeader, categoryHeader, valueIndex);

    const seriesIds = metaData.dimensions[seriesDimensionName];
    const categoryIds = metaData.dimensions[categoryDimensionName];

<<<<<<< HEAD
    return getData(seriesIds, categoryIds, idValueMap, metaData.items);
}
=======
    return getData(seriesItems, categoryItems, idValueMap, metaData.names);
}
>>>>>>> ed691407b31210de6654f72aef63c9a9c838ee9c
