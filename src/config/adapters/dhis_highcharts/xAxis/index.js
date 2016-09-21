import isArray from 'd2-utilizr/lib/isArray';
import isString from 'd2-utilizr/lib/isString';
import objectClean from 'd2-utilizr/lib/objectClean';
import getAxisTitle from './getAxisTitle';
import getGauge from './gauge';
import { CHART_TYPE_GAUGE } from '..';

function getCategories(store, layout) {
    const metaData = store.data.metaData;
    let categories;

    const ids = metaData[layout.rows[0].dimension];

    if (isArray(ids) && ids.length) {
        categories = [];

        ids.forEach(id => {
            categories.push(metaData.names[id]);
        });
    }

    return categories;
}

function getDefault(store, layout) {
    return objectClean({
        categories: getCategories(store, layout),
        title: getAxisTitle(layout.domainAxisTitle),
    });
}

export default function (store, layout) {
    let xAxis;

    switch(layout.type) {
        case CHART_TYPE_GAUGE:
            xAxis = getGauge(layout);
            break;
        default:
            xAxis = getDefault(layout);
    }

    return xAxis;
}