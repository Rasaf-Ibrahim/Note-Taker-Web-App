import mongoose from "mongoose"


export type type_of_a_rte_note_document = {

    _id?: mongoose.Types.ObjectId,
    user_id?: mongoose.Types.ObjectId,
    title?: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date
}


