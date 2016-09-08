import isString from 'd2-utilizr/lib/isString';

export default function getTitle(layout) {
    const title;

    if (isString(layout.title) && !layout.hideTitle) {
        title = {
            text: layout.title
        };
    }

    return title;
}
