require("dotenv").config()
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {

        const header = req.headers.authorization
        if (!header) throw new Error("Invalid")

        const token = header.split(" ")[1]
        if (!token) throw new Error("No Token found")

        const user = jwt.verify(token, process.env.JWT_KEY)
        req.user = user
        
        next()
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = verifyToken