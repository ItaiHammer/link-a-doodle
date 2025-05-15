import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    ipAddress: String,
});

const linkSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clicks: [clickSchema],
});

export default mongoose.model('Link', linkSchema);
