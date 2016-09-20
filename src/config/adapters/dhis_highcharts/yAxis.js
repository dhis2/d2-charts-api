import arrayClean from 'd2-utilizr/lib/arrayClean';
import objectClean from 'd2-utilizr/lib/objectClean';
import isNumeric from 'd2-utilizr/lib/isNumeric';
import isString from 'd2-utilizr/lib/isString';

const DEFAULT_MIN_VALUE = 0;

const DEFAULT_GRIDLINE_COLOR = '#E1E1E1';

const DEFAULT_PLOTLINE = {
    width: 2,
    color: '#000',
    zIndex: 4
};

const DEFAULT_PLOTLINE_LABEL = {
    y: -7,
    style: {
        fontSize: 13
    }
};

function getMinValue(layout) {
    return isNumeric(layout.rangeAxisMinValue) ? layout.rangeAxisMinValue : DEFAULT_MIN_VALUE;
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
    return isNumeric(layout.targetLineValue) ? Object.assign({}, DEFAULT_PLOTLINE, objectClean({
        value: layout.targetLineValue,
        label: isString(layout.targetLineTitle) ? Object.assign({}, DEFAULT_PLOTLINE_LABEL, {
            text: layout.targetLineTitle
        }) : undefined
    })) : undefined;
}

function getBaseLine(layout) {
    return isNumeric(layout.baseLineValue) ? Object.assign({}, DEFAULT_PLOTLINE, objectClean({
        value: layout.baseLineValue,
        label: isString(layout.baseLineTitle) ? Object.assign({}, DEFAULT_PLOTLINE_LABEL, {
            text: layout.baseLineTitle,
        }) : undefined
    })) : undefined;
}

export default function (layout) {
    return objectClean({
        min: getMinValue(layout),
        max: getMaxValue(layout),
        tickAmount: getSteps(layout),
        //decimals: getDecimals(layout),
        title: getTitle(layout),
        plotLines: arrayClean([getTargetLine(layout), getBaseLine(layout)]),
        gridLineColor: DEFAULT_GRIDLINE_COLOR
    });
}
