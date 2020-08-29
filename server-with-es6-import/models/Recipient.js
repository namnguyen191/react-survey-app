import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: {
        type: String
    },
    responded: {
        type: Boolean,
        default: false
    }
});

const Recipient = mongoose.model('Recipient', recipientSchema);

export default Recipient;
