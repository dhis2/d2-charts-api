import generators from './generators';

export default function ({ config, el, outputFormat = 'highcharts' }) {
    const generator = generators[outputFormat];

    if (!generator) {
        throw new Error(`Output format ${outputFormat} is not supported`);
    }

    return generator(config, el);
}
