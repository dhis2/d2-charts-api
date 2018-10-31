import getYearOnYear from './yearOnYear';
import { CHART_TYPE_YEAR_ON_YEAR } from '../../../config/adapters/dhis_highcharts';

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

function getDefault(acc, seriesIds, categoryIds, idValueMap, metaData) {
    seriesIds.forEach(seriesId => {
        const serieData = [];
        const serieLabel = metaData.items[seriesId].name;

        categoryIds.forEach(categoryId => {
            const value = idValueMap.get(`${seriesId}-${categoryId}`);

            // DHIS2-1261: 0 is a valid value
            // undefined value means the key was not found within the rows
            // in that case null is returned as value in the serie for highcharts
            serieData.push(value == undefined ? null : parseFloat(value));
        });

        acc.push({
            name: serieLabel,
            data: serieData,
        });
    });

    return acc;
}

export default function({ type, data, seriesId, categoryId }) {
    const seriesFunction = type === CHART_TYPE_YEAR_ON_YEAR ? getYearOnYear : getDefault;

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

        seriesFunction(acc, seriesIds, categoryIds, idValueMap, metaData);

        return acc;
    }, []);
}
