import { Request } from "express";


export interface type_of_request_with_user_id extends Request {
    user: {
        _id: string
    }
}
