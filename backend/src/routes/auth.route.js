import express from 'express';
import { signup, login , logout, updateUserProfile , checkAuth } from '../controllers/auth.controller.js';
import { protectRoute ,} from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);


//Route to update user profile
router.put('/update-profile', protectRoute, updateUserProfile); 

router.get('/check', protectRoute, checkAuth);


export default router;