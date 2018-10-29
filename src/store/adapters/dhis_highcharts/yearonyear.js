const VALUE_ID = 'value';

export default function(acc, seriesIds, categoryIds, idValueMap, metaData) {
    /*
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
*/
    const serieData = [];
    let serieLabel;

    seriesIds.forEach(seriesId => {
        serieLabel = metaData.items[seriesId].name;

        categoryIds.forEach(categoryId => {
            const value = idValueMap.get(`${seriesId}-${categoryId}`);

            // DHIS2-1261: 0 is a valid value
            // undefined value means the key was not found within the rows
            // in that case null is returned as value in the serie for highcharts
            serieData.push(value == undefined ? null : parseFloat(value));
        });
    });

    acc.push({
        name: serieLabel,
        data: serieData,
    });

    return acc;
}
