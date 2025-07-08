import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    password: { type: String, required: true, minlength: 6},
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    firstName: { type: String, required: true, minlength: 2, maxlength: 30 },
    lastName: { type: String, required: false, minlength: 2, maxlength: 30 },
    isAdmin: { type: Boolean, default: false },
    isVIP: { type: Boolean, default: false },
    profilePicture: { type: String, default: 'default.jpg' },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;