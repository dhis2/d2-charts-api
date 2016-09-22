import Store from './store';
import Config from './config';

function createChart(data, layout, el, extraOptions) {
console.log("extraOptions", extraOptions);
    const store = new Store({ data });
    const config = new Config({ store, layout, el, extraOptions });

    return {
        store,
        config,
        chart: config.createChart()
    };
}

export {
    Store,
    Config,
    createChart
};

export default {
    Store,
    Config,
    createChart
};
