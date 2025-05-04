const UserModel = require("../models/User_Schema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const checkuserExists = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (checkuserExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        //hash the password of user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create a new user
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });
        if (newUser) {
            return res.status(201).json({ success: true, message: "User Created Successfully" });
        }
        return res.status(400)
            .json({ success: false, message: "USer not created" });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Some Error Ocurred" });
    }
}


async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400)
                .json({ success: false, message: "Please fill all the fields" });
        }
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }
        //create user token
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200)
            .json({ success: true, message: "Login Successfull", accessToken });
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ success: false, message: "Some Error Ocurred" });
    }
}

async function changePassword(req,res) {
    try {
        const userid = req.userInfo.id;
        //extract the password old
        const { oldPassword, newPassword } = req.body;
        const user = await UserModel.findById(userid);
        if(!user) {
            return res.status(400).json({success:false,message:"User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({success:false,message:"Invalid Credentials"});
        }
        //hash the password of user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        //update the password
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({success:true,message:"Password Changed Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500)
        .json({success:false,message:"Some Error Ocurred"});
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword
}