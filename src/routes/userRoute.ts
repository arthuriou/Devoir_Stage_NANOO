import express from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';


const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/forgot-password', AuthController.forgotPassword)
router.post('/reset-password', AuthController.resetPassword)
router.post('/resend-email-verification-otp', AuthController.resendEmailVerificationOTP)
router.post('/resend-reset-password-otp', AuthController.resendResetPasswordOTP)
router.patch('/update-profile', authenticate, AuthController.updateUserProfile);
router.get('/get-user', authenticate, AuthController.getUser);

export default router;
