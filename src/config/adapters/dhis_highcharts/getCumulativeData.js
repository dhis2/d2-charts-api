export default function (series) {
    series.forEach(seriesObj => {
        const cumulativeValues = seriesObj.data.reduce((accumulator, value) => {
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
