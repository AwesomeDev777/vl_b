const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateProject(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.billing_type = !isEmpty(data.billing_type) ? data.billing_type : '';
    data.start_date = !isEmpty(data.start_date) ? data.start_date : '';
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(Validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }
    if(Validator.isEmpty(data.billing_type)){
        errors.billing_type = 'Billing Type field is required';
    }
    if(Validator.isEmpty(data.start_date)){
        errors.start_date = 'Start date field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}