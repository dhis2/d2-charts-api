import validators from './validators';
import adapters from './adapters';

export default function ({ data, inputFormat = 'dhis', outputFormat = 'highcharts', seriesId, categoryId, error, warning, extraOptions }) {
    let _validator = validators[inputFormat] || validators.noValidation;
    let _adapter = adapters[inputFormat + '_' + outputFormat];

    if (_validator === validators.noValidation) {
        warning(`Validation not supported for data input format "${inputFormat}"`);
    }

    if (!_adapter) {
        error(`Data tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    this.data = data;

    this.generateData = ({ seriesId = seriesId, categoryId = categoryId }) => {
        return _adapter({
            data: _validator({ data, error, warning }),
            seriesId,
            categoryId,
            extraOptions
        });
    };
}
