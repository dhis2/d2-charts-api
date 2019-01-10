export default function(acc, seriesIds, categoryIds, idValueMap, metaData) {
    const seriesId = seriesIds[0];

    acc.push({
        name: metaData.items[seriesId].name,
        data: [parseFloat(idValueMap.get(seriesId))],
    });
}