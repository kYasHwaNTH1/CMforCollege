const jwt=require('jsonwebtoken')
const passkey=process.env.ADMINSECURE
function adminauth(req,res,next){
    const token =req.headers.token;
  if(!token){
    return res.status(401).send("Invalid token")
  }
  const adminid=jwt.verify(token,passkey);
  if(adminid){
     req.id=adminid.id;
  }
next()
}
module.exports=adminauth