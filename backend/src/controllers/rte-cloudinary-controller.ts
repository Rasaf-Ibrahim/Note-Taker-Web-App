/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from '../config/index.js'

// types
import { Request, Response } from 'express'
import { deleteImagesFromCloudinary, uploadImagesToCloudinary } from 'express-cloudinary-image-handler'



/*__________________________________________

 ✅ rte_cloudinary_image_management

____________________________________________*/


/*💡 Controller's Info 💡

    method: POST

    endpoint: '/api/v1/rte/manage-image'

    access: public
*/



export const rte_cloudinary_image_management = async (req: Request, res: Response) => {

 

    try {

        // Now, we will update the images
        const upload_report = await uploadImagesToCloudinary({
            req: req,
            configuration: {
                formDataFieldName: 'imagesToUpload',
                cloudinaryFolderName: config_obj.env.cloudinary_folder_name,
                maxFileSizeInKB: 1024,
                maxNumberOfUploads: 30,
                deleteAllTempFiles: true,
                useSourceFileName: true
            }
        })

        
        if (upload_report.isError) {
            return res.json({
                status_code: upload_report.errorInfo.statusCode,
                message: upload_report.errorInfo.message
            })
        }



        let result = upload_report.imagesInfo.map((image)=>{
            return {
                src: image.imageSrc,
                publicID: image.imagePublicId,
            }
        })


        // Getting the ids of the images which we need to delete 
        let idsOfImagesToDelete:any = req.body.imagesToDelete


        // Now, we will delete the images
        if (idsOfImagesToDelete && idsOfImagesToDelete.length > 0) {

            const delete_report = await deleteImagesFromCloudinary({
                publicIds: idsOfImagesToDelete
            })

            if (delete_report.isError) {
                return res.json({
                    status_code: upload_report.errorInfo.statusCode,
                    message: upload_report.errorInfo.message
                })
            }

        }

       
        // Sending JSON response
        return res.json({
            status: 'success',
            message: "All the images are successfully uploaded on the cloudinary",
            result: result
        })
    }
    

    catch (error) {
        return res.status(500).json({ error: 'An error occurred while processing your request.' })
    }
}


