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

function getData(seriesItems, categoryItems, idValueMap, metaDataNames) {
    const data = [];
    let dataItem;
    let value;

    seriesItems.forEach(seriesItem => {
        dataItem = {
            name: metaDataNames[seriesItem],
            data: []
        };

        categoryItems.forEach(categoryItem => {
            value = idValueMap.get(`${ seriesItem }-${ categoryItem }`);

            // DHIS2-1261: 0 is a valid value
            // undefined value means the key was not found within the rows
            // in that case null is returned as value in the serie for highcharts
            dataItem.data.push((value === undefined) ? null : parseFloat(value));
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

    const seriesIndex = headerIdIndexMap.get(seriesId);
    const categoryIndex = headerIdIndexMap.get(categoryId);
    const valueIndex = headerIdIndexMap.get(VALUE_ID);
    const seriesItems = metaData[seriesId];
    const categoryItems = metaData[categoryId];

    const idValueMap = getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex);

    return getData(seriesItems, categoryItems, idValueMap, metaData.names);
}
