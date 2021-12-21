const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jsonwebtoken = require("jsonwebtoken");
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login',async(req,res)=>{
   
    const user = await User.findOne({ username: req.body.username });
        if (!user) return  res.render('login', { errorMessage: 'Status 400 ,Invalid username or password! '})

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
        return  res.render('login', { errorMessage: 'Passwords do not match!'})
        const accessToken=jsonwebtoken.sign({_id:this._id},process.env.TOKEN_SECRET,{expiresIn:3600})
        const refreshToken=jsonwebtoken.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:525600})
        res.cookie('jsonwebtoken', accessToken, {
            maxAge: 86400000,
            httpOnly: true,
        })
        res.redirect('/storyUser/?data='+user.username)
	
	
})

module.exports = router