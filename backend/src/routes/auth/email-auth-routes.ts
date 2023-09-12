/*__________________________________________

 ✅ import
____________________________________________*/

//  express
import express from 'express'

// controllers
import {
    signup_user,
    send_email_verification_mail,
    verify_email,
    signin_user,
    send_password_reset_mail,
    reset_password,
    change_password
} from '../../controllers/auth/email-auth-controller.js'


// route protection
import {
    no_sign_in_required,
    sign_in_required,
    verified_email_required
} from '../../middlewares/route-protection-middlewares.js'


/*__________________________________________

 ✅ all routes
____________________________________________*/

// 🥪 email_auth_routes
const email_auth_routes = express.Router()


//🥪 signup 
email_auth_routes
    .route('/signup')
    .post(
        no_sign_in_required,
        signup_user
    )

// 🥪 signin user 
email_auth_routes
    .route('/signin')
    .post(
        no_sign_in_required,
        signin_user
    )

// 🥪 send email verification mail 
email_auth_routes
    .route('/send-email-verification-mail')
    .patch(
        sign_in_required,
        send_email_verification_mail
    )


// 🥪 send password reset mail 
email_auth_routes
    .route('/send-password-reset-mail')
    .patch(
        no_sign_in_required,
        send_password_reset_mail
    )

// 🥪 verify email 
email_auth_routes
    .route('/verify-email')
    .patch(
        sign_in_required,
        verify_email
    )


// 🥪 reset password
email_auth_routes
    .route('/reset-password')
    .patch(
        no_sign_in_required,
        reset_password
    )



// 🥪 change password
email_auth_routes
    .route('/change-password')
    .patch(
        sign_in_required,
        verified_email_required,
        change_password
    )



export default email_auth_routes