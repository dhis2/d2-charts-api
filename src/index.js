import isArray from 'd2-utilizr/lib/isArray';
import 'core-js/fn/array/find-index';

import Store from './store';
import Config from './config';

const defaultError = error => {
    throw new Error(error);
};

const defaultWarning = warning => {
    console.log(warning);
};

function createChart(
    data,
    layout,
    el,
    extraOptions,
    error = defaultError,
    warning = defaultWarning
) {
    if (!isArray(data)) {
        data = [data];
    }

    const store = new Store({ data, error, warning });
    const config = new Config({ store, layout, el, extraOptions, error, warning });

    return {
        store,
        config,
        chart: config.createChart(),
    };
}

export { Store, Config, createChart };

export default {
    Store,
    Config,
    createChart,
};
