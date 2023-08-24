const Warehouse = require("../../../model/admin/warehouse/Warehouse");
const validateWarehouse = require("../../../validation/admin/warehouse/validateWarehouse");

exports.add = (req, res) => {
    const { errors, isValid } = validateWarehouse(req.body);
    if (!isValid) return res.status(400).json(errors);
    let warehouse = new Warehouse(req.body);
    warehouse.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{ res.status(400).send({warehouse: "Error exists"})});                
}

exports.getAll = async (req, res) => {
    const getAll = await Warehouse.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Warehouse.find().catch(err => res.status(400).json({warehouse: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Warehouse.findById({_id: id})
        .then(warehouse => res.json(warehouse))
        .catch(err => res.status(400).json({warehouse: "Not found!"}));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const { errors, isValid } = validateWarehouse(req.body);
    if (!isValid) return res.status(400).json(errors);
    Warehouse.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Warehouse.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}