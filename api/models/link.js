import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clicks: {
        type: [Date],
        default: [],
    }
});

export default mongoose.model('Link', linkSchema);
