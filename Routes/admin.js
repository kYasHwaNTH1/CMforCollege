const {Router}=require('express')
const adminRouter=Router()


adminRouter.post('/signup',async(req,res)=>{
    res.json({msg:"singup endpoint"})
})
adminRouter.post('/signin',async(req,res)=>{
    res.json({msg:"singin endpoint"})
})


adminRouter.put('/changepassword',async(req,res)=>{
    res.json({msg:"change password endpoint"})
})

adminRouter.put('/issues',async(req,res)=>{
    res.json({msg:"issues endpoint"})
})


adminRouter.get('/allissues',async(req,res)=>{
    res.json({msg:"allissues endpoint"})
})

module.exports={adminRouter}