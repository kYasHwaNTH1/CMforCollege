const {Router} =require('express')
const userauth = require('../Authentication/userauth')
const validschema=require('../Validation/uservalid')
const {UserModel,IssuesModel,TechnicianModel}=require('../schema')
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
            password:password,
            role:"user"
        })
        res.status(201).json({ success: true });

    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})
userRouter.post('/signin',async(req,res)=>{
        const email = req.body.email
        const password = req.body.password
        const role=req.body.role
        console.log(req.body)
        try{
        if(role=="users"){
            const user=await UserModel.findOne({email:email, password:password})
            if(!user){
                return res.status(401).json({msg:"Invalid email or password"})
            }
             const token=jwt.sign({id:user._id},passkey);
             const firstname=user.firstname;
             const lastname=user.lastname;
             res.status(200).json({token:token,firstname:firstname,lastname:lastname})
        }
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

userRouter.use(userauth)

userRouter.post('/issueform',async(req,res)=>{
        const userid=req.id
        const branch=req.body.branch
        const lab=req.body.lab
        const location=req.body.location
        const issuetype=req.body.issuetype
        const exactissue=req.body.exactissue
try{
       const technician=await TechnicianModel.findOne({
        workbench:issuetype
       }).sort({workload:1})
       .exec()
technician.workload++;
await technician.save()
       if(!technician){
        return res.status(404).json({msg:"No technician found "})
       }
     await  IssuesModel.create({
        branch:branch,
        lab:lab,
        location:location,
        issuetype:issuetype,
        exactissue:exactissue,
        stateoftheissue:false,
        userid:userid,
        technicianid:technician._id
       })

       res.json({success:true})
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }

})

userRouter.put('/changepassword',async(req,res)=>{
     const oldpassword=req.body.oldpassword
     const newpassword=req.body.newpassword
     const userid=req.id;
     try{
     const user=await UserModel.findOne({_id:userid})
     
     if(!user){
        return res.status(404).json({msg:"User not found"})
     }
     if(user.password!==oldpassword){
        return res.status(401).json({msg:"Incorrect old password"})
     }
     console.log(newpassword)
     user.password = newpassword;
     await user.save();
     res.json({success:true})
    }
    catch(err){
        res.status(500).json({msg:err.message})
     }
})

userRouter.get('/myissues',async(req,res)=>{
    const userid=req.id;
    try{
        const issues= await IssuesModel.find({userid:userid})
        if(!issues){
            return res.status(404).json({msg:"No issues found"})
        }
        console.log(issues)
        res.send(issues)
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

module.exports={userRouter}