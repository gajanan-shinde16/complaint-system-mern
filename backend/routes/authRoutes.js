import express from 'express';
import {register , login , logout} from '../controllers/authController.js';
const router = express.Router();


// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logout);

export default router;