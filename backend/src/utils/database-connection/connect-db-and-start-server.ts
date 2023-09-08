/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from '../../config/index.js'

// packages
import mongoose from 'mongoose'

// types
import { Express } from 'express'



/*__________________________________________

 ✅ util
____________________________________________*/
const connect_db_and_start_server = async (app: Express): Promise<void> => {

    try {
        // Connect to MongoDB
        await mongoose.connect(config_obj.env.mongodb_uri as string)

        // After the MongoDB is connected, start to listen for requests
        const port = config_obj.env.port || 4000;
        app.listen(port, () => {
            console.log(`MongoDB is connected & server is listening on port: ${port}`)
        })

    }
    
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connect_db_and_start_server
