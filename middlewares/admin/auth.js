const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Staff = require("../../model/admin/setting/Staff");
const validateLogin = require("../../validation/admin/staff/validateLogin");
const keys = require('../../config/keys');

exports.login = (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json(errors);
    const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
    Staff.findOne({email: req.body.email}).then(staff =>{
        if(!staff) {
            return res.status(400).send('Not found with this email');
        }else{
            bcrypt.compare(req.body.password, staff.password, async (err, isMatch) => {
                if(isMatch){
                    staff.last_login = currentTime;
                    staff.save();
                    const payload = {id : staff.id, firstname: staff.firstname, lastname:staff.lastname, profile_image: staff.profile_image, email: staff.email};
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 60 * 60 * 24 * 30}, (err, token)=> {
                        res.json({success: true, token: 'Bearer ' + token});
                    });
                }else{
                    res.status(400).send('Password incorrect');
                }
            })
        }
    })
}

exports.current = (req, res) => {
    res.json(req.user);
}
