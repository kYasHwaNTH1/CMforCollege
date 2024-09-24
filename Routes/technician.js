const {Router}=require('express')
const technicianRouter=Router()
const {TechnicianModel,IssuesModel}=require('../schema')
const validschema=require('../Validation/uservalid')
const technicianauth=require('../Authentication/technicianauth')
const passkey=process.env.TECHNICIANSECURE

technicianRouter.post('/signup',async(req,res)=>{
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
    await TechnicianModel.create({
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
         res.json({token:token,msg:"Login successful"})
    }
}
catch(err){
    res.status(500).json({msg:err.message})
}
})

technicianRouter.use(technicianauth)

technicianRouter.put('/changepassword',async(req,res)=>{
    res.json({msg:"change password endpoint"})
})

technicianRouter.get('/myissues',async(req,res)=>{
    res.json({msg:"myissues endpoint"})
})

module.exports={technicianRouter}