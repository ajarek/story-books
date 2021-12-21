const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')
const Story = require("../models/Story")
const mysort = {updatedAt:-1}

let Name
let Name1
router.get('/storyUser/',authenticate, async(req, res) => {
    Name= req.query.data
   Name1= Name[0].toUpperCase()+Name.slice(1).toLowerCase()
   try {
   
    let stories
    stories = await Story.find({name: req.query.data}).sort(mysort)
    res.render('storyUser', {
        mystories:stories,data:Name,data1:Name1
    })
} catch (err) {
    res.status(500).send(err)
}
    
})
module.exports = router
