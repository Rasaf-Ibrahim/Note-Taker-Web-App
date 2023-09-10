/*__________________________________________

 ✅ import
____________________________________________*/

// libraries
import mongoose from 'mongoose'
import { z } from 'zod'

// utils
import { hash_password } from '../utils/hash-password/hash-password.js'


/*__________________________________________

 ✅ schema
____________________________________________*/


const user_schema = new mongoose.Schema({



    auth_provider: {
        type: String,
        required: true,
        enum: ["email", "google", "github"],
        default: 'email',
    },


    full_name: {

        type: String,
        required: true,
    },



    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9_]{3,20}$/, 'Username must contain only letters, numbers, and underscores, and be between 3 and 20 characters long.']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

        validate: {
            validator: (value: string) => {
                return z.string().email().safeParse(value).success
            },
            message: props => `${props.value} is not a valid email!`
        }

    },

    is_email_verified: {
        type: Boolean,
        default: function () {
            return this.auth_provider !== 'email'
        }
    },

    google_id: {
        type: String,
        select: false,
        required: function () {
            return this.auth_provider === 'google' ? true : false
        },
    },

    github_id: {
        type: String,
        select: false,
        required: function () {
            return this.auth_provider === 'github' ? true : false
        },
    },

    password: {
        type: String,
        select: false,
        required: function () {
            return this.auth_provider === 'email' ? true : false
        },
        validate: {
            validator: (value: string) => {
                return z.string().min(8)
                    .refine(password => (
                        /[a-z]/.test(password) && // At least one lowercase letter
                        /[A-Z]/.test(password) && // At least one uppercase letter
                        /[0-9]/.test(password) && // At least one numerical value
                        /[^a-zA-Z0-9]/.test(password) // At least one symbol
                    ))
                    .safeParse(value).success;
            },
            message: 'Password must be 8 characters long. Password must have at least 1 lowercase letter, 1 uppercase letter, 1 numerical value & 1 symbol.'
        }

    },



    password_confirm: {
        type: String,
        required: function () {
            return this.auth_provider === 'email' ? true : false
        },
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match.'
        }
    },

    picture_link: {
        type: String,
    },

    picture_public_id: {
        type: String
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    

    last_signed_in_unix_timestamp: {
        type: String,
        required: true
    },



    last_access_unix_timestamp: {
        type: String,
        required: true
    },

    email_verification_otp_expiration_unix_timestamp: {
        type: String
    },

    sent_email_verification_otp: {
        type: String
    },

    password_reset_otp_expiration_unix_timestamp: {
        type: String
    },

    sent_password_reset_otp: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false // disable versioning
})



/*__________________________________________

 ✅ pre('save') middleware
____________________________________________*/


user_schema.pre('save', async function (next) {

    // checking whether the password is modified 
    if (this.isModified('password')) {

        // hashing the password before saving
        this.password = await hash_password(this.password);
    }

    // delete password_confirm field 
    this.password_confirm = undefined


    // next 
    next()
})



/*__________________________________________

 ✅ model and index
____________________________________________*/

// creating the model
const user_model = mongoose.model('user_model', user_schema)


// Sync indexes in mongoDB
user_model.syncIndexes()
    .then(() => { /* Do nothing here */ })
    .catch((err) => { console.error('Error syncing indexes of user_model', err) })


/*__________________________________________

 ✅ export
____________________________________________*/
export default user_model









