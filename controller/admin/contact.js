const bcrypt = require('bcrypt');
const Contact = require("../../model/admin/Contact");
const validateContact = require("../../validation/admin/validateContact");
const validateContact2 = require("../../validation/admin/validateContact2");

exports.add = (req, res) => {
    const { errors, isValid } = validateContact(req.body);
    if (!isValid) return res.status(400).json(errors);
    Contact.findOne({email: req.body.email}).then(async contact =>{
        if(contact) {
            return res.status(400).json({ email : 'Email already added. Please login.' });
        }else{
            if(req.body.isprimary == true){
                await Contact.findOneAndUpdate({isprimary: true, client: req.body.client}, {isprimary: false})
                            .then(() => { 
                            })
                            .catch(() => {
                                let contact = new Contact(req.body);
                                bcrypt.genSalt(10, (err, salt) =>{
                                    if (err) throw err;
                                    bcrypt.hash(contact.password, salt, (err, hash) => {
                                        if(err){ 
                                            throw err;
                                        }else{
                                            contact.password = hash;
                                            contact.save()
                                                .then(contact => { res.json(contact) })
                                                .catch(err => res.status(400).send(err));
                                        }
                                    })
                                })                                        
                            })
            }
            let contact = new Contact(req.body);
            bcrypt.genSalt(10, (err, salt) =>{
                if (err) throw err;
                bcrypt.hash(contact.password, salt, (err, hash) => {
                    if(err){ 
                        throw err;
                    }else{
                        contact.password = hash;
                        contact.save()
                            .then(contact => { res.json(contact) })
                            .catch(err => res.status(400).send(err));
                    }
                })
            })
        }
    })
}

exports.getAll = async (req, res) => {
    const pages = req.params.pages;
    const size = req.params.size;
    const search = req.params.search.slice(7);
    const sort = req.params.sort.slice(5);
    const getAll = await Contact.find({$or: [{firstname: { $regex: '.*' + search + '.*' }}, {lastname: { $regex: '.*' + search + '.*' }}, {email: { $regex: '.*' + search + '.*' }}]}).catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Contact.find({$or: [{firstname: { $regex: '.*' + search + '.*' }}, {lastname: { $regex: '.*' + search + '.*' }}, {email: { $regex: '.*' + search + '.*' }}]}).populate('client').sort({firstname: sort}).skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({contact: "Error exists"}));
    return res.json({all, length});
}

exports.getOne = (req, res) => {
    const id = req.params.id;
    Contact.findById({_id: id})
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json({contact: "Not found!"}));
}

exports.edit = (req, res) => {
    const { errors, isValid } = validateContact2(req.body);
    if (!isValid) return res.status(400).json(errors);
    const id = req.params.id;
    Contact.findByIdAndUpdate({_id: id}, req.body)
        .then((contact) => res.json(contact))
        .catch(err => res.status(400).send(err));
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Contact.findByIdAndRemove({_id: id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.active = (req, res) => {
    const id = req.params.id;
    Contact.findByIdAndUpdate({_id: id}, req.body)
        .then(() => res.json({success: true}))
        .catch(err => res.status(400).send(err));
}

exports.getSome = async (req, res) => {
    const id = req.params.id;
    const pages = req.params.pages;
    const size = req.params.size;
    const getAll = await Contact.find({client: id}).catch(err => res.status(400).send(err));
    const length = getAll.length;
    const all = await Contact.find({client: id}).skip(size * (pages - 1)).limit(size).catch(err => res.status(400).json({contact: "Error exists"}));
    return res.json({all, length});
}