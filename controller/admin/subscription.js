const Subscription = require("../../model/admin/Subscription");

exports.add_subscription = (req, res) => {
    let subscription = new Subscription(req.body);
    subscription.save()
        .then(subscription => { res.json({sucess: true}) })
        .catch(err => res.status(400).send(err));
}

exports.all_subscription = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const all_subscription = await Subscription.find().catch(err => res.status(400).send(err));
    const length = all_subscription.length;
    const all = await Subscription.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Subscription.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    Subscription.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.json("Not found!"));
}
