const DEFAULT_FONT_SIZE = '13px';

const DASHBOARD_FONT_SIZE = '10px';

export default function (layout, dashboard) {
    const fontSize = dashboard ? DASHBOARD_FONT_SIZE : DEFAULT_FONT_SIZE;

    return layout.hideLegend ? {
        enabled: false
    } : {
        symbolWidth: 11,
        symbolHeight: 11,
        itemMarginBottom: 1,
        itemStyle: {
            fontSize: fontSize,
            fontWeight: 'normal'
        }
    };
}
