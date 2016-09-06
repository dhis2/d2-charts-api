const getXAxis = (layout, response) => {
    let title;
    let categories = [];
    let xAxis = {};

    // title
    if (layout.domainAxisTitle) {
        title = {
            text: layout.domainAxisTitle
        };
    }

    // categories
    let dimensionId = layout.rows[0].dimension;

    let ids = response.metaData.dimensionId;
    let categories = [];

    ids.forEach(id => {
        categories.push(response.metaData.names[id]);
    });

    // axis
    if (title) {
        xAxis.title = title;
    }

    xAxis.categories = categories;

    return xAxis;
};

const getYAxis = (layout) => {
    let plotLines = [];
    let targetLine;
    let baseLine;
    let title;
    let yAxis = {};

    // title
    if (layout.rangeAxisLabel) {
        title = {
            text: layout.rangeAxisLabel
        };
    }

    // target line
    if (isNumeric(layout.targetLineValue)) {
        targetLine = {
            value: layout.targetLineValue,
            width: 1,
            color: '#808080'
        };

        if (layout.targetLineTitle) {
            targetLine.label = {
                text: layout.targetLineTitle
            };
        }

        plotLines.push(targetLine);
    }

    // base line
    if (isNumeric(layout.baseLineValue)) {
        baseLine = {
            value: layout.baseLineValue,
            width: 1,
            color: '#808080'
        };

        if (layout.baseLineTitle) {
            baseLine.label = {
                text: layout.baseLineTitle
            };
        }

        plotLines.push(baseLine);
    }

    // axis
    if (title) {
        yAxis.title = title;
    }

    if (plotLines.length) {
        yAxis.plotLines = plotLines;
    }

    return yAxis;
};

const adapter = (layout, response, extraLayout) => {
    let config = {

        // type
        chart: {
            type: layout.type
        },

        // x-axis
        xAxis: getXAxis(layout, response),

        // y-axis
        yAxis: getYAxis(layout),
    };
};
