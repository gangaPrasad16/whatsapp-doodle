import mongoose  from "mongoose";


const Schema = mongoose.Schema(
    {
        groupLink:{
            type: String,
            require: true
        },
        category:{
            type:String,
            require: true
        },
        groupName:{
            type:String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

export const Group = mongoose.model("Group", Schema);