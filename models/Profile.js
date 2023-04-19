import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10,
    },
    lastName: {
        type: String,
        required: false,
        minLength: 3,
        maxLength: 10,
    },
    bio: String,
    banner: String,
    profilePic: String,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    socials: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female'],
        lowercase: true,
    },
    website: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


const ProfileModel = mongoose.model('Profile', profileSchema);

export default ProfileModel;