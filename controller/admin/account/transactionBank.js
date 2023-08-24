const Transaction_Banking = require("../../../model/admin/account/Transaction_Banking");
const validateTransactionBank = require("../../../validation/admin/account/validateTransactionBank");

exports.add = (req, res) => {
    const { errors, isValid } = validateTransactionBank(req.body);
    if (!isValid) return res.status(400).json(errors);
    let transaction_Banking = new Transaction_Banking(req.body);
    transaction_Banking.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{console.log(err) 
            res.status(400).send(err)});                
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Transaction_Banking.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Transaction_Banking.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({transaction_Banking: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Transaction_Banking.findById({_id: id})
        .then(transaction_Banking => res.json(transaction_Banking))
        .catch(err => res.status(400).json({transaction_Banking: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateTransactionBank(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Transaction_Banking.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Transaction_Banking.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}