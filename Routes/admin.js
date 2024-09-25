const {Router}=require('express')
const adminRouter=Router()
const {AdminModel,IssuesModel}=require('../schema')
const validschema=require('../Validation/uservalid')
const adminauth=require('../Authentication/adminauth')
const technicianauth = require('../Authentication/technicianauth')
const passkey=process.env.ADMINSECURE

adminRouter.post('/signup',async(req,res)=>{
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
    await AdminModel.create({
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
adminRouter.post('/signin',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const role=req.body.role
    try{
    if(role=="admin"){
        const user=await AdminModel.findOne({email:email, password:password})
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

adminRouter.use(adminauth)
adminRouter.put('/changepassword',async(req,res)=>{
    const oldpassword=req.body.oldpassword
    const newpassword=req.body.newpassword
    const technicianid=req.id;
    try{
    const user=await AdminModel.findOne({_id:technicianid})
    
    if(!user){
       return res.status(404).json({msg:"User not found"})
    }
    if(user.password!==oldpassword){
       return res.status(401).json({msg:"Incorrect old password"})
    }
    user.password = newpassword;
    await user.save();
    res.json({msg:"Password has been changed successfully"})
   }
   catch(err){
       res.status(500).json({msg:err.message})
    }
})

adminRouter.put('/issues',async(req,res)=>{
    //can change assigned technician 
    const adminid=req.id;
    const issueid=req.body.issueid;
    const newtechnicianid=req.body.technicianid;
   try{
    const issue=await IssuesModel.findOneAndDelete({_id:issueid})
    if(!issue){
       return res.status(404).json({msg:"Issue not found"})
    }
    issue.technicianid = newtechnicianid;
    await issue.save();
   }
catch(err){
    res.status(500).json({msg:err.message})
}
})


adminRouter.get('/allissues',async(req,res)=>{
    const condition=req.body;
    try{
    const issues=await IssuesModel.find({condition})
    res.json(issues)
    }
    catch(err){
    res.status(500).json({msg:err.message})
    }
})

module.exports={adminRouter}