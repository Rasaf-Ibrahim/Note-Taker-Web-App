/*__________________________________________

 ✅ import
____________________________________________*/

// express
import express from 'express'


// controllers
import {
    rte_cloudinary_image_management,
} from '../controllers/rte-cloudinary-controller.js'




/*__________________________________________

 ✅ All the Routes
____________________________________________*/

// routes
const rte_cloudinary_routes = express.Router()


rte_cloudinary_routes.route('/manage-image').post(rte_cloudinary_image_management)


export default rte_cloudinary_routes