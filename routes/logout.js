const express = require('express')
const router = express.Router()
router.get('/logout',async(req,res)=>{
   
	return res
   .cookie('jsonwebtoken','',{maxAge:1})
//    
   .redirect('/login')
   
})
module.exports = router