const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateEditStaff(data){
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email field is invalid';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    if(Validator.isEmpty(data.firstname)){
        errors.firstname = 'Firstname field is required';
    }
    if(Validator.isEmpty(data.lastname)){
        errors.lastname = 'Lastname field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}