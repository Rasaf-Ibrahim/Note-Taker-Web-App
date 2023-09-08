export default function html_template_for_password_reset(otp: number): string {

    return (

        `<div style="background-color: #f5f5f5; padding: 20px;">

            <div style="background-color: #fff; color: #121212; border-radius: 10px; padding: 20px;">

                <h2 style="text-align: center;">Reset Password OTP</h2>

                <p style="text-align: center; font-size: 16px;">Your request to reset your password was submitted. If you did not make this request, simply ignore this email. If you did make this request, use the OTP provided below.</p>

                <div style="text-align: center; padding-top: 30px; margin: 0 auto; width: max-content; background:#161616; color: white; border-radius: 5px; padding: 10px;">

                    <span style="font-size: 20px; font-weight: bold;">${otp}</span>

                </div>

                <p style="text-align: center; font-size: 14px; padding-top: 20px;">This OTP is valid for the next 60 minutes.</p>

            </div>

        </div>`
    )
}
