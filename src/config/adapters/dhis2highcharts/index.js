import isDefined from 'd2-utilizr/lib/isDefined';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';

export default function adapter(store, layout, response, extraLayout) {
    const config = {

        // type
        chart: {
            type: layout.type
        },

        // x-axis
        xAxis: getXAxis(layout, response),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store),


    };

    // title
    const title = getTitle(layout);

    if (isDefined(title)) {
        config.title = title;
    }

    return config;
}