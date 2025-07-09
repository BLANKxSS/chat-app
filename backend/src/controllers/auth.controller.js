import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
    
    const { username, password, email, firstName, lastName, phone } = req.body;
    try {
        // hash the password
        if (password.length < 6) {
                return res.status(400).send('Password must be at least 6 characters long');
        }
        // validate username
        if (username.length < 3 || username.length > 20) {
            return res.status(400).send('Username must be between 3 and 20 characters long');
        }
        // validate email
        if (!email || !email.includes('@')) {
            return res.status(400).send('Invalid email address');
        }
        // validate first name and last name
        if (firstName.length < 2 || firstName.length > 30) {
            return res.status(400).send('First name must be between 2 and 30 characters long');
        }
        // validate phone number
        if (!phone || phone.length < 9) {
            return res.status(400).send('Phone number must be at least 9 characters long');
        }
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).send('Email already exists');
        }

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
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
            phone,
            isAdmin: false, // default to false
            isVIP: false, // default to false
            firstName,
            lastName,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({ 
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    profilePicture: newUser.profilePicture,
                    isAdmin: newUser.isAdmin || false,
                    isVIP: newUser.isVIP || false,
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