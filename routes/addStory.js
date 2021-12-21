const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')
const Story = require("../models/Story")
let Name
let Name1
router.get('/addStory',authenticate, (req, res) => {
    Name= req.query.data
   Name1= Name[0].toUpperCase()+Name.slice(1).toLowerCase()
    res.render('addStory',{data:Name,data1:Name1})

})
router.post('/addStory', async (req,res )=>{
   
    
    try{
        
       const newStory=new Story({
           name:req.body.name, 
           title: req.body.title,
           status: req.body.status,
           text: req.body.text,
       })
       if(newStory){
       const story=await newStory.save()
       }
       res.redirect('/storyUser/?data='+Name)
      
    }
    catch(err){
        res.render('home',{errorMessage:'Status 500 ,An error happened!'})
    }
    
})
module.exports = router 

