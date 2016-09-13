import isString from 'd2-utilizr/lib/isString';

export default function (layout) {
    return isString(layout.title) && !layout.hideTitle ? {
        text: layout.title
    } : undefined;
}
