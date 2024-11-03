const {Router}=require('express')
const technicianRouter=Router()
const {TechnicianModel,IssuesModel}=require('../schema')
const validschema=require('../Validation/uservalid')
const technicianauth=require('../Authentication/technicianauth')
const jwt=require('jsonwebtoken')
const passkey=process.env.TECHNICIANSECURE

technicianRouter.post('/signup',async(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const workbench=req.body.workbench

    console.log(req.body)
    const validation = validschema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid format",
        errors: validation.error.errors.map((err) => err), // Return detailed errors
      });
    }
    try{
    await TechnicianModel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password,
        workload:0,
        workbench:workbench,
        role:"technician"
    })
    console.log("user created")
    res.status(201).json({ success: true });

}
catch(err){
    res.status(500).json({msg:err.message})
}
})
technicianRouter.post('/signin',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const role=req.body.role
    try{
    if(role=="technician"){
        const user=await TechnicianModel.findOne({email:email, password:password})
        if(!user){
            return res.status(401).json({msg:"Invalid email or password"})
        }
         const token=jwt.sign({id:user._id},passkey);
         const firstname=user.firstname;
         const lastname=user.lastname;
         res.json({token:token,firstname:firstname,lastname:lastname})
    }
}
catch(err){
    res.status(500).json({msg:err.message})
}
})

technicianRouter.use(technicianauth)

technicianRouter.put('/changepassword',async(req,res)=>{
    const oldpassword=req.body.oldpassword
     const newpassword=req.body.newpassword

    const technicianid=req.id;
    try{
    const user=await TechnicianModel.findOne({_id:technicianid})
    
    if(!user){
       return res.status(404).json({msg:"User not found"})
    }
    if(user.password!==oldpassword){
       return res.status(401).json({msg:"Incorrect old password"})
    }
    user.password = newpassword;
    await user.save();
    res.json({success:true})
   }
   catch(err){
       res.status(500).json({msg:err.message})
    }
})

technicianRouter.get('/myissues',async(req,res)=>{
        const id=req.id;
        try{
        const issues=await IssuesModel.find({technicianid:id})
        console.log(issues)
        res.send(issues)
        }
        catch(err){
        res.status(500).json({msg:err.message})
        }
})

technicianRouter.put('/changestatus',async(req,res)=>{
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

module.exports={technicianRouter}