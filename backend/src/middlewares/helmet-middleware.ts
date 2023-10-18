/*__________________________________________

 ✅ import
____________________________________________*/

// helmet library
import helmet from "helmet"

// types
import { Express } from 'express'


/*__________________________________________

 ✅ helmet_middleware
____________________________________________*/

export default function helmet_middleware (app:Express) {

    

    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                mediaSrc: ["'self'", 'data:']
            }
        })
    )
    
}  


