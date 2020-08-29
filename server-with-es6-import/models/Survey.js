import mongoose from 'mongoose';

import Recipient from './Recipient.js';

const { Schema } = mongoose;

const surveySchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    subject: {
        type: String
    },
    recipients: {
        type: [Recipient.schema]
    },
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: {
        type: Date
    },
    lastResponded: {
        type: Date
    }
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;