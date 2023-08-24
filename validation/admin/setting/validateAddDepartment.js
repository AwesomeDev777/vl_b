const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateAddDepartment(data){
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.folder = !isEmpty(data.folder) ? data.folder : '';
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email field is invalid';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(Validator.isEmpty(data.folder)){
        errors.folder = 'Folder field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}