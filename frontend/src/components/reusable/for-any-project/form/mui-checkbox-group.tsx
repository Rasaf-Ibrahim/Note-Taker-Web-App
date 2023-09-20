/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { type_of_obj_with_any_values } from '../../../../types/commonly-used-types'

// nanoid
import { nanoid } from 'nanoid';

// hook
import { useState, useEffect } from 'react';

// utils
import { form_empty_field_func } from "@/utils/form/form-empty-field-func";

// components
import { Box, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup, FormHelperText, Typography } from '@mui/material'
import ERROR_MESSAGE___REUSABLE from './reusable-components/error-message';



/*__________________________________________

 ✅ types
____________________________________________*/


type type_of_mui_checkbox_group = {
    label: string
    input_name: string
    checkboxes_info_array: Array<{
        value: string
        label: string
    }>

    state: type_of_obj_with_any_values
    actions: type_of_obj_with_any_values
    validation_info: type_of_obj_with_any_values


    checkbox_size_in_rem?: string
    label_placement?: 'end' | 'start' | 'top' | 'bottom'
    color?: "primary" | "error" | "default" | "secondary" | "info" | "success" | "warning"
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function MUI_CHECKBOX_GROUP___COMPONENT(props: type_of_mui_checkbox_group) {


    // props
    const {
        label,
        input_name,
        checkboxes_info_array,
        state,
        actions,
        validation_info,

        // optional
        checkbox_size_in_rem = '1.5rem',
        label_placement = 'end',
        color = 'primary'
    } = props



    /* 🍪 state to trigger validation  🍪 */
    const [trigger_validation_check_state, set_trigger_validation_check_state] = useState('')




    // 🍪 handle input change 🍪
    function handleChange(event) {

        /* 🥔 Updating state 🥔 */


        // value of the clicked checkbox 
        const value_of_the_clicked_checkbox = event.target.value


        // index of the value of the clicked checkbox on the 'state.form_data[input_name].value' array
        const index = state.form_data[input_name].value.indexOf(value_of_the_clicked_checkbox)

        //  if before the click, the clicked checkbox's value wasn't on the 'state.form_data[input_name].value' array , add the value
        if (index === -1) {

            actions.update_input_value({
                input_name: [input_name],
                value: [...state.form_data[input_name].value, value_of_the_clicked_checkbox]
            })
        }

        //  if before the click, the clicked checkbox's value was already on the 'state.form_data[input_name].value' array, remove the value
        else {

            const filtered_checked_checkbox_array = state.form_data[input_name].value.filter((value) => value !== value_of_the_clicked_checkbox)


            actions.update_input_value({
                input_name: [input_name],
                value: [...filtered_checked_checkbox_array]
            })


        }





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

    }



    // 🍪 executing validation function 🍪
    useEffect(() => {

        if(trigger_validation_check_state === '') return

        validation_func()

    }, [trigger_validation_check_state])





    /*__________________________________________
     ✅ JSX
    ____________________________________________*/
    return (

        <Box>

            <FormControl>

                <FormLabel>{label}</FormLabel>

                <FormGroup  >


                    {

                        checkboxes_info_array.map((checkbox) => {

                            return (

                                <FormControlLabel
                                    key={checkbox.value}
                                    label={checkbox.label}
                                    labelPlacement={label_placement}
                                    value={checkbox.value}
                                    control={

                                        <Checkbox
                                            checked={state.form_data[input_name].value?.includes(checkbox.value)}
                                            onChange={handleChange}

                                            color={color}


                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: `${checkbox_size_in_rem}`,
                                                }
                                            }}
                                        />
                                    }
                                />

                            )

                        })

                    }


                    <ERROR_MESSAGE___REUSABLE
                        has_a_required_field_error={state.required_field_error[input_name] === true}
                    />




                </FormGroup>



            </FormControl>


        </Box>
    )
}







