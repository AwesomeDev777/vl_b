const Transfer = require("../../../model/admin/account/Transfer");
const validateTransfer = require("../../../validation/admin/account/validateTransfer");

exports.add = (req, res) => {
    const { errors, isValid } = validateTransfer(req.body);
    if (!isValid) return res.status(400).json(errors);
    let transfer = new Transfer(req.body);
    transfer.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{console.log(err) 
            res.status(400).send(err)});                
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Transfer.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Transfer.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({transfer: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Transfer.findById({_id: id})
        .then(transfer => res.json(transfer))
        .catch(err => res.status(400).json({transfer: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateTransfer(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Transfer.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Transfer.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}