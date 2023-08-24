const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateTransactionBank(data){
    let errors = {};
    data.date = !isEmpty(data.date) ? data.date : '';
    if(Validator.isEmpty(data.date)){
        errors.date = 'Date field is required';
    }
    if(isNaN(data.withdrawals) && data.withdrawals > 0){
        errors.withdrawals = 'WithDrawals field is required';
    }
    if(isNaN(data.deposits) && data.deposits > 0){
        errors.deposits = 'Deposits field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}