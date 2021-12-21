const express = require("express")
const router = express.Router()
const Story = require("../models/Story")
const mysort = {updatedAt:-1}

router.get('/read/:id', async(req,res)=>{
    try{
    const {id}=req.params
    const getStory=await Story.findOne({_id:id})
    
    res.render('read',{story:getStory})  
} catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router