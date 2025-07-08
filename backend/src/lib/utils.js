import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expiration time
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: 'strict', // Helps prevent CSRF attacks
    });
    return token;
}