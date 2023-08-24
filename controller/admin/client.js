const Client = require("../../model/admin/Client");

exports.add = (req, res) => {
    let client = new Client(req.body);
    client.save()
        .then(client => { res.json({sucess: true}) })
        .catch(err => res.status(400).send(err));
} 

exports.getAll  = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const search = req.params.search.slice(7);
    const sort = req.params.sort.slice(5);
    const getAll = await Client.find({$or: [{company: { $regex: '.*' + search + '.*' }}]}).catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Client.find({$or: [{company: { $regex: '.*' + search + '.*' }}]}).populate('contacts').sort({company: sort}).skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({client: "Error exists"}));
    return res.json({all, length});
}

exports.getClient  = async (req, res) => {
    const data = await Client.find().catch(err => res.status(400).send(err));
    return res.json({data});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Client.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    Client.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Client.findById({_id: id})
        .then(client => res.json(client))
        .catch(err => res.status(400).json({client: "Not found!"}));
}

exports.active = (req, res) => {
    const id = req.params.id;
    Client.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}
