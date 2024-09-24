const {Router}=require('express')
const technicianRouter=Router()

technicianRouter.post('/signup',async(req,res)=>{
    res.json({msg:"singup endpoint"})
})
technicianRouter.post('/signin',async(req,res)=>{
    res.json({msg:"singin endpoint"})
})

technicianRouter.put('/changepassword',async(req,res)=>{
    res.json({msg:"change password endpoint"})
})

technicianRouter.get('/myissues',async(req,res)=>{
    res.json({msg:"myissues endpoint"})
})

module.exports={technicianRouter}