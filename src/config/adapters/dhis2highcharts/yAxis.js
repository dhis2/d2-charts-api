import arrayClean from 'd2-utilizr/lib/arrayClean';
import isNumeric from 'd2-utilizr/lib/isNumeric';
import isString from 'd2-utilizr/lib/isString';

const DEFAULT_MIN_VALUE = 0;

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
            color: '#333'
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
            color: '#333'
        };

        if (isString(layout.baseLineTitle)) {
            baseLine.label = {
                text: layout.baseLineTitle
            };
        }
    }

    return baseLine;
}

export default function getYAxis(layout) {
    const yAxis = {
        min: getMinValue(layout)
    };

    // max value
    const maxValue = getMaxValue(layout);

    if (isDefined(maxValue)) {
        yAxis.max = maxValue;
    }

    // tick steps
    const steps = getSteps(layout);

    if (isDefined(amount)) {
        yAxis.tickAmount = steps;
    }

    // decimals
    const decimals = getDecimals(layout);

    if (isDefined(amount)) {
        yAxis.tickAmount = amount;
    }

    // title
    const title = getTitle(layout);

    if (isDefined(title)) {
        yAxis.title = title;
    }

    // target/base line
    const lines = arrayClean([getTargetLine(layout), getBaseLine(layout)]);

    if (lines.length) {
        yAxis.plotLines = lines;
    }





    // title
    const title = getTitle(layout);

    if (isDefined(title)) {
        yAxis.title = title;
    }

    // target/base line
    const targetLine = getTargetLine(layout);

    if (targetLine)
        plotLines: arrayClean([getTargetLine(layout), getBaseLine(layout)])
    };

    //
}
