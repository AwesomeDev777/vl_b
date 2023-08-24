const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateCurrency(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.symbol = !isEmpty(data.symbol) ? data.symbol : '';
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(Validator.isEmpty(data.symbol)){
        errors.symbol = 'Symbol field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}