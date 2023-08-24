const Role = require("../../../model/admin/setting/Role");
const validateAddRole = require("../../../validation/admin/setting/validateAddRole")

exports.add = (req, res) => {
    const { errors, isValid } = validateAddRole(req.body);
    if (!isValid) return res.status(400).json(errors);
    Role.findOne({name: req.body.name}).then(role =>{
        if(role) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let role = new Role(req.body);
            role.save()
                .then(role => { res.json({sucess: true}) })
                .catch(err => res.status(400).send(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Role.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Role.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Role.findById({_id: id})
        .then(role => res.json(role))
        .catch(err => res.status(400).json({ role : "Bad Request"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Role.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    Role.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}
