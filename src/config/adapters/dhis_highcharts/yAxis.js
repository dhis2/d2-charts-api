import arrayClean from 'd2-utilizr/lib/arrayClean';
import objectClean from 'd2-utilizr/lib/objectClean';
import isNumeric from 'd2-utilizr/lib/isNumeric';
import isString from 'd2-utilizr/lib/isString';

const DEFAULT_MIN_VALUE = 0;
const PLOTLINE_ZINDEX = 4;

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

function getTargetLine(layout) {
    let targetLine;

    if (isNumeric(layout.targetLineValue)) {
        targetLine = {
            value: layout.targetLineValue,
            width: 1,
            color: '#333',
            zIndex: PLOTLINE_ZINDEX
        };

        if (isString(layout.targetLineTitle)) {
            targetLine.label = {
                text: layout.targetLineTitle
            };
        }
    }

    return targetLine;
}

function getBaseLine(layout) {
    let baseLine;

    if (isNumeric(layout.baseLineValue)) {
        baseLine = {
            value: layout.baseLineValue,
            width: 1,
            color: '#333',
            zIndex: PLOTLINE_ZINDEX
        };

        if (isString(layout.baseLineTitle)) {
            baseLine.label = {
                text: layout.baseLineTitle
            };
        }
    }

    return baseLine;
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
