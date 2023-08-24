const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateTransfer(data){
    let errors = {};
    data.transfer_funds_from = !isEmpty(data.transfer_funds_from) ? data.transfer_funds_from : '';
    data.transfer_funds_to = !isEmpty(data.transfer_funds_to) ? data.transfer_funds_to : '';
    if(Validator.isEmpty(data.transfer_funds_from)){
        errors.transfer_funds_from = 'Transfer funds from field is required';
    }
    if(Validator.isEmpty(data.transfer_funds_to)){
        errors.transfer_funds_to = 'Transfer funds to field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}