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
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText, Typography } from '@mui/material';
import ERROR_MESSAGE___REUSABLE from './reusable-components/error-message';



/*__________________________________________

 ✅ types
____________________________________________*/
type type_of_mui_radio = {

    label: string
    input_name: string
    radio_array: Array<{
        value: string
        label: string
    }>

    state: type_of_obj_with_any_values
    actions: type_of_obj_with_any_values
    validation_info: type_of_obj_with_any_values

    all_radio_buttons_in_a_row?: boolean
    label_placement?: 'end' | 'start' | 'top' | 'bottom'
    radio_size_in_rem?: string
    color?: "primary" | "error" | "default" | "secondary" | "info" | "success" | "warning"
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function MUI_RADIO___COMPONENT(props: type_of_mui_radio) {

    // props
    const {
        label,
        input_name,
        radio_array,
        state,
        actions,
        validation_info,

        // optional
        all_radio_buttons_in_a_row = false,
        label_placement = 'end',
        radio_size_in_rem = '1.5rem',
        color = 'primary'
    } = props





    /* 🍪 state to trigger validation  🍪 */
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
        <FormControl>

            <FormLabel id={input_name}>{label}</FormLabel>

            <RadioGroup
                name={input_name}
                value={state.form_data[input_name].value}
                onChange={handle_change_func}

                sx={{ display: 'flex', flexDirection: `${all_radio_buttons_in_a_row ? 'row' : 'column'}`, flexWrap: 'wrap' }}
            >


                {
                    radio_array.map((radio) => {

                        return (
                            <FormControlLabel
                                key={radio.value}
                                value={radio.value}
                                label={radio.label}
                                labelPlacement={label_placement}
                                control={<Radio color={color} />}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: `${radio_size_in_rem}`,
                                    },
                                }} />
                        )
                    })

                }


            </RadioGroup>


            <ERROR_MESSAGE___REUSABLE
                has_a_required_field_error={state.required_field_error[input_name] === true}
            />


        </FormControl>
    )
}


