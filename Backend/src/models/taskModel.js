import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    description: { type: String },
    status: { type: Boolean },
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    createdAt: { type: Date, default: Date.now }
})

const Task = mongoose.model('Task', taskModel)
export default Task;    