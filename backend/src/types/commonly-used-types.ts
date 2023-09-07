// 🍪 we will use the following type when we don't need any type safety
export type type_of_anything = any



// 🍪 An object with the following type can have any number of properties with string or number keys, and the values can be of any type. 
export type type_of_obj_with_any_values = {

    [key: string | number]: any

}


// 🍪  An array with the following type can have any number of any type elements
export type type_of_array_with_any_elements = any[]



// 🍪 A function with the following type can have any number of parameters with any type, can return anything with any type or can return nothing 


export type type_of_func_prop_with_no_rule = (...args: any[]) => any | void



// 🍪 mongoose related types
export type type_of_created_document = {
    _id?: import("mongoose").Types.ObjectId
    _doc?: type_of_anything
}


export type type_of_updated_document = {
    _id?: import("mongoose").Types.ObjectId
    _doc?:type_of_obj_with_any_values
}