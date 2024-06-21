import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    coach: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    players: {
        type: [String],
        required: true,
        default: []
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
        default: []
    }
});



export default mongoose.model('Team', TeamSchema);