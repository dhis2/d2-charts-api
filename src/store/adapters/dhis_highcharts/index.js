import isObject from 'd2-utilizr/lib/isObject';

const VALUE_ID = 'value';

function getHeaderIdIndexMap(headers) {
    const map = new Map();

    headers.forEach((header, index) => {
        map.set(header.name, index);
    });

    return map;
}

function getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex) {
    const map = {};
    let key;
    let value;

    rows.forEach(row => {
        key = row[seriesIndex] + '-' + row[categoryIndex];
        value = row[valueIndex];

        map[key] = value;
    });

    return map;
}

function getSortedCategoryItems(categoryItems, data, sorting) {
    console.log("categoryItems", categoryItems);
    console.log("data", data);
    console.log("sorting", sorting);
    return categoryItems;
}

function getDataObjects(seriesItems, categoryItems, idValueMap, metaDataNames) {
    const dataObjects = [];
    let dataItem;
    let key;
    let value;

    seriesItems.forEach(seriesItem => {
        dataItem = {
            name: metaDataNames[seriesItem],
            data: []
        };

        categoryItems.forEach(categoryItem => {
            key = seriesItem + '-' + categoryItem;
            value = parseFloat(idValueMap[key]) || null;

            dataItem.data.push(value);
        });

        dataObjects.push(dataItem);
    });

    return dataObjects;
}

function getData(seriesItems, categoryItems, idValueMap, metaDataNames, sorting) {
    let data = getDataObjects(seriesItems, categoryItems, idValueMap, metaDataNames);

    if (isObject(sorting)) {
        const sortedCategoryItems = getSortedCategoryItems(categoryItems, data, sorting);
        data = getDataObjects(seriesItems, sortedCategoryItems, idValueMap, metaDataNames);
    }

    return data;
}

export default function ({ data, seriesId = data.headers[0].name, categoryId = data.headers[1].name }) {
    const headers = data.headers;
    const metaData = data.metaData;
    const rows = data.rows;
    const headerIdIndexMap = getHeaderIdIndexMap(headers);

    const seriesIndex = headerIdIndexMap.get(seriesId);
    const categoryIndex = headerIdIndexMap.get(categoryId);
    const valueIndex = headerIdIndexMap.get(VALUE_ID);
    const seriesItems = metaData[seriesId];
    const categoryItems = metaData[categoryId];

    const idValueMap = getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex);

    return getData(seriesItems, categoryItems, idValueMap, metaData.names);
}