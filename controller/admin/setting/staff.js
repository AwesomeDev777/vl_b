const bcrypt = require('bcrypt');
const Staff = require("../../../model/admin/setting/Staff");
const validateAddStaff = require("../../../validation/admin/staff/validateAddStaff");
const validateEditStaff = require("../../../validation/admin/staff/validateEditStaff");
const isEmpty = require('../../../validation/is-empty');

exports.add = (req, res) => {
    const { errors, isValid } = validateAddStaff(req.body);
    if (!isValid) return res.status(400).json(errors);
    Staff.findOne({email: req.body.email}).then(staff =>{
        if(staff) {
            return res.status(400).json({ email : 'Email already added. Please login.' });
        }else{
            let staff = new Staff(req.body);
            bcrypt.genSalt(10, (err, salt) =>{
                if (err) throw err;
                bcrypt.hash(staff.password, salt, (err, hash) => {
                    if(err){ 
                        throw err;
                    }else{
                        staff.password = hash;
                        staff.save()
                            .then(staff => { res.json(staff) })
                            .catch(err => res.status(400).send(err));
                    }
                })
            })
        }
    })
}

exports.getAll  = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const search = req.params.search.slice(7);
    const sort = req.params.sort.slice(5);
    const getAll = await Staff.find({$or: [{firstname: { $regex: '.*' + search + '.*' }}, {lastname: { $regex: '.*' + search + '.*' }}, {email: { $regex: '.*' + search + '.*' }}]}).catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Staff.find({$or: [{firstname: { $regex: '.*' + search + '.*' }}, {lastname: { $regex: '.*' + search + '.*' }}, {email: { $regex: '.*' + search + '.*' }}]}).populate('role', 'name').sort({firstname: sort}).skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({staff: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Staff.findById({_id: id})
        .then(staff => res.json(staff))
        .catch(err => res.status(400).json({staff: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateEditStaff(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    if(req.body.password == undefined) {
        Staff.findByIdAndUpdate({_id: id}, req.body)
            .then(() => res.json({success: true}))
            .catch(err => res.status(400).send(err));
    } else {
        if(req.body.password == '') {
            const { errors, isValid } = validateAddStaff(req.body);
            if (!isValid) return res.status(400).json(errors);
        } else{            
            bcrypt.genSalt(10, (err, salt) =>{
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err){ 
                        throw err;
                    }else{
                        req.body.password = hash;
                        Staff.findByIdAndUpdate({_id: id}, req.body)
                            .then(() => res.json({success: true}))
                            .catch(err => res.status(400).send(err));
                    }
                })
            })
        }
    }
}

exports.image = (req, res) => {
    const id = req.params.id;
    Staff.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Staff.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.active = (req, res) => {
    const id = req.params.id;
    Staff.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.password = (req, res) => {
    let errors = {};
    if(isEmpty(req.body.oldpassword)){
        errors.oldpassword = 'Old password field is required';
    }
    if(isEmpty(req.body.newpassword)){
        errors.newpassword = 'New password field is required';
    }
    if(req.body.newpassword !== req.body.confirmpassword){
        errors.confirmpassword = 'New password and Confirm password did not match';
    }
    if(!isEmpty(errors))
    {
        return res.status(400).json(errors);
    }
    const id = req.params.id;
    Staff.findOne({_id: id}).then(staff =>{
        if(!staff) {
            return res.status(400).send('Not found with this id');
        }else{
            bcrypt.compare(req.body.oldpassword, staff.password, async (err, isMatch) => {
                if(isMatch){
                    bcrypt.genSalt(10, (err, salt) =>{
                        if (err) throw err;
                        bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
                            if(err){ 
                                throw err;
                            }else{
                                let password = { password: hash };
                                Staff.findByIdAndUpdate({_id: id}, password)
                                    .then(() => res.json({success: true}))
                                    .catch(err => res.status(400).send(err));
                            }
                        })
                    })
                }else{
                    errors.oldpassword = "Oldpassword incorrect";
                    console.log(errors)
                    return res.status(400).json(errors);
                }
            })
        }
    })
}