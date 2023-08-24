const validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = function validateGood(data){
    let errors = {};

    data.deliveryDate = !isEmpty(data.deliveryDate) ? data.deliveryDate : '';

    if(validator.isEmpty(data.vendorName)) {
      errors.vendorName = 'Vendor Name field must be required';
    }

    if(validator.isEmpty(data.deliveryDate)) {
      errors.deliveryDate = 'Delivery Date field must be required';
    }

    if(validator.isEmpty(data.purchaseOrderNumber)) {
      errors.purchaseOrderNumber = 'Purchase Order Number field must be required';
    }

    if(validator.isEmpty(data.invoiceNumber)) {
      errors.invoiceNumber = 'Invoice Number field must be required';
    }

    if(validator.isEmpty(data.name)) {
      errors.name = 'Name field must be required';
    }

    if(isNaN(data.purchasePrice)) {
      errors.purchasePrice = 'Purchase Price field must be number';
    }

    if(isNaN(data.quantity)) {
      errors.quantity = 'Quantity field must be number';
    }

    if(isNaN(data.totalAmount)) {
      errors.totalAmount = 'Total Amount must be number';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}