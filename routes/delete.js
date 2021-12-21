const express = require('express')
const router = express.Router()
const Story = require("../models/Story")


router.get('/delete/:id',(req,res)=>{
    const{id}=req.params
    Story.deleteOne({_id:id})
    .then(()=>{
        console.log('Deleted Story successfully!')
        res.redirect("/")
    })
     .catch((err)=>console.log(err))
    
})


module.exports = router