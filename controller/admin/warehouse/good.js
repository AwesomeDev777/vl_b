const Good = require("../../../model/admin/warehouse/Good");
const validateGood = require("../../../validation/admin/warehouse/validateGood");

exports.add = (req, res) => {
    const { errors, isValid } = validateGood(req.body);
    if (!isValid) return res.status(400).json(errors);

    let good = new Good({
        ...req.body
    });
    good.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{ 
          console.log(err)
          res.status(400).send({good: "Error exists"})});                
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const filterKey = req.params.filterKey.slice(10);
    const filterValue = req.params.filterValue.slice(12);
    const sortKey = req.params.sortKey.slice(8);
    const sort = req.params.sort.slice(5);

    let all = [];
    let length = 0


    try {
        if(filterKey === 'numberOfItems' || filterKey === 'purchasePrice' || filterKey === 'quantity' || filterKey === "totalAmount")
        {
            const getAll = await Good.find({[filterKey]: filterValue });
            all = await Good.find({[filterKey]: filterValue }).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size)
        }
        else if(filterKey == 'expirationDate')
        {
            const valueDate = new Date(filterValue);
            const getAll = await Good.find({[filterKey]: valueDate })
            all = await Good.find({[filterKey]:valueDate }).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size)
        }
        else if(filterKey !== "") {
            const getAll = await Good.find({[filterKey]: { $regex: '.*' + filterValue + '.*' }})
            all = await Good.find({[filterKey]: { $regex: '.*' + filterValue + '.*' }}).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size);
        }
        else {
            const getAll = await Good.find()
            all = await Good.find().sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size);
        }
        length = await Good.count();
        return res.json({all, length});
    } catch (error) {
        console.log(error)
        res.status(400).json({product: "Error exists"});
    }

}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Good.findById({_id: id}).populate('warehouseId')
        .then(product => res.json(product))
        .catch(err => res.status(400).json({good: "Not found!"}));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const { errors, isValid } = validateGood(req.body);
    if (!isValid) return res.status(400).json(errors);
    Good.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send({good: "Error exists"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Good.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send({good: "Error exists"}));
}