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
export const login = async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const user = await User.findOne({
            $or: [
                { username },
                { email },
                { phone }
            ]
        });
        // Check if user exists
        console.log("user login in :", user.username);
        if (!user) {
            return res.status(404).json({ message: 'invalid credentials' });
        }

      const isAuthenticated = await bcrypt.compare(password, user.password);
        // Check if password is correct
        if (!isAuthenticated) {
            return res.status(401).json({ message: 'invalid credentials' });
        }
        // Generate token and send response
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            isAdmin: user.isAdmin || false,
            isVIP: user.isVIP || false,
        });
    }
    catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const logout = (req, res) => {
    try {
        // Handle user logout logic here
        res.clearCookie('token'); // Clear the token cookie
        res.status(200).json({ message: 'Logged out successfully' });
    }   
    catch (error) {
        console.log('Logout error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateUserProfile = async (req, res) => {
    // update user profile logic here wit profile picture upload
    try {   
        const { profilePicture} = req.body;
        const userId = req.user._id; // Assuming user is authenticated and user ID is available in req.user

        if (!profilePicture) {
            return res.status(400).json({ message: 'Profile picture is required' });
        }
        // Validate the profile picture format 
        const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
            folder: 'chat-app/profile-pictures',
            width: 150,
            height: 150,
            crop: 'fill',
        });
        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        );
        
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const checkAuth = (req, res) => {
    // Check if user is authenticated
    if (req.user) {
        return res.status(200).json({ message: 'User is authenticated', user: req.user });
    } else {
        return res.status(401).json({ message: 'User is not authenticated' });
    }
}

export const isAdmin = async (req, res) => {
    // Check if user is an admin
    const userId = req.user._id; // Assuming user is authenticated and user ID is available in req.user
    const user = await User.findById(userId);
    
    if (user && user.isAdmin) {
        return res.status(200).json({ message: 'User is an admin' });
    } else {
        return res.status(403).json({ message: 'User is not an admin' });
    }
}

export const isVIP = async (req, res) => {
    // Check if user is a VIP
    const userId = req.user._id; // Assuming user is authenticated and user ID is available in req.user
    const user = await User.findById(userId);
    
    if (user && user.isVIP) {
        return res.status(200).json({ message: 'User is a VIP' });
    } else {
        return res.status(403).json({ message: 'User is not a VIP' });
    }
}