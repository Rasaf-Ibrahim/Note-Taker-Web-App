/*__________________________________________

 ✅ import
____________________________________________*/

// package
import bcrypt from 'bcryptjs'



/*__________________________________________

 ✅ util - hash_password
____________________________________________*/

// hash password
const hash_password = async (password: string): Promise<string> => {
    // hash the password 
    let salt = await bcrypt.genSalt(10)
    let hashed_password = await bcrypt.hash(password, salt)

    return hashed_password
}


/*__________________________________________

 ✅ util - compare_passwords
____________________________________________*/

// compare passwords
const compare_passwords = async (login_password: string, hashed_password: string): Promise<boolean> => {

    return await bcrypt.compare(login_password, hashed_password)
}


export {
    hash_password,
    compare_passwords
}
