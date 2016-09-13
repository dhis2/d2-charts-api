import isDefined from 'd2-utilizr/lib/isDefined';
import objectClean from 'd2-utilizr/lib/objectClean';
import getXAxis from './xAxis';
import getYAxis from './yAxis';
import getSeries from './series';
import getTitle from './title';

export default function adapter({ el, layout, store, extraConfig }) {
    const config = {

        // type
        chart: objectClean({
            type: layout.type,
            renderTo: el || layout.el
        }),

        // title
        title: getTitle(layout),

        // x-axis
        xAxis: getXAxis(layout, store),

        // y-axis
        yAxis: getYAxis(layout),

        // series
        series: getSeries(store),

        // legend
        legend: getLegend(layout)
    };

    // force apply extra config
    Object.assign(config, extraConfig);

    return objectClean(config);
}
