const GoodQuality = require("../../../model/admin/warehouse/GoodQuality");
const validateGoodQuality = require("../../../validation/admin/warehouse/validateGoodQuality");

exports.add = (req, res) => {
    const { errors, isValid } = validateGoodQuality(req.body);
    if (!isValid) return res.status(400).json(errors);

    let quantity = new GoodQuality({
        ...req.body
    });
    quantity.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{ 
          console.log(err)
          res.status(400).send({quantity: "Error exists"})});                
}

exports.getAll = async (req, res) => {
    const goodId = req.params.goodId;

    let all = [];
    let length = 0


    try {
      length = await GoodQuality.find({
        goodId
      }).count()
      all = await GoodQuality.find({goodId});
      return res.json({all, length});
    } catch (error) {
        console.log(error)
        res.status(400).json({product: "Error exists"});
    }

}

exports.getOne = (req, res) => {
    const id = req.params.id;
    GoodQuality.findById({_id: id})
        .then(q => res.json(q))
        .catch(err => res.status(400).json({good: "Not found!"}));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const { errors, isValid } = validateGoodQuality(req.body);
    if (!isValid) return res.status(400).json(errors);
    GoodQuality.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send({good: "Error exists"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    GoodQuality.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send({good: "Error exists"}));
}