import objectClean from 'd2-utilizr/lib/objectClean';
import getAxisTitle from '../getAxisTitle';
import getCategories from '../getCategories';
import getGauge from './gauge';
import getYearOnYear from './yearOnYear';
import { CHART_TYPE_GAUGE, CHART_TYPE_YEAR_OVER_YEAR_LINE } from '..';

function getDefault(store, layout) {
    return objectClean({
        categories: getCategories(store.data[0].metaData, layout),
        title: getAxisTitle(layout.domainAxisTitle),
        labels: {
            style: {
                color: '#666',
                textShadow: '0 0 #ccc',
            },
        },
    });
}

export default function(store, layout) {
    let xAxis;

    switch (layout.type) {
        case CHART_TYPE_GAUGE:
            xAxis = getGauge();
            break;
        case CHART_TYPE_YEAR_OVER_YEAR_LINE:
            xAxis = getYearOnYear(store, layout);
            break;
        default:
            xAxis = getDefault(store, layout);
    }

    return xAxis;
}
