import mongoose, { Schema } from 'mongoose';
const subscriptionSchema = new Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    },
    fields: {
        type: [String],
        required: true
    }
});



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    subscription: {
        type: [subscriptionSchema],
        default: [],
    }
});



export default mongoose.model('User', UserSchema);