import { User } from '../Models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    // console.log("printing the data of body", req.body)
    const { name, email, password } = req.body

    if (name == "" || email == "" || password == "")
        return res.json({ message: "All fields are required" })
    let user = await User.findOne({ email })
    if (user)
        return res.json({ message: "Already User Exist....!", success: false })
    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashPassword })
    res.json({ message: "User Created Successfully...!", success: true, user })


    // res.json({
    //     message: 'Getting the data from body',
    //     data: req.body
    // })

};

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: "User does not exist", success: false });
    }

    console.log("Entered password:", password);
    console.log("Hashed password:", user.password);
    const validPass = await bcrypt.compare(password, user.password);
    console.log("Password valid?", validPass)
    if (!validPass) {
        return res.json({ message: "Invalid password", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' })

    res.json({ message: `Welcome ${user.name}`,token, success: true })
}
