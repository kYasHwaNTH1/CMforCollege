const {Router}=require('express')
const adminRouter=Router()
const {AdminModel,IssuesModel, TechnicianModel}=require('../schema')
const validschema=require('../Validation/uservalid')
const adminauth=require('../Authentication/adminauth')
const technicianauth = require('../Authentication/technicianauth')
const jwt=require('jsonwebtoken')
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
        password:password,
        role:"admin"
    })
    res.status(201).json({ success: true });

}
catch(err){
    res.status(500).json({msg:err})
}
})

adminRouter.post('/signin',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const role=req.body.role
    console.log(req.body)
    try{
    if(role==="admin"){
        const user=await AdminModel.findOne({email:email, password:password})
        if(!user){
            return res.status(401).json({msg:"Invalid email or password"})
        }
         const token=jwt.sign({id:user._id},passkey);
         const firstname=user.firstname;
         const lastname=user.lastname;
         res.status(200).json({token:token,firstname:firstname,lastname:lastname})
    }
    else{
        res.status(400).send("NO USER ")
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
    const adminid=req.id;
    try{
    const user=await AdminModel.findOne({_id:adminid})
    
    if(!user){
       return res.status(404).json({msg:"User not found"})
    }
    if(user.password!==oldpassword){
       return res.status(401).json({msg:"Incorrect old password"})
    }
    user.password = newpassword;
    await user.save();
    res.status(201).json({ success: true });
   }
   catch(err){
       res.status(500).json({msg:err.message})
    }
})

adminRouter.get('/gettechnicians',async(req,res)=>{
    try{
        const technicians=await TechnicianModel.find({});
        if(!technicians){
            return res.status(404).json({msg:"No technicians found"})
        }
        console.log(technicians)
        res.send(technicians)
    }
    catch(err){
       res.status(500).json({msg:err.message})
    }
})
adminRouter.get('/technicianissues/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const technicianid=await TechnicianModel.find({_id:id})
    const issues=await IssuesModel.find({technicianid:technicianid})
    console.log(issues)
    res.send(issues)
    }
    catch(err){
    res.status(500).json({msg:err.message})
    }
})

adminRouter.get('/myissues',async(req,res)=>{
   
    try{
    const issues=await IssuesModel.find({})
    console.log(issues)
    res.send(issues)
    }
    catch(err){
    res.status(500).json({msg:err.message})
    }
})

adminRouter.put('/changestatus',async(req,res)=>{
    const id=req.id;
    try{
        const issueid=req.headers.issueid;
        const issue=await IssuesModel.findById({_id:issueid})
        if(!issue){
            return res.status(404).json({msg:"Issue not found"})
        }
        issue.stateoftheissue = !issue.stateoftheissue;
        

        await issue.save();

        res.json({success:true});
    }
    catch(err){
        return res.status(500).json({ msg: err.message });
    }
})

module.exports={adminRouter}