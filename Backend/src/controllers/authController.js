import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/generateToken.js'


export const signup = async (req, res) => {
    try {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        const foundUser = await UserModel.findOne({ email })
        if (foundUser) return
        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)

            res.status(201).json({
                message: "User successfully created",
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                }
            })

        }




    } catch (error) {

    }
}