export default function(store, layout) {
    // use the first response, as the "short name" will be the same in all responses
    const categories = Object.values(store.data[0].metaData.items).reduce((categories, item) => {
        // TODO use shortName or pass extra option to the request for getting short names in name prop
        categories.push(item.name);
        return categories;
    }, []);

    return {
        categories,
    };
}
