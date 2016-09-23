import getType from './type';

const DEFAULT_CHART = {
    fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif !important',
    spacingTop: 20
};

const DASHBOARD_CHART = {
    spacingTop: 0
};

export default function (layout, el, dashboard) {
    return Object.assign(
        {},
        getType(layout.type),
        { renderTo: el || layout.el },
        DEFAULT_CHART,
        (dashboard ? DASHBOARD_CHART : undefined)
    );
};