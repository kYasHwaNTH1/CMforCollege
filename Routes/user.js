const {Router} =require('express')
const userauth = require('../Authentication/userauth')
const validschema=require('../Validation/uservalid')
const {UserModel,IssuesModel}=require('../schema')
const userRouter=Router()
const jwt=require('jsonwebtoken')
const passkey=process.env.USERSECURE

userRouter.post('/signup',async(req,res)=>{
        const email=req.body.email
        const password=req.body.password
        const firstname=req.body.firstname
        const lastname=req.body.lastname

        const validation = validschema.safeParse(req.body);

        if (!validation.success) {
          return res.status(400).json({
            message: "Invalid format",
            errors: validation.error.errors.map((err) => err.message), // Return detailed errors
          });
        }
        try{
        await UserModel.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password
        })
        res.status(201).json({msg:"signup successful"})
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})
userRouter.post('/signin',async(req,res)=>{
        const email = req.body.email
        const password = req.body.password
        const role=req.body.role
        try{
        if(role=="user"){
            const user=await UserModel.findOne({email:email, password:password})
            if(!user){
                return res.status(401).json({msg:"Invalid email or password"})
            }
             const token=jwt.sign({id:user._id},passkey);
             res.json({token:token,msg:"Login successful"})
        }
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

userRouter.use(userauth)

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