import mongoose, { Schema } from "mongoose";


export interface IMessages {
    message: string;
    dateCreated: Date;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken: string;
    verificationTokenExpires: Date;
    resetPasswordToken: string;
    resetpasswordTokenExpires: Date;
    messages: IMessages[];
}

const MessageSchema: Schema<IMessages> = new Schema<IMessages>({
    message : {
        type: String,
        required: true
    },
    dateCreated : {
        type: Date,
        required: true,
        default: Date.now
    }
});

const UserSchema: Schema<IUser> = new Schema<IUser>({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    verificationToken : {
        type: String
    },
    verificationTokenExpires : {
        type: Date
    },
    resetPasswordToken : {
        type: String
    },
    resetpasswordTokenExpires : {
        type: Date
    },
    messages : {
        type: [MessageSchema],
        default: []
    }
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
