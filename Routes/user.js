const {Router} =require('express')
const userRouter=Router()

userRouter.post('/signup',async(req,res)=>{
    res.json({msg:"singup endpoint"})
})
userRouter.post('/signin',async(req,res)=>{
    res.json({msg:"singin endpoint"})
})
userRouter.post('/issueform',async(req,res)=>{
    res.json({msg:"issueform endpoint"})
})

userRouter.put('/changepassword',async(req,res)=>{
    res.json({msg:"change password endpoint"})
})

userRouter.get('/myissues',async(req,res)=>{
    res.json({msg:"myissues endpoint"})
})

module.exports={userRouter}