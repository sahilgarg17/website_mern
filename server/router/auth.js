const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate"); 

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world by auth`);
});
    
// router.post('/register', (req, res) => {
//     console.log(req.body);
//     const { name, email, phone, work, password, cpassword } = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error : "pls fill the fields properly" });
//     }
//     User.findOne({email : email})
//         .then((userExist) => {
//             if(userExist) {
//                 return res.send(422).json({ error : "Email already Exist" });
//             }
        
//             const user = new User(req.body);
//             user.save().then(() => {
//                 res.send(201).json({ message : "User registered successfuly" });
//             }).catch((err) => { console.log(err); });
//         })
//         .catch((err) => { console.log(err); });

// });


router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, work, password, cpassword } = req.body;
        if(!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error : "pls fill the fields properly" });
        }
        const userExist = await User.findOne({email : email});
        if(userExist) {
            return res.status(422).json({ error : "Email already Exist" });
        } else if(password != cpassword) {
            return res.status(422).json({ error : "Password and cpassword do not match!" });
        } else {
        const user = new User(req.body);
        const userRegistered = await user.save();
        res.status(201).json({ message : "User registered successfully" });
        } 
    } catch (err) {
        console.log(err);
    }

});

//login router
router.post('/signin', async(req, res) => {
        try {
            console.log(req.body);
            const { email, password } = req.body;
            if(!email || !password) {
                return res.status(422).json({ error : "pls fill the fields properly" });
            }
            const userExist = await User.findOne({email : email});
            if(!userExist) {
                return res.status(422).json({ error : "Invalid Credentials" });
            }
            const isMatch = await bcrypt.compare(password, userExist.password);
            const token = await userExist.generateAuthToken();
            console.log(token);
            if(isMatch){
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                return res.status(201).json({ message : "User signin successfully" });
            }
            else return res.status(422).json({ error : "Invalid Credentials" });

        }catch (err) {
            console.log(err);
        }
});


//about us part
router.get('/about', authenticate, (req, res) => {
    console.log("Hello from about");
    res.send(req.rootUser);
});



module.exports = router;