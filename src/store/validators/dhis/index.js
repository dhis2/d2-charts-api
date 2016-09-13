import isArray from 'd2-analysis/lib/isArray';
import isObject from 'd2-analysis/lib/isObject';
import isString from 'd2-analysis/lib/isString';

function validateHeader(header) {
    if (!isObject(header)) {
        throw new Error('Header is not an object');
    }

    if (header.meta) {
        if (!isString(header.name)) {
            throw new Error('Header name is not a string');
        }
    }
}

function validateRowValue(rowValue) {
    if (!isString(rowValue)) {
        throw new Error('Row value is not a string');
    }
}

function validateRow(row) {
    if (!isArray(row)) {
        throw new Error('Data row is not an array');
    }

    if (row.length !== data.headers.length) {
        throw new Error('Data row length is invalid');
    }

    row.forEach(rowValue => validateRowValue(rowValue));
}

const validator = data => {
    if (!isObject(data)) {
        throw new Error('Data is not an object');
    }

    // headers

    if (!isArray(data.headers)) {
        throw new Error('Response headers is not an array');
    }

    if (!data.headers.length > 1) {
        throw new Error('At least two response headers required');
    }

    data.headers.forEach(header => validateHeader(header));

    // meta data

    if (!isObject(data.metaData)) {
        throw new Error('Metadata is not an object');
    }

    if (!isObject(data.metaData.names)) {
        throw new Error('Metadata names is not an object');
    }

    data.headers.forEach(header => {
        if (header.meta) {
            if (!isArray(data.metaData[header.name])) {
                throw new Error(`No metadata ids found for header "${header.name}"`);
            }
        }
    });

    // data

    if (!isArray(data.rows)) {
        throw new Error('Headers is not an array');
    }

    if (!data.rows.length) {
        throw new Error('No data rows provided');
    }

    data.rows.forEach(row => validateRow(row));

    return data;
};

export default validator;
