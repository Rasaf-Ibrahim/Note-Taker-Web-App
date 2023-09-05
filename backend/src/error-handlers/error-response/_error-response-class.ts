
// Define a custom Error class named errorResponseClass that extends the built-in Error class.
class errorResponseClass extends Error {
    // Define properties for the error, including statusCode, status, errorObject, and isOperational.
    statusCode: number;
    status: string;
    errorObject?: Error;
    isOperational: boolean;

    // Define a constructor that takes a message, a statusCode, and an optional errorObject as parameters.
    constructor(message: string, statusCode: number, errorObject?: Error) {

        // Call the super constructor with the message to set the message property
        super(message);

        // Set the statusCode property to the given value
        this.statusCode = statusCode;

        /* Set the status property based on the first digit of the statusCode
           If it starts with 4, it means a client error (e.g. 404 Not Found).
           If it starts with anything else, it means a server error (e.g. 500 Internal Server Error) 
        */
        this.status = `${statusCode}`.startsWith('4') ? 'Failed' : 'Server Error';

        // Set the errorObject property to the given value.
        this.errorObject = errorObject;

        /* 
          Set the isOperational property to true. This indicates that the error is expected and handled by our application logic.
  
          We can use this property to filter out operational errors from other unexpected errors in production.
        */
        this.isOperational = true;

        // This line is needed to correctly compile the custom Error class in TypeScript.
        Object.setPrototypeOf(this, errorResponseClass.prototype);
    }
}

// Export the errorResponseClass class 
export default errorResponseClass;


