import isString from 'd2-utilizr/lib/isString';

export default function getTitle(layout) {
    return isString(layout.title) && !layout.hideTitle ? {
        text: layout.title
    } : undefined;
}
