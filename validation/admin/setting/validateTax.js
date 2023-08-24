const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateItemField(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(isNaN(data.taxrate) || data.taxrate == 0){
        errors.taxrate = 'Rate field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}