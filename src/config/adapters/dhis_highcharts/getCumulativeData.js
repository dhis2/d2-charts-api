export default function (series) {
    let cumulativeValues = [];

    series.forEach(seriesObj => {
        cumulativeValues = seriesObj.data.reduce((accumulator, value, index) => {
            if (index > 0) {
                value += accumulator[index - 1];
            }

            accumulator.push(value);

            return accumulator;
        }, []);

        seriesObj.data = cumulativeValues;
    });

    return series;
}
