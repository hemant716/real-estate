import express from 'express';
import {
  googleAuth,
  signin,
  signOut,
  signup
} from '../controllers/auth.controller.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', googleAuth);
router.post('/signout', signOut); // Changed from GET to POST

export default router;
