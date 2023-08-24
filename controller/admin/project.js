const Project = require("../../model/admin/Project");
const validateProject = require("../../validation/admin/validateProject");

exports.add = (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);
    let project = new Project(req.body);
    project.save()
        .then(() => { res.json({sucess: true}) })
        .catch(err =>{console.log(err) 
            res.status(400).send(err)});                
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Project.find().catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Project.find().populate('client').populate('staffs', 'firstname').skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({project: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Project.findById({_id: id}).populate('client').populate('staffs', 'firstname')
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({project: "Not found!"})
        });
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Project.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Project.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}