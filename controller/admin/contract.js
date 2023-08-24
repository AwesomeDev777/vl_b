const Contract = require("../../model/admin/Contract");

exports.add = (req, res) => {
    let contract = new Contract(req.body);
    contract.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err => res.status(400).send(err));
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Contract.find().catch(err =>res.status(400).json({contract: "Error exists"}));
    const length = getAll.length;
    const all = await Contract.find().populate('client', 'company').populate('contract_type').populate('project', 'name').skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({contract: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Contract.findById({_id: id})
        .then(contract => res.json(contract))
        .catch(err => res.status(400).json({contract: "Not found"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Contract.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    Contract.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json(err));
}
