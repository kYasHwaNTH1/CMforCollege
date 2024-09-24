const {Router}=require('express')
const adminRouter=Router()
const {AdminModel,IssuesModel}=require('../schema')
const validschema=require('../Validation')
const adminauth=require('../Authentication/adminauth')
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
    res.json({msg:"change password endpoint"})
})

adminRouter.put('/issues',async(req,res)=>{
    res.json({msg:"issues endpoint"})
})


adminRouter.get('/allissues',async(req,res)=>{
    res.json({msg:"allissues endpoint"})
})

module.exports={adminRouter}