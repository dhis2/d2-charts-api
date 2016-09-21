import validators from './validators';
import adapters from './adapters';
import generators from './generators';
import { theme1 } from '../util/colors';

const DEFAULT_EXTRA_OPTIONS = {
    colors: theme1
};

export default function ({ store, layout, el, inputFormat = 'dhis', outputFormat = 'highcharts', extraLayout, extraOptions = {} }) {
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

    this.getConfig = () => _adapter({ store, layout, el, extraLayout, extraOptions: Object.assign({}, DEFAULT_EXTRA_OPTIONS, extraOptions) });

    this.createChart = () => _generator(this.getConfig(), el);
}