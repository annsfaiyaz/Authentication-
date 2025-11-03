import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    forgotPasswordToken: {
        type: String,
        default: null,
    },
});

// Create and export the User model
export const User = mongoose.models.User || mongoose.model('User', userSchema);