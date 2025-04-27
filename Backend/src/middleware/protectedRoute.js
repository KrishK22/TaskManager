import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";



export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized no token provided "
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.status(401).json({
                message: "unAuthorized - Invalid Token"
            })
            return
        }

        const user = await userModel.findById(decoded.userId).select("-password")

        if (!user) {
            res.status(404).json({
                message: "User not found !"
            })
            return
        }
        req.user = user;
        next()

    } catch (error) {
        console.log(`${error.message} found in protedtedroute`)
        res.status(500).json({
            message: "Something went wrong "
        })
    }
}