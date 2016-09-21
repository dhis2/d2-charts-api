import getCategories from '../getCategories';

export default function (series, store, layout, isStacked, colors) {
    return [{
        name: series[0].name,
        colorByPoint: true,
        allowPointSelect: true,
        cursor: 'pointer',
        data: getCategories(store, layout).map((category, index) => ({
            name: category,
            color: colors[index],
            y: series[0].data[index],
        })),
        dataLabels: {
            enabled: true,
            formatter: function() {
                return '<span style="font-weight:normal">' + this.point.name + '</span><br/>' + this.y + '<span style="font-weight:normal"> (' + this.percentage.toFixed(1) + ' %)</span>';
                return '<span style="font-weight:normal">' + this.point.name + '</span>: ' + this.y + '<span style="font-weight:normal"> (' + this.percentage.toFixed(1) + ' %)</span>';
            }
        }
    }];
}