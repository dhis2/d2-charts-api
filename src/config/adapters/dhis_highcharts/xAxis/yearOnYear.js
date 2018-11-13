export default function(store, layout, extraOptions) {
    let categories;

    if (extraOptions.xAxisLabels) {
        categories = extraOptions.xAxisLabels;
    } else {
        let res;

        // look for the response with the longer list of periods.
        // in some cases (ie. weeks per year) responses might have a different number of periods in metadata
        store.data.forEach(r => {
            if (res) {
                res = r.metaData.dimensions.pe.length > res.metaData.dimensions.pe.length ? r : res;
            } else {
                res = r;
            }
        });

        const metaData = res.metaData;

        categories = metaData.dimensions.pe.reduce((categories, periodId) => {
            // TODO use shortName or pass extra option to the request for getting short names in name prop
            categories.push(metaData.items[periodId].name);
            return categories;
        }, []);
    }

    return {
        categories,
    };
}
