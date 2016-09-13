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

function getData(seriesItems, categoryItems, idValueMap, metaDataNames) {
    const data = [];
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

        data.push(dataItem);
    });

    return data;
}

export default function ({ data, seriesId = data.headers[0].name, categoryId = data.headers[1].name }) {
    const headers = data.headers;
    const metaData = data.metaData;
    const rows = data.rows;
    const headerIdIndexMap = getHeaderIdIndexMap(headers);
    const valueId = 'value';

    const seriesIndex = headerIdIndexMap.get(seriesId);
    const categoryIndex = headerIdIndexMap.get(categoryId);
    const valueIndex = headerIdIndexMap.get(valueId);
    const seriesItems = metaData[seriesId];
    const categoryItems = metaData[categoryId];

    const idValueMap = getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex);

    return getData(seriesItems, categoryItems, idValueMap, metaData.names);
}
