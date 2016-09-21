export default function (layout) {
    return layout.hideLegend ? {
        enabled: false
    } : {
        labelFormatter: function() {
            return '<span style="font-size:13px; font-weight:normal; color:#111; text-shadow:0 0 #666">' + this.name + '</span>';
        }
    };
}
