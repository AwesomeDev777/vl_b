const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateWarehouse(data){
    let errors = {};
    data.warehouse_code = !isEmpty(data.warehouse_code) ? data.warehouse_code : '';
    data.warehouse_name = !isEmpty(data.warehouse_name) ? data.warehouse_name : '';
    
    if(Validator.isEmpty(data.warehouse_code)){
        errors.warehouse_code = 'Warehouse Code field is required';
    }
    if(Validator.isEmpty(data.warehouse_name)){
        errors.warehouse_name = 'Warehouse Name field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}