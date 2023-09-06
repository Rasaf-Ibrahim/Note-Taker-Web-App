// importing cookie-parser library 
import cookieParser from 'cookie-parser';

// importing types
import { Express } from 'express'


function cookie_parser_middleware(app:Express) {

    app.use(
        cookieParser()
    )
}


 
export default cookie_parser_middleware