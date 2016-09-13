import Store from './store';
import Config from './config';

function createChart(data, layout, el) {
    const store = new Store({ data });
    const config = new Config({ store, layout, el });
    const chart = config.createChart();

    return {
        store,
        config,
        chart
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
