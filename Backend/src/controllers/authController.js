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

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log(`${error.message}  found in signup controller`)
        res.status(500).json({
            message: "Internal Server Error "
        })
    }
}

export const login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password

        const foundUser = await UserModel.findOne({ email })
        if (!foundUser) {
            res.status(500).json({
                message: 'Invalid Credentials'
            })
        }

        const hashPassword = foundUser.password
        const checkPass = await bcrypt.compare(password, hashPassword)
        if (!checkPass) {
            res.status(500).json({
                mesasge: "Invalid Credentials"
            })
        }

        generateToken(foundUser._id.toString(), res)
        res.status(201).json({
            message: "User Found",
            user: {
                id: foundUser._id.toString(),
                fullName: foundUser.fullName,
                email: foundUser.email,
            }
        })


    } catch (error) {
        console.log(`${error} found in login controller`)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const checkAuth = (req, res) => {
    try {
        const userId = req.user._id;
        const user = req.user
        if (!userId) {
            res.status(400).json({
                message: "unauthorized"
            })
        }
        res.status(201).json({
            message: 'authenticated',
            user: user
        })
    } catch (error) {
        console.log(`${error} found in checkAuth controller`)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({
            message: "LoggedOut Successfully "
        });

    } catch (error) {
        console.log(`${error.message} found in logout controller`)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
