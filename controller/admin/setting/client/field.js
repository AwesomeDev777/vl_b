const ClientField = require("../../../../model/admin/setting/client/ClientField");
const validateClientField = require("../../../../validation/admin/setting/validateClientField")

exports.add = (req, res) => {
    const { errors, isValid } = validateClientField(req.body);
    if (!isValid) return res.status(400).json(errors);
    ClientField.findOne({name: req.body.name}).then(clientfield =>{
        if(clientfield) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let clientfield = new ClientField(req.body);
            clientfield.save()
                .then(() => { res.json({sucess: true}) })
                .catch(err => res.status(400).send(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await ClientField.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await ClientField.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    ClientField.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({ clientfield : "Bad Request"}));
}

exports.active = (req, res) => {
    const id = req.params.id;
    ClientField.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({ clientfield : "Bad Request"}));
}