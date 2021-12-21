const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', async (req, res) => {
    if(req.body.password !== req.body.repeat){
        res.render('register', { errorMessage: 'Passwords do not match!'})
    }
           
    else{
    try {
        const salt= await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        const mesage = await newUser.save()
       
        res.redirect('/login')
    } catch (err) {
        res.render('register', { errorMessage: 'Status 500 ,An error happened!'})
        
    }
}
})
module.exports = router