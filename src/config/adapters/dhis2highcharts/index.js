import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getTitle from './title';

export default function adapter(layout, response, extraLayout) {
    return {

        // type
        chart: {
            type: layout.type
        },

        // title
        title: getTitle(layout),

        // x-axis
        xAxis: getXAxis(layout, response),

        // y-axis
        yAxis: getYAxis(layout)
    };
}
