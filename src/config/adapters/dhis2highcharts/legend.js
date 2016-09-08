export default function getLegend(layout) {
    return layout.hideLegend ? {
        enabled: false
    } : undefined;
}
