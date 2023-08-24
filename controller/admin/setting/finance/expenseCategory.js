const Category = require("../../../../model/admin/setting/finance/ExpenseCategory");
const isEmpty = require("../../../../validation/is-empty");

exports.add = (req, res) => {
    if(isEmpty(req.body.name)) return res.status(400).json({name: "Name field is required!"});
    Category.findOne({name: req.body.name}).then(category =>{
        if(category) {
            return res.status(400).json({ name : 'Name is a unique value' });
        }else{
            let category = new Category(req.body);
            category.save()
                .then(() => { res.json({sucess: true}) })
                .catch(err => res.status(400).json({ category : "Bad Request"}));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Category.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Category.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).send(err));
    return res.json({all, length});
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Category.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({ category : "Bad Request"}));
}
