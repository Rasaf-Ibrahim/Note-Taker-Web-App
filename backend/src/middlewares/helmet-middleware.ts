// importing helmet library
import helmet from "helmet"

// importing types
import { Express } from 'express'


function helmet_middleware (app:Express) {

    

    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                mediaSrc: ["'self'", 'data:']
            }
        })
    )
    
}  


export default helmet_middleware

