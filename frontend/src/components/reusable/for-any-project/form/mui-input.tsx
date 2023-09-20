/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { type_of_obj_with_any_values } from "../../../../types/commonly-used-types"

// nanoid
import { nanoid } from "nanoid";

// hook
import { useState, useEffect } from "react";


// utils
import { form_empty_field_func } from "@/utils/form/form-empty-field-func";

// mui component 
import { FormControl, InputLabel, Input, OutlinedInput, FilledInput, FormHelperText, Typography } from '@mui/material'
import ERROR_MESSAGE___REUSABLE from "./reusable-components/error-message";



/*__________________________________________

 ✅ types 
____________________________________________*/

type types_of_mui_input = {
    label: string
    input_name: string

    state: type_of_obj_with_any_values
    actions: type_of_obj_with_any_values
    validation_info: type_of_obj_with_any_values

    multiline?: boolean
    variant_value?: 'standard' | 'filled' | 'outlined'
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function MUI_INPUT___COMPONENT(props: types_of_mui_input) {


    // 🍪 props 🍪 
    const {
        label,
        input_name,
        state,
        actions,
        validation_info,
        multiline = false,
        variant_value = 'filled'
    } = props




    // 🍪 state to trigger validation  🍪 
    const [trigger_validation_check_state, set_trigger_validation_check_state] = useState('')



    // 🍪 handle input change 🍪
    const handle_change_func = (event) => {

        /* 🥔 Updating state 🥔 */
        actions.update_input_value({
            input_name: [input_name],
            value: event.target.value
        })


        /* 🥔 Triggering validation check on input change 🥔 */
        set_trigger_validation_check_state(nanoid(8))

    }



    // 🍪 validation function 🍪
    const validation_func = async () => {


        /* 🥔 required field Validation 🥔 */
        //  only proceed to required field validation if this field is a required field.
        if (validation_info[input_name].is_required) {


            if (form_empty_field_func(state.form_data[input_name].value)) {

                actions.required_field_error({
                    input_name: [input_name],
                })
            }

            else {

                actions.no_required_field_error({
                    input_name: [input_name],
                })

            }

        }


        /* 🥔 input validation  🥔 */
        //  only proceed to validation if we want to validate this field
        if (validation_info[input_name].validation.is_validating) {

            // 🧅 match_this_field error
            let match_value_error = false

            if (validation_info[input_name].validation.match_this_field) {

                let value_has_matched = state.form_data[input_name].value === state.form_data[validation_info[input_name].validation.match_this_field].value

                if (!value_has_matched) {

                    match_value_error = true
                }

                else {

                    match_value_error = false
                }
            }

            // 🧅 match_pattern error
            let match_pattern_error = false

            if (validation_info[input_name].validation.match_pattern) {

                let pattern_has_matched = validation_info[input_name].validation.match_pattern.test(state.form_data[input_name].value)

                if (!pattern_has_matched) {

                    match_pattern_error = true
                }

                else {

                    match_pattern_error = false

                }


            }


            // 🧅 executing 'actions.validation_error' if there is any error
            if (match_value_error || match_pattern_error) {

                actions.validation_error({
                    input_name: [input_name]
                })

            }


            // 🧅 executing ' actions.no_validation_error' if there is no error or the input field is empty (if the input field is empty, there is nothing to validate)
            if ((!match_value_error && !match_pattern_error) || form_empty_field_func(state.form_data[input_name].value)) {

                actions.no_validation_error({
                    input_name: [input_name]
                })

            }

        }

    }



    // 🍪 executing validation function 🍪
    useEffect(() => {

        if(trigger_validation_check_state === '') return

        validation_func()

    }, [trigger_validation_check_state])




    /* 🍪 selected variant (UI) 🍪 */
    const selectedVariant = () => {

        if (variant_value === 'standard') {
            return (
                "standard"
            )
        }

        else if (variant_value === 'filled') {
            return (
                "filled"
            )
        }

        else if (variant_value === 'outlined') {
            return (
                "outlined"
            )
        }

    }



    /*__________________________________________
     ✅ JSX
    ____________________________________________*/
    return (

        <FormControl variant={selectedVariant()}>

            <InputLabel htmlFor={input_name}>{label}</InputLabel>


            {
                (() => {

                    // Common properties for Input, FilledInput & 'Outlined' Components
                    const commonProps = {
                        id: input_name,
                        multiline: multiline,
                        minRows: 4,
                        fullWidth: true,
                        autoComplete: '&#6#+',
                        value: state.form_data[input_name].value,
                        onChange: handle_change_func,
                    }


                    if (variant_value === 'standard') {
                        return (
                            <Input {...commonProps} />
                        )
                    }


                    else if (variant_value === 'filled') {
                        return (
                            <FilledInput {...commonProps} />
                        )
                    }


                    else if (variant_value === 'outlined') {
                        return (

                            /* if we don't pass the 'label' prop, the UI will have bug while focusing on the outlined input field */
                            <OutlinedInput
                                {...commonProps}
                                label={label}
                            />
                        )
                    }


                })()
            }



            <ERROR_MESSAGE___REUSABLE
                has_a_required_field_error={state.required_field_error[input_name] === true}
                has_a_validation_error={state.validation_error[input_name] === true}
                validation_error_message={validation_info[input_name].validation.error_message}
            />


        </FormControl>

    )


}



