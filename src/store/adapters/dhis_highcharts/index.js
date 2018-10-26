const VALUE_ID = 'value';

function getHeaderIdIndexMap(headers) {
    const map = new Map();

    headers.forEach((header, index) => {
        map.set(header.name, index);
    });

    return map;
}

function getPrefixedId(row, header) {
    return (header.isPrefix ? header.name + '_' : '') + row[header.index];
}

function getIdValueMap(rows, seriesHeader, categoryHeader, valueIndex) {
    const map = new Map();

    let key;
    let value;

    rows.forEach(row => {
        key = getPrefixedId(row, seriesHeader) + '-' + getPrefixedId(row, categoryHeader);
        value = row[valueIndex];

        map.set(key, value);
    });

    return map;
}

function getData(seriesIds, categoryIds, idValueMap, metaDataItems) {
    const data = [];
    let dataItem;
    let value;

    seriesIds.forEach(seriesId => {
        dataItem = {
            name: metaDataItems[seriesId].name,
            data: [],
        };

        categoryIds.forEach(categoryId => {
            value = idValueMap.get(`${seriesId}-${categoryId}`);

            // DHIS2-1261: 0 is a valid value
            // undefined value means the key was not found within the rows
            // in that case null is returned as value in the serie for highcharts
            dataItem.data.push(value == undefined ? null : parseFloat(value));
        });

        data.push(dataItem);
    });

    return data;
}

export default function({ data, seriesId, categoryId }) {
    return data.reduce((acc, res) => {
        seriesId = seriesId || res.headers[0].name;
        categoryId = categoryId || res.headers[1].name;

        const headers = res.headers;
        const metaData = res.metaData;
        const rows = res.rows;
        const headerIdIndexMap = getHeaderIdIndexMap(headers);

        const seriesIndex = headerIdIndexMap.get(seriesId);
        const categoryIndex = headerIdIndexMap.get(categoryId);
        const valueIndex = headerIdIndexMap.get(VALUE_ID);

        const seriesHeader = headers[seriesIndex];
        const categoryHeader = headers[categoryIndex];

        const idValueMap = getIdValueMap(rows, seriesHeader, categoryHeader, valueIndex);

        const seriesIds = metaData.dimensions[seriesId];
        const categoryIds = metaData.dimensions[categoryId];

        const d = getData(seriesIds, categoryIds, idValueMap, metaData.items);

        acc.push(...d);

        return acc;
    }, []);
}
