const Journal_entries = require("../../../model/admin/account/Journal_entries");

exports.add = (req, res) => {
    let journal_entries = new Journal_entries(req.body);
    journal_entries.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{ res.status(400).send({journal_entries: "Error exists"})});                
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Journal_entries.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Journal_entries.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({journal_entries: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Journal_entries.findById({_id: id})
        .then(journal_entries => res.json(journal_entries))
        .catch(err => res.status(400).json({journal_entries: "Not found!"}));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    Journal_entries.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Journal_entries.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}