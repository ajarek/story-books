const express = require("express")
const router = express.Router()
const Story = require("../models/Story")
const mysort = {updatedAt:-1}

router.get('/', async(req, res) => { 
   try {
    let stories
    stories = await Story.find({status:'Public'}).sort(mysort)
    res.render('home', {
        mystories:stories
    })
} catch (err) {
    res.status(500).send(err)
}    
})
module.exports = router