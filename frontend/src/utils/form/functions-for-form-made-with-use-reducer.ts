
// 🍪 parent_func_of_reducer_func 🍪
function parent_func_of_reducer_func(initial_state) {

    /* 🍪 reducer_func 🍪*/
    /* you don't need to change the following function, it's for all kind of form! */
    function reducer_func(state, action) {

        switch (action.type) {

            case 'reducer_action___update_input_value':
                return {
                    ...state,

                    form_data: {
                        ...state.form_data,
                        [action.input_name]: action.value,
                    }

                }



            case 'reducer_action___update_image_value':
                return {
                    ...state,

                    form_data: {

                        ...state.form_data,

                        [action.input_name]: {

                            value: action.new_value,
                            preview_link: action.new_preview_link
                        }

                    }

                }



            case 'reducer_action___remove_image':
                return {
                    ...state,

                    form_data: {

                        ...state.form_data,

                        [action.input_name]: {
                            ...initial_state.form_data[action.input_name]
                        }
                    }

                }



            case 'reducer_action___required_field_error':
                return {
                    ...state,

                    required_field_error: {
                        ...state.required_field_error,
                        [action.input_name]: true
                    }

                }


            case 'reducer_action___no_required_field_error':
                return {
                    ...state,

                    required_field_error: {
                        ...state.required_field_error,
                        [action.input_name]: false
                    }

                }


            case 'reducer_action___validation_error':
                return {
                    ...state,

                    validation_error: {
                        ...state.validation_error,
                        [action.input_name]: true
                    }

                }


            case 'reducer_action___no_validation_error':
                return {
                    ...state,

                    validation_error: {
                        ...state.validation_error,
                        [action.input_name]: false
                    }

                }


            case 'reducer_action___reset_form':
                return {
                    ...initial_state,
                }


            default:
                return state
        }
    }


    return {
        reducer_func
    }

}


// 🍪 form_empty_field_func 🍪
function form_empty_field_func(checking_this) {

    let empty_filled = false


    function empty_string__false_boolean__empty_array() {

        let empty = false

        if (
            // empty string
            checking_this === '' ||
            checking_this === null ||

            // false boolean value
            checking_this === false ||

            // empty array
            (Array.isArray(checking_this) && checking_this.length === 0)
        ) {

            empty = true
        }

        return empty
    }



    function empty_object() {

        let empty = false

        if (typeof checking_this === 'object' &&
            !Array.isArray(checking_this)) {

            for (
                const [property_name, property_value] of Object.entries(checking_this)
            ) {

                if (
                    // empty string
                    checking_this[property_name] === '' ||
                    checking_this[property_name] === null ||

                    // false boolean value
                    checking_this[property_name] === false ||

                    // empty array
                    (Array.isArray(checking_this[property_name]) && checking_this[property_name].length === 0)
                ) {

                    empty = true
                }

            }


        }

        return empty

    }



    if (empty_string__false_boolean__empty_array() || empty_object()) {

        empty_filled = true
    }

    return empty_filled


}


// 🍪 parent_func_of_validation_before_form_submission_func 🍪
function parent_func_of_validation_before_form_submission_func(
    reducer_state,
    dispatch,
    validation_info_obj
) {

    // 🍪 before submitting the form, looking for error 🍪
    function validation_before_form_submission_func() {

        let any_error = false


        /* 🥔🥔 required field validation 🥔🥔 */


        let any_required_field_error = false;

        /*looping over all the fields to check that any of the field is required or not. If any of the field is required, checking that field is filled or not */

        for (
            const [property_name, property_value] of Object.entries(validation_info_obj)
        ) {


            if (validation_info_obj[property_name].is_required === true) {


                if (form_empty_field_func(reducer_state.form_data[property_name])) {

                    // dispatching required field error
                    dispatch({
                        type: 'reducer_action___required_field_error',
                        input_name: property_name,
                    })

                    any_required_field_error = true

                }


            }

        }






        /* 🥔🥔 checking if there is any 'match_value' validation  error 🥔🥔 */




        let any_match_value_error = false;

        for (
            const [property_name, property_value] of Object.entries(validation_info_obj)
        ) {


            if (validation_info_obj[property_name].what_to_validate_obj &&
                validation_info_obj[property_name].what_to_validate_obj.match_value
            ) {
                if (reducer_state.form_data[property_name] !== validation_info_obj[property_name].what_to_validate_obj.match_value) {

                    // dispatching validation error
                    dispatch({
                        type: 'reducer_action___validation_error',
                        input_name: property_name,
                    })

                    any_match_value_error = true

                }

                else {

                    // dispatching validation error
                    dispatch({
                        type: 'reducer_action___no_validation_error',
                        input_name: property_name,
                    })

                    any_match_value_error = false

                }


            }

        }



        /* 🥔🥔 non empty field's input validation 🥔🥔 */


        let input_validation_error_of_any_non_empty_field = false;

        /* looping 'reducer_state.validation_error' object  */
        for (
            const [property_name, property_value] of Object.entries(reducer_state.validation_error)
        ) {

            // non empty
            if (!form_empty_field_func(reducer_state.form_data[property_name])) {

                if (property_value === true) {
                    input_validation_error_of_any_non_empty_field = true
                }

            }
        }




        /* 🥔🥔 any_error? 🥔🥔 */

        if (any_required_field_error ||
            any_match_value_error || input_validation_error_of_any_non_empty_field
        ) {

            any_error = true
        }



        return any_error

    }


    return {
        validation_before_form_submission_func
    }
}




// exporting functions
let functions_for_no_library_form = {
    parent_func_of_reducer_func,
    form_empty_field_func,
    parent_func_of_validation_before_form_submission_func,
}


export default functions_for_no_library_form







