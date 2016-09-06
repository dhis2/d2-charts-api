import validators from './validators';
import adapters from './adapters';

const store = (data, inputFormat = 'dhis', outputFormat = 'highcharts', seriesId, categoryId) => {
    let validator = validators[inputFormat] || validators.noValidation;
    let adapter = adapters[inputFormat + '2' + outputFormat];

    if (!validator) {
        console.log(`Data validation not supported for data input format "${inputFormat}"`);
    }

    if (!adapter) {
        throw new Error(`Tranformation from "${inputFormat}" to "${outputFormat}" is not supported`);
    }

    this.getData = (sId = seriesId, cId = categoryId) => adapter(validator(data), sId, cId);
};

export default store;

//todo sorting
