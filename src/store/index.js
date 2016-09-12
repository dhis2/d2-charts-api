import validators from './validators';
import adapters from './adapters';

const store = ({ data, inputFormat = 'dhis', outputFormat = 'highcharts', seriesId, categoryId }) => {
    let _validator = validators[inputFormat] || validators.noValidation;
    let _adapter = adapters[inputFormat + '_' + outputFormat];

    if (!_validator) {
        console.log(`Validation not supported for data input format "${inputFormat}"`);
    }

    if (!_adapter) {
        throw new Error(`Data tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    this.getData = (sId = seriesId, cId = categoryId) => _adapter(_validator(data), sId, cId);
};

export default store;
