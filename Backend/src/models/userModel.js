import mongoose, { Schema } from "mongoose";


const userModel = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    task: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
},
    {
        timestamps: true

    }

)


const User = mongoose.model('User', userModel)
export default User;