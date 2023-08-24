const ContractType = require("../../../../model/admin/setting/contract/contractType");
const isEmpty = require("../../../../validation/is-empty");

exports.add = (req, res) => {
    if(isEmpty(req.body.name)) return res.status(400).json({name: "Name field is required!"});
    ContractType.findOne({name: req.body.name}).then(contractType =>{
        if(contractType) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let contractType = new ContractType(req.body);
            contractType.save()
                .then(type => { res.json({sucess: true}) })
                .catch(err => res.status(400).json(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await ContractType.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await ContractType.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    ContractType.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}
