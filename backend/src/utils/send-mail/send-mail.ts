/*__________________________________________

 ✅ import
____________________________________________*/

// libraries
import nodemailer from "nodemailer"
import sendinblue_transport from 'nodemailer-sendinblue-transport'
import dotenv from 'dotenv'

// utils
import html_template_for_confirm_email from "./_html-template-for-confirm-email.js"
import html_template_for_password_reset from "./_html-template-for-password-reset.js"
import config_obj from "../../config/index.js"

// dotenv
dotenv.config()


/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_send_mail = {
    email: string,
    option: 'email verification' | 'password reset',
    otp: number
}



/*__________________________________________

 ✅ util
____________________________________________*/

const send_mail = async (payload: type_of_send_mail): Promise<number | undefined> => {

    /* 🥪 payload 🥪 */
    const {
        email,
        otp,
        option
    } = payload


    /* 🥪  environment variables 🥪 */

    const frontend_site_name: string = config_obj.env.frontend_site_name

    const brevo_api_key: string = config_obj.env.brevo_api_key

    const email_of_the_mail_sender: string = config_obj.env.email_of_the_mail_sender



    /* 🥪  transporter 🥪 */
    const transporter = nodemailer.createTransport(
        new sendinblue_transport({
            apiKey: brevo_api_key
        })
    )



    /* 🥪 email verification 🥪 */
    if (option === 'email verification') {

        const mailOptions: nodemailer.SendMailOptions = {
            from: `${frontend_site_name} < ${email_of_the_mail_sender} >`,
            to: email,
            subject: `${config_obj.env.frontend_site_name} - Email Verification Instructions`,
            html: html_template_for_confirm_email(otp)
        }

        const mailSent: any = transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                // console.log(info)
            }
        })

        if (mailSent) return Promise.resolve(1)
    }


    /* 🥪 forgot password🥪 */
    else if (option === 'password reset') {


        const mailOptions: nodemailer.SendMailOptions = {
            from: `${frontend_site_name} < ${email_of_the_mail_sender} >`,
            to: email,
            subject: `${config_obj.env.frontend_site_name} - Password Reset Instructions`,
            html: html_template_for_password_reset(otp)
        }

        const mailSent: any = transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
            else {
                // console.log(info)
            }
        })

        if (mailSent) return Promise.resolve(1)
    }
}



export default send_mail
