const router =require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password')
})
router.post('/forgot-password',async (req, res) => {
    try {
    const user = await User.findOne({ email: req.body.email })
    
    if(!user){
        res.status(400).json({mesage:"Użytkownik nie został zarejestrowany! 😕",status:400})
       return
    }
       const link = `http://localhost:3000/reset-password/${user._id}`
       
       res.status(201).json({mesage:`Password reset link 🔄️`,status:201,
    link:link})
    } catch (error) {
        res.status(500).json({message:error.message,status:500})
    } 
})
router.get('/reset-password/:id',(req, res) => {
    res.render('reset-password',{id:req.params.id})
})

router.post('/reset-password/:id', async(req, res, next) => {
    const{id}=req.params
    const user = await User.findOne({ _id:id })
    let {password,password2} = req.body
    if(password !== password2){
        res.render('reset-password',{ errorMessage:"Passwords differ ...! 😕",status:400})
    return
    }
 
    try{   
if(id !== user.id){
    res.render('reset-password',{ errorMessage:"Whatever id ...! 😕",status:400})
    return
}
    const salt = await bcrypt.genSalt(Number(10));
    password = await bcrypt.hash(password, salt);
    
    pack = await User.updateOne({_id: user.id},{$set:{password:password}})
   
    res.render('login',{ Message: 'Password changed!😎'})
    }
catch(error){
    res.render('login',{ errorMessage:"Something went wrong ...! 😕",status:400})
   
}
})
module.exports=router