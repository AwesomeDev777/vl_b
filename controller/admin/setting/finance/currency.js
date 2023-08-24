const Currency = require("../../../../model/admin/setting/finance/Currency");
const validateCurrency = require("../../../../validation/admin/setting/validateCurrency");

exports.add = (req, res) => {
    const { errors, isValid } = validateCurrency(req.body);
    if (!isValid) return res.status(400).json(errors);
    Currency.findOne({name: req.body.name}).then(currency =>{
        if(currency) {
            return res.status(400).json({ name : 'Name field is unique' });
        }else{
            Currency.findOne({symbol: req.body.symbol}).then(currency =>{
                if(currency) {
                    return res.status(400).json({ symbol : 'Symbol field is unique' });
                }else{
                    let currency = new Currency(req.body);
                    currency.save()
                            .then(curren => { res.json({sucess: true}) })
                            .catch(err => res.status(400).send(err));
                }
            })        
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Currency.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Currency.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Currency.findById({_id: id})
        .then(curren => res.json(curren))
        .catch(err => res.status(400).json({currency: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateCurrency(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Currency.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Currency.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.default = async (req, res) => {
    const id = req.params.id;
    await Currency.findOneAndUpdate({isdefault: true}, {isdefault: false})
                .then(() => {
                    Currency.findByIdAndUpdate({_id: id}, {isdefault: true})
                        .then(() => {
                            res.json({success: true})
                        })
                        .catch(err => res.status(400).send(err));
                })
                .catch(() => {
                    Currency.findByIdAndUpdate({_id: id}, {isdefault: true})
                        .then(() => {
                            res.json({success: true})
                        })
                        .catch(err => res.status(400).send(err));
                })
}