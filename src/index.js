import Store from './store';
import Config from './config';

function createChart(data, layout, el) {
    const store = new Store({ data });
    const config = new Config({ store, layout, el });

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
