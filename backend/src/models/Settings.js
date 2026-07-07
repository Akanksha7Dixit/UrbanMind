const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },

    profile:{
        fullName:{
            type:String,
            default:"",
        },

        email:{
            type:String,
            default:"",
        },

        city:{
            type:String,
            default:"",
        },

        department:{
            type:String,
            default:"",
        },
    },

    notifications:{
        ai:{
            type:Boolean,
            default:true,
        },

        infrastructure:{
            type:Boolean,
            default:true,
        },

        citizen:{
            type:Boolean,
            default:true,
        },
    },

    aiMode:{
        type:String,
        enum:[
            "Balanced",
            "Accurate",
            "Fast",
        ],
        default:"Balanced",
    },

    gisTheme:{
        type:String,
        enum:[
            "Dark",
            "Satellite",
            "Street",
        ],
        default:"Dark",
    },
},
{
    timestamps:true,
}
);

module.exports =
mongoose.model(
    "Settings",
    settingsSchema
);