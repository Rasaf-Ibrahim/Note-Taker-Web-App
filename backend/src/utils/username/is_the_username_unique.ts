/*__________________________________________

 ✅ type
____________________________________________*/
type type_of_check_unique_username = {
    username: string,
    user_model: any
}


/*__________________________________________

 ✅ util
____________________________________________*/
export default async function is_the_username_unique(payload: type_of_check_unique_username): Promise<boolean> {

    const { username, user_model } = payload
    
    const user_exist = await user_model.findOne({ username: username });
    
    if (user_exist) {

        // the username is not unique
        return false
    } else {

        // the username is unique
        return true
    }
}
