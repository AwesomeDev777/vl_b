const bcrypt = require('bcrypt');
const Account = require("../../../model/admin/account/Account");
const validateAccount = require("../../../validation/admin/account/validateAccount");

exports.add = (req, res) => {
    const { errors, isValid } = validateAccount(req.body);
    if (!isValid) return res.status(400).json(errors);
        let account = new Account(req.body);
        account.save()
            .then(() => { res.json({sucess: true}) })
            .catch(err => res.status(400).send(err));
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Account.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Account.find().populate('parent_account').skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({account: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Account.findById({_id: id})
        .then(account => res.json(account))
        .catch(err => res.status(400).json({account: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateAccount(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Account.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Account.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.active = (req, res) => {
    const id = req.params.id;
    Account.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}