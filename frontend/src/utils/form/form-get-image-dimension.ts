// types
import { type_of_obj_with_any_values } from "@/types/commonly-used-types"

export default async function form_get_image_dimension(file) {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort()
            reject(new DOMException("Problem parsing input file."))
        };

        reader.onload = () => {
            let image: type_of_obj_with_any_values = new Image()
            image.src = reader.result
            image.onload = function () {
                resolve({ width: this.width, height: this.height })
            }
        }
        reader.readAsDataURL(file);
    })
}