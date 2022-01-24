const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cert = require('./Cert')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password contains known strings!')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            } 
        }
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('Cert', {
    ref: 'Cert',
    localField: '_id',
    foreignField: 'renewdBy'
})

userSchema.methods.toJSON =  function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'JWT_SECRET', {expiresIn: '1 minutes'})
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredenticals =  async (email, password) => {
    // console.log({password})
    const user = await User.findOne({ email })
    // console.log(user)
    if (!user) {
        throw new Error('User not found with this credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    // console.log({isMatch})
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        // console.log(user.password)
    }
    next()
})

// delete User Cert when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Cert.deleteMany({renewdBy: user._id})
    next()
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = User