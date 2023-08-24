const Item = require("../../../model/admin/sales/Item");
const validateItem = require("../../../validation/admin/sales/validateItem")

exports.add = (req, res) => {
    const { errors, isValid } = validateItem(req.body);
    if (!isValid) return res.status(400).json(errors);
    let item = new Item(req.body);
    item.save()
        .then((it) => { res.json(it)})
        .catch(err => res.status(400).send(err));
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Item.find().catch(err =>res.status(400).json({item: "Error exists"}));
    const length = getAll.length;
    const all = await Item.find().populate('group').populate('tax').populate('tax2').populate('warehouse').populate('unit').skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({contract: "Error exists"}));
    return res.json({all, length});
}

exports.all = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const search = req.params.search.slice(7);
    const sort = req.params.sort.slice(5);
    const getAll = await Item.find({$or: [{description: { $regex: '.*' + search + '.*' }}, {commodity_code: { $regex: '.*' + search + '.*' }}, {commodity_name: { $regex: '.*' + search + '.*' }}, {sku_code: { $regex: '.*' + search + '.*' }}, {sku_name: { $regex: '.*' + search + '.*' }}, {sku_code: { $regex: '.*' + search + '.*' }}]}).catch(err =>res.status(400).json({item: "Error exists"}));
    const length = getAll.length;
    const all = await Item.find({$or: [{description: { $regex: '.*' + search + '.*' }}, {commodity_code: { $regex: '.*' + search + '.*' }}, {commodity_name: { $regex: '.*' + search + '.*' }}, {sku_code: { $regex: '.*' + search + '.*' }}, {sku_name: { $regex: '.*' + search + '.*' }}, {sku_code: { $regex: '.*' + search + '.*' }}]}).populate('group').populate('tax').populate('tax2').populate('warehouse').populate('unit').sort({commodity_code: sort}).skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({contract: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Item.findById({_id: id}).populate('group').populate('tax').populate('tax2').populate('commodity_type').populate('warehouse').populate('color').populate('style').populate('size').populate('unit').populate('sub_group')
        .then(item => res.json(item))
        .catch(err => res.status(400).json({item: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateItem(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Item.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Item.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.image = (req, res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}