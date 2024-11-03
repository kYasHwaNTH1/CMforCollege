const mongoose=require('mongoose');
const { type } = require('os');
const { boolean } = require('zod');
const Schema=mongoose.Schema
const ObjectId= mongoose.Types.ObjectId;

const UserSchema=new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String,
    role:String
})
const AdminSchema=new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String,
    role:String
})
const TechnicianSchema=new Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String,
    workload:Number,
    workbench:String,
    role:String
})

const IssueSchema=new Schema({
    branch:String,
    lab:String,
    location:String,
    issuetype:String,
    exactissue:String,
    stateoftheissue:{type:Boolean,default:false},
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