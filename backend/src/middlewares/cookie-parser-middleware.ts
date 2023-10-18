/*__________________________________________

 ✅ import
____________________________________________*/

// cookie-parser library 
import cookieParser from 'cookie-parser';

// types
import { Express } from 'express'


/*__________________________________________

 ✅ cookie_parser_middleware
____________________________________________*/

export default function cookie_parser_middleware(app:Express) {

    app.use(
        cookieParser()
    )
}


