export default function(acc, seriesIds, categoryIds, idValueMap, metaData) {
    acc.push(...categoryIds.map(categoryId => ({
        name: metaData.items[categoryId].name,
        y: parseFloat(idValueMap.get(categoryId)),
    })));
}