const Group = require("../../../../model/admin/setting/item/Group");
const isEmpty = require("../../../../validation/is-empty");

exports.add = (req, res) => {
    if(isEmpty(req.body.name)) return res.status(400).json({name: "Name field is required!"});
    Group.findOne({name: req.body.name}).then(group =>{
        if(group) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let group = new Group(req.body);
            group.save()
                .then(() => { res.json({sucess: true}) })
                .catch(err => res.status(400).json(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Group.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Group.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Group.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Group.findById({_id: id})
        .then(group => res.json(group))
        .catch(err => res.status(400).json({model: "Not found!"}));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    Group.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({model: "Editing faild"}));
}