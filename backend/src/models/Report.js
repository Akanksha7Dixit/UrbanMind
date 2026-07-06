const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(

{

title:{
type:String,
required:true,
trim:true,
},

category:{
type:String,
required:true,
enum:[
"Health",
"Infrastructure",
"Environment",
"Simulation",
"Analytics",
],
},

description:{
type:String,
default:"",
},

status:{
type:String,
enum:[
"Generated",
"Draft",
"Archived",
],
default:"Generated",
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true,
},

/* ---------- Snapshot ---------- */

analytics:{
type:Object,
default:{},
},

dashboard:{
type:Object,
default:{},
},

issues:{
type:Object,
default:{},
},

infrastructure:{
type:Object,
default:{},
},

recommendations:{
type:Object,
default:{},
},

/* ------------------------------ */

summary:{

type:String,

default:"",

},

fileUrl:{
type:String,
default:"",
},

createdAt:{
type:Date,
default:Date.now,
},

updatedAt:{
type:Date,
default:Date.now,
},

},

{

timestamps:true,

}

);

module.exports=

mongoose.model(

"Report",

reportSchema

);