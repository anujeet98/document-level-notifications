import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }
});

export default model('Post', postSchema);
