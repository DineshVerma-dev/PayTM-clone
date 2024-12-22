import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const mongoURL = process.env.SECRET;
mongoose.connect(`mongodb+srv://dineshkumarvermadev:${mongoURL}@cluster0.c15k3.mongodb.net`)
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
        required: true,
        unique: true
    },
    balance: Number,
}, { timestamps: true })



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log("error in comparepassword", error)
    }
}

const UserModel = mongoose.model('UserModel', userSchema);
const AccountModel = mongoose.model('AccountModel', accountSchema);

export { UserModel, AccountModel };