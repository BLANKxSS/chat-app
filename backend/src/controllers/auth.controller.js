import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    console.log('Signup request received:', req.body);
    const { username, password, email, firstName, lastName } = req.body;
    try {
        // hash the password
        if (password.length < 6) {
                return res.status(400).send('Password must be at least 6 characters long');
        }
        
        const newEmail = new User.findOne({email: email});
        if (newEmail) {
            return res.status(400).send('Email already exists');
        }

        const newUserName = new User.findOne({username: username});
        if (newUserName) {
            return res.status(400).send('Username already exists');
        }

        // hash the password with salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({ 
                user: {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    profilePicture: newUser.profilePicture,
                }
             });
        } else {
            return res.status(400).json({message: 'User creation failed'});    
        }
        

    } catch (error) {
        console.log('Signup error:', error);
        res.status(500).send('Internal Server Error');
    }
}
export const login = (req, res) => {
    // Handle user login logic here
    res.send('Login Page');
}
export const logout = (req, res) => {
    // Handle user logout logic here
    res.send('Logout Page');
}