import objectClean from 'd2-utilizr/lib/objectClean';
import getAxisTitle from '../getAxisTitle';
import getCategories from '../getCategories';
import getGauge from './gauge';
import { CHART_TYPE_GAUGE } from '..';

function getDefault(store, layout) {
    return objectClean({
        categories: getCategories(store, layout),
        title: getAxisTitle(layout.domainAxisTitle),
        labels: {
            style: {
                color: '#666',
                textShadow: '0 0 #ccc'
            }
        }
    });
}

export default function (store, layout) {
    let xAxis;

    switch(layout.type) {
        case CHART_TYPE_GAUGE:
            xAxis = getGauge();
            break;
        default:
            xAxis = getDefault(store, layout);
    }

    return xAxis;
}