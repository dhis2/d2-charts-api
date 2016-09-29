const DEFAULT_FONT_SIZE = '11px';

const DASHBOARD_FONT_SIZE = '10px';

export default function (layout, dashboard) {
    const fontSize = dashboard ? DASHBOARD_FONT_SIZE : DEFAULT_FONT_SIZE;

    return layout.hideLegend ? {
        enabled: false
    } : {
        symbolWidth: 11,
        symbolHeight: 11,
        labelFormatter: function() {
            return '<span style="font-size:' + fontSize + '; font-weight:normal; color:#333; text-shadow:0 0 #aaa">' + this.name + '</span>';
        }
    };
}
