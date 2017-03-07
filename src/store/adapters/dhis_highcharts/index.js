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

console.log("seriesHeader", seriesHeader);
console.log("categoryHeader", categoryHeader);

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
    let key;
    let value;

    console.log("idValueMap", idValueMap);
    seriesIds.forEach(seriesId => {
        dataItem = {
            name: metaDataItems[seriesId].name,
            data: []
        };

        categoryIds.forEach(categoryId => {
            key = seriesId + '-' + categoryId;
            console.log("key", key);
            value = parseFloat(idValueMap.get(key)) || null;

            dataItem.data.push(value);
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
console.log("input data", data);
console.log("adapted store", getData(seriesIds, categoryIds, idValueMap, metaData.items));
    return getData(seriesIds, categoryIds, idValueMap, metaData.items);
}