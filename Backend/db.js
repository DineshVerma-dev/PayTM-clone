import mongoose, { Mongoose } from 'mongoose';
import { number } from 'zod';


mongoose.connect('mongodb://localhost:27017/paytm')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    balance: Number,
}, { timestamps: true })

const UserModel = mongoose.model('UserModel', userSchema);
const AccountModel = mongoose.model('AccountModel', accountSchema);

export { UserModel, AccountModel };