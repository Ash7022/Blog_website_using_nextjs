import {Schema, model, models} from "mongoose";

const TaskSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
      },
    title:{
        type: String,
        required: [true, "The task title is required"],
        unique: true,
        trim : true,
        maxlength: [40, "title cannot be greateer than the 40 characters"]

    },
    description:{
        type: String,
        required: [true, "The task Description is required"],
        trim : true,
        maxlength: [100, "title cannot be greateer than the 40 characters"]

    },
    
},
{
    timestamps:true,
    versionKey: false,
}
);

export default models.Task || model("Task", TaskSchema);