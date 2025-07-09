import User from '../models/user.model.js'; // Assuming you have a User model defined in models/user.model.js
import Message from '../models/message.model.js'; // Assuming you have a Message model defined in models/message.model.js
export const getAllLogedUsers = async (req, res) => {
    try {
        // Assuming you have a User model to fetch users from the database
        const loggedInUsers = req.user._id; // Get the logged-in user's ID from the request
        const users = await User.find({ _id: { $ne: loggedInUsers } }).select('-password -phone'); // Exclude password field for all users except the logged-in user
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:useToChatId } = req.params; // Get the user ID from the request parameters
        const myid = req.user._id; // Get the sender's ID from the request user object

        const messages = await Message.find({
            $or: [
                { sender: myid, receiver: useToChatId },
                { sender: useToChatId, receiver: myid }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by creation date
        if (!messages) {
            return res.status(404).json({ message: 'No messages found' });
        }
        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image } = req.body; // Get the message text and image from the request body
        const { id: useToChatId } = req.params; // Get the user ID
        const myid = req.user._id; // Get the sender's ID from the request user object
        if (!text && !image) {
            return res.status(400).json({ message: 'Message text or image is required' });
        }
        let attachments = []; // Initialize attachments array
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image, {
                folder: 'chat-app/messages',
                resource_type: 'image'
            });
            attachments = [uploadedImage.secure_url]; // Store the uploaded image URL
        }

        const newMessage = new Message({
            sender: myid, // Set the sender's ID
            receiver: useToChatId, // Set the receiver's ID
            content: text, // Set the message text
            attachments: attachments // Set the attachments array
        });
        await newMessage.save(); // Save the message to the database
        return res.status(201).json({ message: 'Message sent successfully', data: newMessage });

    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // Assuming you have a User model to fetch users from the database
        const users = await User.find({}, '-password'); // Exclude password field
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}