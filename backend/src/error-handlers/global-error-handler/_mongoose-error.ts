// Define the shape of the error object
interface ErrorObject {
    name?: string;
    code?: number;
    keyValue?: Record<string, unknown>;
    value?: string;
    errors?: Record<string, {
      properties: {
        type: string;
        message?: string;
        min?: number;
        max?: number;
        enumValues?: string[];
        regexp?: RegExp;
      };
    }>;
  }
  

  // Define the shape of the error parameter
  interface CustomError {
    message: string;
    errorObject: ErrorObject;
  }

  






const mongoose_error = (err: CustomError): string | void => {


   



    // validationError
    if (err.errorObject.name && err.errorObject.name === 'ValidationError') {   

        // get the keys of the errors object, which are the names of the fields that have validation errors
        const errorKeysArray = Object.keys(err.errorObject.errors)

        // map each key to a message that uses the error properties
        const errorMessageArray = errorKeysArray.map(key => {

            // get the error object for the key
            const errorObj = err.errorObject.errors[key].properties

            // return a different message depending on the error type
            switch (errorObj.type) {

                

                case 'required':
                    return  `'${key}' is a required field.` 

                case 'min':
                    return  `'${key}' must be at least ${errorObj.min}.` 

                case 'max':
                    return `'${key}' must be at most ${errorObj.max}.`  

                case 'enum':
                    return `'${key}' must be one of these values: ${errorObj.enumValues.join(', ')}.`

                case 'regexp':
                    return `'${key}' must match the format ${errorObj.regexp}.`

                // For any other types of error
                default:
                    return `${key} field error: ${errorObj.message}`
            }
        })

        // join the messages with a space to form a single string
        const errorMessage = errorMessageArray.join(' ')

        // assign the message to err.message, which will be returned to the client
        return err.message = errorMessage;
    }



    

    // duplicated key
    else if (err.errorObject.code && err.errorObject.code === 11000) {

        // get the duplicated key (name of the field that have duplicate value)
        const duplicated_key = Object.keys(err.errorObject.keyValue)

        // error message
        const error_message = `The provided ${duplicated_key} already exists in the database. Provide a different one.`

        // assign the error_message to err.message, which will be returned to the client
        return err.message = error_message
    }



    // CastError (When mongoDB's _id property's size doesn't match)
    else if (err.errorObject.name && err.errorObject.name === 'CastError') {

        const error_message =  `There is no document in the database with the id: ${err.errorObject.value}`

        return err.message = error_message 

    }


}


export default mongoose_error

