import validators from './validators';
import adapters from './adapters';

const store = (data, inputFormat = 'dhis', outputFormat = 'highcharts', seriesId, categoryId) => {
    let validator = validators[inputFormat];
    let adapter = adapters[inputFormat + '2' + outputFormat];

    if (!validator) {
        throw new Error('Input validation not supported for format: ' + inputFormat);
    }

    if (!adapter) {
        throw new Error(inputFormat + ' to ' + outputFormat + ' transformation not supported');
    }

    this.getData = (sId = seriesId, cId = categoryId) => adapter(validator(data), sId, cId);
};

//todo sorting
