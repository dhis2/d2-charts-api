const VALUE_ID = 'value';

function getHeaderIdIndexMap(headers) {
    const map = new Map();

    headers.forEach((header, index) => {
        map.set(header.name, index);
    });

    return map;
}

function getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex) {
    const map = new Map();
    let key;
    let value;

    rows.forEach(row => {
        key = row[seriesIndex] + '-' + row[categoryIndex];
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

    seriesIds.forEach(seriesId => {
        dataItem = {
            name: metaDataItems[seriesId].name,
            data: []
        };

        categoryIds.forEach(categoryId => {
            key = seriesId + '-' + categoryId;
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

    const idValueMap = getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex);

    const seriesIds = metaData.dimensions[seriesDimensionName];
    const categoryIds = metaData.dimensions[categoryDimensionName];
console.log("input data", data);
console.log("adapted store", getData(seriesIds, categoryIds, idValueMap, metaData.items));
    return getData(seriesIds, categoryIds, idValueMap, metaData.items);
}