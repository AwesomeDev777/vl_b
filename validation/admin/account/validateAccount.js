const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateAccount(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.account_type = !isEmpty(data.account_type) ? data.account_type : '';
    data.account_type_detail = !isEmpty(data.account_type_detail) ? data.account_type_detail : '';

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(Validator.isEmpty(data.account_type)){
        errors.account_type = 'Account Type field is required';
    }
    if(Validator.isEmpty(data.account_type_detail)){
        errors.account_type_detail = 'Account Type Detail field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}