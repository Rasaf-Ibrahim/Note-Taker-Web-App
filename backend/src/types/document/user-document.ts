import mongoose from "mongoose"


export type type_of_a_user_document = {

    _id?: mongoose.Types.ObjectId
    full_name?: string
    username?: string
    email?: string
    is_email_verified?: boolean
    google_id?: string
    password?: string
    password_confirm?: string
    picture_link?: string
    role?: 'user' | 'admin'
    last_signed_in_unix_timestamp?: string
    last_access_unix_timestamp?: string
    auth_provider?: 'email' | 'google' | 'facebook' | 'github'
    email_verification_otp_expiration_unix_timestamp?: number
    password_reset_otp_expiration_unix_timestamp?: number
    createdAt?: Date
    updatedAt?: Date
}
