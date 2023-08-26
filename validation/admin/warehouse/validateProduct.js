const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateProduct(data){
    let errors = {};
    data.code = !isEmpty(data.code) ? data.code : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.bin_location = !isEmpty(data.bin_location) ? data.bin_location : '';
    if(Validator.isEmpty(data.code)){
        errors.code = 'Code field is required';
    }
    
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }else{
        if((data.name.length < 2) || (data.name.length > 30))
        {
            errors.name = 'The length of Name must be between 2 and 30';
        }
    }
    if(Validator.isEmpty(data.bin_location)){
        errors.bin_location = 'Bin location field is required';
    }else{
        if((data.bin_location.length < 2) || (data.bin_location.length > 30))
        {
            errors.bin_location = 'The length of Bin Location must be between 2 and 30';
        }
    }
    if(isNaN(data.initial_stock)){
        errors.initial_stock = 'Initial stock must be number';
    }else{
        if(data.initial_stock > 1000000000000)
        {
            errors.initial_stock = 'The Initial stock must be below 1000000000000';
        }
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}