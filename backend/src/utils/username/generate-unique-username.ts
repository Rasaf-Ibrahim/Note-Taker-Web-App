/*__________________________________________

 ✅ import
____________________________________________*/
import { nanoid } from 'nanoid';



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

async function generate_unique_username(payload:type_of_generate_unique_username): Promise<string> {

  const {full_name, user_model} = payload
  
  let username = `${full_name.trim().replace(/\s+/g, '_').substring(0, 10)}_${nanoid(8)}`;
    
  while (true) {

    const existingUser = await user_model.findOne({ username: username })
    
    if (!existingUser) {
       // the username is unique, and we can exit the loop
      break 
    }
    
    // regenerate username
    username = `${full_name.trim().substring(0, 10)}_${nanoid(8)}`
  }
  
  return username
}



export default generate_unique_username
  