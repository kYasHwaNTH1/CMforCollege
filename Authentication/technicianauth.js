const jwt=require('jsonwebtoken')
const passkey=process.env.TECHNICIANSECURE
function technicianauth(req,res,next){
    const token =req.header.token;
  if(!token){
    return res.status(401).send("Invalid token")
  }
  const technicianid=jwt.verify(token,passkey);
  if(userid){
     req.id=technicianid;
  }
next()
}
module.exports=technicianauth