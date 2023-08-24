const PaymentMode = require("../../../../model/admin/setting/finance/PaymentMode");
const isEmpty = require("../../../../validation/is-empty");

exports.add = (req, res) => {
    if(isEmpty(req.body.name)) return res.status(400).json({name: "Name field is required!"});
    PaymentMode.findOne({name: req.body.name}).then(async paymentMode =>{
        if(paymentMode) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            if(req.body.selected_by_default == true)
            {   
                await PaymentMode.findOneAndUpdate({selected_by_default: true}, {selected_by_default: false})
                .then(() => { 
                })
                .catch(() => {
                    let paymentMode = new PaymentMode(req.body);
                    paymentMode.save()
                            .then(() => { res.json({sucess: true}) })
                            .catch(err => res.status(400).json({ paymentMode : "Bad Request"}));
                })
            }
            let paymentMode = new PaymentMode(req.body);
            paymentMode.save()
                .then(() => {
                    res.json({sucess: true}
                ) })
                .catch(err => res.status(400).json({ paymentMode : "Bad Request"}));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await PaymentMode.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await PaymentMode.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    PaymentMode.findById({_id: id})
        .then(field => res.json(field))
        .catch(err => res.status(400).json({ paymentMode : "Bad Request"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    PaymentMode.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({ paymentMode : 'Bad Request' }));
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    if(isEmpty(req.body.name)) return res.status(400).json({name: "Name field is required!"});
    if(req.body.selected_by_default == true)
    {
        await PaymentMode.findOneAndUpdate({selected_by_default: true}, {selected_by_default: false})
        .then(() => { 
        })
        .catch(() => {
            PaymentMode.findByIdAndUpdate({_id: id}, req.body)
                    .then(() => {res.json({success: true})})
                    .catch(err =>res.status(400).json({ paymentMode : 'Bad Request' }));    
        })
    } 
    PaymentMode.findByIdAndUpdate({_id: id}, req.body)
        .then(() => {res.json({success: true})})
        .catch(err =>res.status(400).json({ paymentMode : 'Bad Request' }));
}

exports.active = (req, res) => {
    const id = req.params.id;
    PaymentMode.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({ paymentMode : 'Bad Request' }));
}