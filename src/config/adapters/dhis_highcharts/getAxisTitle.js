import isString from 'd2-utilizr/lib/isString';

const DEFAULT_AXIS_TITLE = {
    style: {
        color: '#222',
        fill: '#222',
        fontSize: '13px'
    }
};

export default function (title) {
    return isString(title) ? Object.assign({}, DEFAULT_AXIS_TITLE, {
        text: title
    }) : {
        text: null
    };
};