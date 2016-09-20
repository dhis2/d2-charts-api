import H from 'highcharts';

// H.setOptions({
//     colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
// });

global.H = H;

export default function (config, el) {
    config.chart.renderTo = el || config.chart.renderTo;

console.log("configobj", config);

    return new H.Chart(config);
};
