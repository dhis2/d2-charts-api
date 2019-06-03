export default function (chartEl, parentEl) {
    if (chartEl) {
        const node = typeof parentEl === 'object' ? parentEl :
            typeof parentEl === 'string' ? document.querySelector(parentEl) : null;

        if (node) {
            node.appendChild(chartEl);
        }

        return chartEl;
    }
};