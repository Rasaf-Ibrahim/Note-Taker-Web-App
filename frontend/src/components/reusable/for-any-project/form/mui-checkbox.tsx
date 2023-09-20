/*__________________________________________

 ✅ import 
____________________________________________*/
// types
import { type_of_obj_with_any_values, type_of_single_element_jsx } from "../../../../types/commonly-used-types"

// nanoid
import { nanoid } from "nanoid";

// hook
import { useState, useEffect } from "react";

// utils
import { form_empty_field_func } from "@/utils/form/form-empty-field-func";


// components
import { Box, FormControlLabel, Checkbox, FormControl, FormHelperText, Typography } from '@mui/material'
import ERROR_MESSAGE___REUSABLE from "./reusable-components/error-message";


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_mui_checkbox = {

    label: string
    input_name: string

    state: type_of_obj_with_any_values
    actions: type_of_obj_with_any_values
    validation_info: type_of_obj_with_any_values

    icon_obj?: {
        is_using_icon: boolean;
        icon?: type_of_single_element_jsx
        checked_icon?: type_of_single_element_jsx
    }

    checkbox_size_in_rem?: string
    label_placement?: 'end' | 'start' | 'top' | 'bottom'
    color?: "primary" | "error" | "default" | "secondary" | "info" | "success" | "warning"

}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function MUI_CHECKBOX___COMPONENT(props: type_of_mui_checkbox) {


    // props
    const {
        label,
        input_name,
        state,
        actions,
        validation_info,

        // optional
        icon_obj = {
            is_using_icon: false,
            // icon: <BookmarkBorderRoundedIcon />,
            // checked_icon: <BookmarkRoundedIcon />,
        },
        checkbox_size_in_rem = '1.5rem',
        label_placement = 'end',
        color = 'primary'
    } = props






    /* 🍪 state to trigger validation  🍪 */
    const [trigger_validation_check_state, set_trigger_validation_check_state] = useState('')



    // 🍪 handle input change 🍪
    const handle_change_func = (event) => {


        /* 🥔 Updating state 🥔 */

        if (event.target.checked) {

            actions.update_input_value({
                input_name: [input_name],
                value: true
            })
        }

        else {

            actions.update_input_value({
                input_name: [input_name],
                value: false
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

     ✅ TSX
    ____________________________________________*/
    return (

        <Box>

            <FormControl>


                <FormControlLabel

                    label={label}
                    labelPlacement={label_placement}

                    control={

                        <Checkbox
                            checked={state.form_data[input_name].value}
                            onChange={handle_change_func}

                            color={color}

                            {...(icon_obj?.is_using_icon ? { icon: icon_obj.icon } : {})}

                            {...(icon_obj?.is_using_icon ? { checkedIcon: icon_obj.checked_icon } : {})}

                            sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: `${checkbox_size_in_rem}`,
                                }
                            }}
                        />

                    }
                />









                <ERROR_MESSAGE___REUSABLE
                    has_a_required_field_error={state.required_field_error[input_name] === true}
                />



            </FormControl>


        </Box>
    )
}



