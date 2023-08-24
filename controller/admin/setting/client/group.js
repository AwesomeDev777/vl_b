const ClientGroup = require("../../../../model/admin/setting/client/ClientGroup");
const isEmpty = require("../../../../validation/is-empty");

exports.add = (req, res) => {
    if(isEmpty(req.body.name)) return res.status(400).json({name: "Name field is required!"});
    ClientGroup.findOne({name: req.body.name}).then(group =>{
        if(group) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let clientGroup = new ClientGroup(req.body);
            clientGroup.save()
                .then(cgroup => { res.json({sucess: true}) })
                .catch(err => res.status(400).json(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await ClientGroup.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await ClientGroup.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    ClientGroup.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}
