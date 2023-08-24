const Department = require("../../../../model/admin/setting/support/Department");
const validateAddDepartment = require("../../../../validation/admin/setting/validateAddDepartment")

exports.add = (req, res) => {
    const { errors, isValid } = validateAddDepartment(req.body);
    if (!isValid) return res.status(400).json(errors);
    Department.findOne({name: req.body.name}).then(department =>{
        if(department) {
            return res.status(400).json({ name : 'Name field is unique!.' });
        }else{
            let department = new Department(req.body);
            department.save()
                .then(department => { res.json({sucess: true}) })
                .catch(err => res.status(400).send(err));
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Department.find().catch(err =>res.status(400).json({department: "Error exists"}));
    const length = getAll.length;
    const all = await Department.find().skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({department: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Department.findById({_id: id})
        .then(department => res.json(department))
        .catch(err => res.status(400).json({department: "Not found"}));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Department.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const { errors, isValid } = validateAddDepartment(req.body);
    if (!isValid) return res.status(400).json(errors);
    Department.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).json({tax: "error exists"}));
}
