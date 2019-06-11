const getDataByType = type => {
    switch(type) {
        case CHART_TYPE_SINGLE_VALUE:
        default:
            return getSingleValue;
    }
}

export default function({ type, data, seriesId, categoryId }) {
