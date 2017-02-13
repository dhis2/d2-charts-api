import numberConstrain from 'd2-utilizr/lib/numberConstrain';

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

function getData(seriesItems, categoryItems, idValueMap, metaDataNames, extraOptions = {}) {
    const data = [];
    let dataItem;
    let key;
    let value;

    seriesItems.forEach(seriesItem => {
        dataItem = {
            name: metaDataNames[seriesItem].name,
            data: []
        };

        categoryItems.forEach(categoryItem => {
            key = seriesItem + '-' + categoryItem;
            value = parseFloat(idValueMap.get(key)) || null;

            let item = { y: value };

            if (extraOptions.legendSet && extraOptions.appManager) {
                const legends = extraOptions.legendSet.legends;

                for (var i = 0; i < legends.length; i++) {
                    if (numberConstrain(value, legends[i].startValue, legends[i].endValue) === value) {
                        item.color = legends[i].color;
                    }
                }
            }

            dataItem.data.push(item);
        });

        data.push(dataItem);
    });

    return data;
}

export default function ({ data, seriesId = data.headers[0].name, categoryId = data.headers[1].name, extraOptions }) {
    const headers = data.headers;
    const metaData = data.metaData;
    const rows = data.rows;
    const headerIdIndexMap = getHeaderIdIndexMap(headers);

    const seriesIndex = headerIdIndexMap.get(seriesId);
    const categoryIndex = headerIdIndexMap.get(categoryId);
    const valueIndex = headerIdIndexMap.get(VALUE_ID);
    const seriesItems = metaData.dimensions[seriesId];
    const categoryItems = metaData.dimensions[categoryId];

    const idValueMap = getIdValueMap(rows, seriesIndex, categoryIndex, valueIndex);

    return getData(seriesItems, categoryItems, idValueMap, metaData.items, extraOptions);
}