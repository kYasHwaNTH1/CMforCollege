const jwt=require('jsonwebtoken')
const passkey=process.env.USERSECURE
function userauth(req,res,next){
    const token =req.header.token;
  if(!token){
    return res.status(401).send("Invalid token")
  }
  const userid=jwt.verify(token,passkey);
  if(userid){
     req.id=userid;
  }
next()
}
module.exports=userauth