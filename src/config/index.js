import validators from './validators';
import adapters from './adapters';
import generators from './generators';

export default function ({ el, layout, store, inputFormat = 'dhis', outputFormat = 'highcharts', extraLayout }) {
    const _validator = validators[inputFormat] || validators.noValidation;
    const _adapter = adapters[inputFormat + '_' + outputFormat];
    const _generator = generators[outputFormat];

    if (!_validator) {
        console.log(`Validation not supported for config input format "${inputFormat}"`);
    }

    if (!_adapter) {
        throw new Error(`Config tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    if (!_generator) {
        throw new Error(`Chart output format ${outputFormat} is not supported`);
    }

    this.getConfig = () => _adapter(el, layout, store, extraLayout);

    this.createChart = () => _generator(this.getConfig(), el);
}

// todo sorting
