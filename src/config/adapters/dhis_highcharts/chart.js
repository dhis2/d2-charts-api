import getType from './type';

const DEFAULT_SPACING_TOP = 20;

export default function (layout, el) {
    return Object.assign({}, getType(layout.type), {
        spacingTop: DEFAULT_SPACING_TOP,
        renderTo: el || layout.el
    });
};