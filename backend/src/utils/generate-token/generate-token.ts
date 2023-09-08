/*__________________________________________

 ✅ import
____________________________________________*/

// libraries
import jwt from 'jsonwebtoken';

// types
import { Types } from 'mongoose';
import config_obj from '../../config/index.js';



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_generate_token = {
    user_id: Types.ObjectId

    // in future, I may add more type of token
    token_type: 'access' 
}


/*__________________________________________

 ✅ util
____________________________________________*/

export default function generate_token (payload:type_of_generate_token): string | undefined {

    const {
        user_id,
        token_type
    } = payload


    /* 🥪 access token 🥪 */
    if (token_type === 'access') {

        let access_token = jwt.sign(

            { user_id },

            config_obj.env.jwt_access_token_secret, 
            
            { expiresIn: config_obj.env.jwt_access_token_expiration_time}
        )

        return access_token
    }


    /* 
        //  Just having an example
        else if (token_type === 'refresh') {

            //..

            return ..
        } 
    */

}



