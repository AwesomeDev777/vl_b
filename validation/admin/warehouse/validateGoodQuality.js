const validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateGoodQauntity(data){
    let errors = {};

    data.date = !isEmpty(data.date) ? data.date : '';

    if(validator.isEmpty(data.date)) {
      errors.date = 'Date field must be required';
    }

    if(validator.isEmpty(data.description)) {
      errors.description = 'Description field must be required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}