import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    credits: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

export default User;