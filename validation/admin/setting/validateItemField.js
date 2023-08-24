const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateItemField(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.slug = !isEmpty(data.slug) ? data.slug : '';
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
    if(Validator.isEmpty(data.slug)){
        errors.slug = 'Slug field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}