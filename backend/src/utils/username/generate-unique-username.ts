/*__________________________________________

 ✅ import
____________________________________________*/
import { customAlphabet } from 'nanoid'


/*__________________________________________

 ✅ types
____________________________________________*/
type type_of_generate_unique_username = {
    full_name: string,
    user_model: any
}


/*__________________________________________

 ✅ util
____________________________________________*/

// Defining a custom nanoid function with the acceptable character set
const customNanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_', 8);


async function generate_unique_username(payload: type_of_generate_unique_username): Promise<string> {

  const { full_name, user_model } = payload;

  // Processing the full_name to only include a-zA-Z0-9_, replacing other chars with '_'
  let sanitized_name = full_name.replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 8)
  
  let username = `${sanitized_name}_${customNanoid()}` // Length: Not more than 17 Characters which is within the acceptable range of 20 characters
    
  
  while (true) {

    const existingUser = await user_model.findOne({ username: username });
    
    if (!existingUser) {
       // the username is unique, and we can exit the loop
      break
    }
    
    // regenerate username if it's not unique
    username = `${sanitized_name}_${customNanoid()}`
  }
  
  return username
}

export default generate_unique_username