import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [ true, "Email is required"],
        unique: [ true, "Email must be unique"],
        trim: true,
        lowercase: true,
        validate: {
            validate: (value) => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email`
        },
    },
    password: {
        type: String,
        require: true,
        minlength: [8, "Password must be at least 8 character long"],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'manager', 'user'],
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async (next) => {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = bcrypt.getSalt();
    const hashedPassword = bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    return next();
});

userSchema.methods.checkPassword = async (password) => {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
