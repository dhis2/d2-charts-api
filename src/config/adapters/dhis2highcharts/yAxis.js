import arrayClean from 'd2-utilizr/lib/arrayClean';
import isNumeric from 'd2-utilizr/lib/isNumeric';
import isString from 'd2-utilizr/lib/isString';

function getTitle(layout) {
    const title;

    if (isString(layout.rangeAxisTitle)) {
        title = {
            text: layout.rangeAxisTitle
        };
    }

    return title;
}

function getTargetLine(layout) {
    const targetLine;

    if (isNumeric(layout.targetLineValue)) {
        targetLine = {
            value: layout.targetLineValue,
            width: 1,
            color: '#808080'
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
    const baseLine;

    if (isNumeric(layout.baseLineValue)) {
        baseLine = {
            value: layout.baseLineValue,
            width: 1,
            color: '#808080'
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
    return {
        title: getTitle(layout),
        plotLines: arrayClean([getTargetLine(layout), getBaseLine(layout)])
    };
}
