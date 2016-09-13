import validators from './validators';
import adapters from './adapters';

const config = ({ el, layout, store, inputFormat = 'dhis', outputFormat = 'highcharts', extraLayout }) => {
    const _validator = validators[inputFormat] || validators.noValidation;
    const _adapter = adapters[inputFormat + '_' + outputFormat];

    if (!_validator) {
        console.log(`Validation not supported for config input format "${inputFormat}"`);
    }

    if (!_adapter) {
        throw new Error(`Config tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    const layout = _validator(layout);

    this.getConfig = () => _adapter({ el, layout, store, extraLayout });
};

export default config;

//todo sorting
