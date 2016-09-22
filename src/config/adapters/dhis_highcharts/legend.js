export default function (layout) {
    return layout.hideLegend ? {
        enabled: false
    } : {
        symbolWidth: 11,
        symbolHeight: 11,
        labelFormatter: function() {
            return '<span style="font-size:13px; font-weight:normal; color:#333; text-shadow:0 0 #aaa">' + this.name + '</span>';
        }
    };
}
