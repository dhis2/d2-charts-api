import generators from './generators';

const chart = ({ config, el, outputFormat = 'highcharts' }) => {
    const generator = generators[outputFormat];

    if (!generator) {
        throw new Error(`Output format ${outputFormat} is not supported`);
    }

    return generator(config, el);
}

export default chart;
