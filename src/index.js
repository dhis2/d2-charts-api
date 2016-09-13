import Store from './store';
import Config from './config';
import Chart from './chart';

function createChart(data, layout, el) {
    const store = new Store({ data });
    const config = new Config({ store, layout, el });
    Chart({ config });
}

export {
    Store,
    Config,
    Chart,
    createChart
};
