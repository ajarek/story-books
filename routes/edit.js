const router = require('express').Router()
const Story = require('../models/Story')

    router.get('/edit/:id',async(req,res)=>{
        const{id}=req.params
        const getData =await Story.findOne({_id:id}) 
        res.render('edit',{Story:getData})
    })
    .post('/edit/:id',(req,res)=>{
        const{id}=req.params
        const {name,title,status,text}=req.body
        Story.updateOne({_id:id},{name,title,status,text})
        .then(()=>{
            console.log('successfuly! updated the Post!')
            res.redirect('/')
        })
        .catch(err=>console.log(err))
    })
 
    
    module.exports=router