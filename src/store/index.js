import validators from './validators';
import adapters from './adapters';

export default function ({ data, inputFormat = 'dhis', outputFormat = 'highcharts', seriesId, categoryId }) {
    let _validator = validators[inputFormat] || validators.noValidation;
    let _adapter = adapters[inputFormat + '_' + outputFormat];

    if (!_validator) {
        console.log(`Validation not supported for data input format "${inputFormat}"`);
    }

    if (!_adapter) {
        throw new Error(`Data tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    this.generateData = (seriesId = seriesId, categoryId = categoryId) => _adapter({
        data: _validator(data),
        seriesId,
        categoryId
    });
}
