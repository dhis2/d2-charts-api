import isInteger from 'd2-utilizr/lib/isInteger';
import numberDecimals from 'd2-utilizr/lib/numberDecimals';

export default function (series) {
<<<<<<< HEAD
    let cumulativeValues;

    series.forEach(seriesObj => {
        cumulativeValues = seriesObj.data.reduce((accumulator, value) => {
            if (accumulator.length > 0) {
                value += accumulator[accumulator.length - 1];
=======
    let decimals = 0;
    let cumulativeValues = [];

    series.forEach(seriesObj => {
        cumulativeValues = seriesObj.data.reduce((accumulator, value, index) => {
            decimals = Math.max(decimals, numberDecimals(value));

            if (index > 0) {
                value += accumulator[index - 1];
>>>>>>> ed691407b31210de6654f72aef63c9a9c838ee9c
            }

            accumulator.push(value);

            return accumulator;
        }, []);

        // round values to the largest number of decimals found in the serie
        // this is to avoid the floating-point problems in JavaScript
        // the condition in the return statement is because sometimes value can be null
        seriesObj.data = cumulativeValues.map(value => { return value ? parseFloat(value.toFixed(decimals)) : value });

        decimals = 0;
    });

    return series;
}
