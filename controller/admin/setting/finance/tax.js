const Tax = require("../../../../model/admin/setting/finance/Tax");
const validateTax = require("../../../../validation/admin/setting/validateTax");

exports.add = (req, res) => {
    const { errors, isValid } = validateTax(req.body);
    if (!isValid) return res.status(400).json(errors);
    Tax.findOne({name: req.body.name}).then(tax =>{
        if(tax) {
            return res.status(400).json({ name : 'Name field is unique' });
        }else{
            Tax.findOne({taxrate: req.body.taxrate}).then(tax =>{
                if(tax) {
                    return res.status(400).json({ taxrate : 'Rate field is unique' });
                }else{
                    let tax = new Tax(req.body);
                    tax.save()
                        .then(() => { res.json({sucess: true}) })
                        .catch(err => res.status(400).send(err));
                }
            })        
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Tax.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Tax.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Tax.findById({_id: id})
        .then(tax => res.json(tax))
        .catch(err => res.status(400).json({tax: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateTax(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Tax.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({tax: "Both fields are unique!"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Tax.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}