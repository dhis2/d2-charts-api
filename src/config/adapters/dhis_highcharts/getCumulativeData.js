export default function (series) {
    let cumulativeValues;

    series.forEach(seriesObj => {
        cumulativeValues = seriesObj.data.reduce((accumulator, value) => {
            if (accumulator.length > 0) {
                value += accumulator[accumulator.length - 1];
            }

            accumulator.push(value);

            return accumulator;
        }, []);

        seriesObj.data = cumulativeValues;
    });

    return series;
}
