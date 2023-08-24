const Field = require("../../../../model/admin/setting/item/itemField");
const validateItemField = require("../../../../validation/admin/setting/validateItemField")

exports.add = (req, res) => {
    const { errors, isValid } = validateItemField(req.body);
    if (!isValid) return res.status(400).json(errors);
    Field.findOne({name: req.body.name}).then(field =>{
        if(field) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let field = new Field(req.body);
            field.save()
                .then(() => { res.json({sucess: true}) })
                .catch(err => res.status(400).send(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Field.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Field.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Field.findById({_id: id})
        .then(field => res.json(field))
        .catch(err => res.status(400).json({ field : "Bad Request"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Field.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const { errors, isValid } = validateItemField(req.body);
    if (!isValid) return res.status(400).json(errors);
    Field.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}

exports.active = (req, res) => {
    const id = req.params.id;
    Field.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}