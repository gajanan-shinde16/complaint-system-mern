import mongoose from "mongoose";
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model("Complaint", complaintSchema);