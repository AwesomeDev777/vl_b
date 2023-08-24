const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateContact(data){
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email field is invalid';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    if(Validator.isEmpty(data.phonenumber)){
        errors.phonenumber = 'Phonenumber field is required';
    }
    if(Validator.isEmpty(data.firstname)){
        errors.firstname = 'Firstname field is required';
    }
    if(Validator.isEmpty(data.lastname)){
        errors.lastname = 'Lastname field is required';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}