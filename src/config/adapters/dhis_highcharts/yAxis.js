import arrayClean from 'd2-utilizr/lib/arrayClean';
import objectClean from 'd2-utilizr/lib/objectClean';
import isNumeric from 'd2-utilizr/lib/isNumeric';
import isString from 'd2-utilizr/lib/isString';

const DEFAULT_MIN_VALUE = 0;
const PLOTLINE_ZINDEX = 4;
const PLOTLINE_LABEL_Y = -7;

function getMinValue(layout) {
    return isNumeric(layout.rangeAxisMaxValue) ? layout.rangeAxisMaxValue : DEFAULT_MIN_VALUE;
}

function getMaxValue(layout) {
    return isNumeric(layout.rangeAxisMaxValue) ? layout.rangeAxisMaxValue : undefined;
}

function getSteps(layout) {
    return isNumeric(layout.rangeAxisSteps) ? layout.rangeAxisSteps : undefined;
}

function getDecimals(layout) {
    return isNumeric(layout.rangeAxisDecimals) ? layout.rangeAxisDecimals : undefined;
}

function getTitle(layout) {
    return isString(layout.rangeAxisTitle) ? {
        text: layout.rangeAxisTitle
    } : undefined;
}

function getTargetLine(layout) {
    return isNumeric(layout.targetLineValue) ? objectClean({
        value: layout.targetLineValue,
        width: 1,
        color: '#333',
        zIndex: PLOTLINE_ZINDEX,
        label: isString(layout.targetLineTitle) ? {
            text: layout.targetLineTitle,
            y: PLOTLINE_LABEL_Y
        } : undefined
    }) : undefined;
}

function getBaseLine(layout) {
    return isNumeric(layout.baseLineValue) ? objectClean({
        value: layout.baseLineValue,
        width: 1,
        color: '#333',
        zIndex: PLOTLINE_ZINDEX,
        label: isString(layout.baseLineTitle) ? {
            text: layout.baseLineTitle,
            y: PLOTLINE_LABEL_Y
        } : undefined
    }) : undefined;
}

export default function (layout) {
    return objectClean({
        min: getMinValue(layout),
        max: getMaxValue(layout),
        tickAmount: getSteps(layout),
        //decimals: getDecimals(layout),
        title: getTitle(layout),
        plotLines: arrayClean([getTargetLine(layout), getBaseLine(layout)])
    });
}
