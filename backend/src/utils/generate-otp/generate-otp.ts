export default function generate_otp():number {

    // This will generate a 6 digit number
    let otp = Math.floor(100000 + Math.random() * 900000)

    return otp
}