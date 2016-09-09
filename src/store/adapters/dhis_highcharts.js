const adapter = (response, seriesId = response.headers[0].name, categoryId = response.headers[1].name) => {
    const valueId = 'value';

    const headers = response.headers;
    const metaData = response.metaData;
    const rows = response.rows;

    const headerIdIndexMap = (() => {
        let map = new Map();

        headers.forEach((header, index) => {
            map.set(header.name, index);
        });

        return map;
    })();

    const seriesItems = metaData[seriesId];
    const categoryItems = metaData[categoryId];

    const seriesIndex = headerIdIndexMap.get(seriesId);
    const categoryIndex = headerIdIndexMap.get(categoryId);
    const valueIndex = headerIdIndexMap.get(valueId);

    const idValueMap = (() => {
        let map = {};
        let key;
        let value;

        rows.forEach(row => {
            key = row[seriesIndex] + '-' + row[categoryIndex];
            value = row[valueIndex];

            map[key] = value;
        });

        return map;
    })();

    let data = [];
    let dataItem;
    let key;
    let value;

    seriesItems.forEach(seriesItem => {
        dataItem = {
            name: metaData.names[seriesItem],
            data: []
        };

        categoryItems.forEach(categoryItem => {
            key = seriesItem + '-' + categoryItem;
            value = idValueMap[key] || null;

            dataItem.data.push(value);
        });

        data.push(dataItem);
    });

    return data;
};

export default adapter;
