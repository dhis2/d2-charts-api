import validators from './validators';
import adapters from './adapters';

const config = (layout, response, inputFormat = 'dhis', outputFormat = 'highcharts', extraLayout) => {
    let _validator = validators[inputFormat] || validators.noValidation;
    let _adapter = adapters[inputFormat + '2' + outputFormat];

    if (!_validator) {
        console.log(`Validation not supported for config input format "${inputFormat}"`);
    }

    if (!_adapter) {
        throw new Error(`Config tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    this.getConfig = (sId = seriesId, cId = categoryId) => _adapter(_validator(layout), response, extraLayout);
};

export default store;

//todo sorting
