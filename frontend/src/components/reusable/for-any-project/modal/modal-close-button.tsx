/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_func_prop_with_no_rule } from '@/types/commonly-used-types'


// mui components
import { Button } from '@mui/material'



/*__________________________________________

 ✅ Types
____________________________________________*/

type type_of_props = {
    handle_modal_close: type_of_func_prop_with_no_rule
    button_text?: string
}



/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function MODAL_CLOSE_BUTTON___REUSABLE(props:type_of_props) {

    const {
        handle_modal_close,
        button_text = 'Cancel'
    } = props




    return (

        <Button
            onClick={handle_modal_close}
            size='small'
            variant="outlined">

            {button_text}

        </Button>

    )
}