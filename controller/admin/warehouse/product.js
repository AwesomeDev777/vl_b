const Product = require("../../../model/admin/warehouse/Product");
const validateProduct = require("../../../validation/admin/warehouse/validateProduct");
const crypto = require("crypto");

exports.add = (req, res) => {
    const { errors, isValid } = validateProduct(req.body);
    if (!isValid) return res.status(400).json(errors);

    const unique_id = `VL-${crypto.randomBytes(10).toString("hex")}`;
    let product = new Product({
        unique_id,
        current_stock: req.body.initial_stock,
        ...req.body
    });
    product.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{ res.status(400).send({product: "Error exists"})});                
}

exports.getAll = async (req, res) => {
    const warehouse = req.params.warehouse.slice(10);
    const pages = req.params.pages;
    const size = req.params.size;
    const filterKey = req.params.filterKey.slice(10);
    const filterValue = req.params.filterValue.slice(12);
    const sortKey = req.params.sortKey.slice(8);
    const sort = req.params.sort.slice(5);

    if(warehouse === "") {
        return res.json({
            all: [],
            length: 0
        })
    }

    let all = [];
    let length = 0


    try {
        if(filterKey == 'initial_stock' || filterKey == 'current_stock' || filterKey == 'last_withdrawal')
        {
            const getAll = await Product.find({warehouse_ID: warehouse}).find({[filterKey]: filterValue });
            all = await Product.find({warehouse_ID: warehouse}).find({[filterKey]: filterValue }).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size)
        }
        else if(filterKey == 'expiration_date')
        {
            const valueDate = new Date(filterValue);
            const getAll = await Product.find({warehouse_ID: warehouse}).find({[filterKey]: valueDate })
            all = await Product.find({warehouse_ID: warehouse}).find({[filterKey]:valueDate }).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size)
        }
        else if(filterKey !== "") {
            const getAll = await Product.find({warehouse_ID: warehouse}).find({[filterKey]: { $regex: '.*' + filterValue + '.*' }})
            all = await Product.find({warehouse_ID: warehouse}).find({[filterKey]: { $regex: '.*' + filterValue + '.*' }}).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size);
        }
        else {
            const getAll = await Product.find({warehouse_ID: warehouse})
            all = await Product.find({warehouse_ID: warehouse}).sort({[sortKey]: sort}).skip(size * (pages - 1)).limit(size);
        }
        length = await Product.count();
        return res.json({all, length});
    } catch (error) {
        console.log(error)
        res.status(400).json({product: "Error exists"});
    }

}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Product.findById({_id: id})
        .then(product => res.json(product))
        .catch(err => res.status(400).json({product: "Not found!"}));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const { errors, isValid } = validateProduct(req.body);
    if (!isValid) return res.status(400).json(errors);
    Product.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send({product: "Error exists"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send({product: "Error exists"}));
}