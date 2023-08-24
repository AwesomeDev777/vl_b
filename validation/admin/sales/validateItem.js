const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateItem(data){
    let errors = {};
    data.description = !isEmpty(data.description) ? data.description : '';
    data.group = !isEmpty(data.group) ? data.group : '';
    if(Validator.isEmpty(data.description)){
        errors.description = 'Description field is required';
    }
    if(Validator.isEmpty(data.group)){
        errors.group = 'Group field is required';
    }
    if(isNaN(data.rate) || data.rate == 0){
        errors.rate = 'Rate field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}