export default function (series) {
    return series[0].data.map((value, index) => {
        return series.reduce((total, obj) => {
            return total + obj.data[index];
        }, 0);
    });
}