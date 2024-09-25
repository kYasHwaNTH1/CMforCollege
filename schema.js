const mongoose=require('mongoose');
const { type } = require('os');
const Schema=mongoose.Schema
const ObjectId= mongoose.Types.ObjectId;

const UserSchema=new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String
})
const AdminSchema=new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String
})
const TechnicianSchema=new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String,
    workload:Number,
    workbench:String
})

const IssueSchema=new Schema({
    branch:String,
    lab:String,
    location:String,
    issuetype:String,
    exactissue:String,
    stateoftheissue:{type:String,default:false},
    userid:ObjectId,
    technicianid:ObjectId
})

const UserModel=mongoose.model('user',UserSchema)
const AdminModel=mongoose.model('admin',AdminSchema)
const TechnicianModel=mongoose.model('technician',TechnicianSchema)
const IssuesModel=mongoose.model('issues',IssueSchema)

module.exports={
     UserModel,
     AdminModel,
     TechnicianModel,
     IssuesModel,
}