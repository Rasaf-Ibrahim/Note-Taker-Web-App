/*__________________________________________

 ✅ import
____________________________________________*/

// library
import mongoose from 'mongoose'
import { boolean } from 'zod'



/*__________________________________________

 ✅ schema & model
____________________________________________*/
const rte_note_schema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_model',
        required: true
    },

    title: {
        type: String,
        required: true
    },

   
    description: {
        type: String,
        required: false
    },


    
    public_id_of_cloudinary_images: {
        type: [String]
    },

    is_bookmarked: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })




const rte_note_model = mongoose.model('rte_note_model', rte_note_schema)



export default rte_note_model

