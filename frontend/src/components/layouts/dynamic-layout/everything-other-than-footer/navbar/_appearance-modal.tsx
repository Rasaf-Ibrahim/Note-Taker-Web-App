/*__________________________________________

 ✅ import 
____________________________________________*/

// types
import { type_of_func_prop_with_no_rule } from '@/types/commonly-used-types'

// components
import {
    Typography,
    Button
} from '@mui/material'

import APPEARANCE___REUSABLE from '@/components/reusable/for-any-project/appearance/appearance';
import MODAL___REUSABLE from '@/components/reusable/for-any-project/modal/modal';




/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_appearance_dialog_props = {

    appearance_modal_is_open: boolean,
    close_appearance_modal: type_of_func_prop_with_no_rule,

}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function APPEARANCE___MODAL(props: type_of_appearance_dialog_props) {


    const {
        appearance_modal_is_open,
        close_appearance_modal
    } = props



    return (

        <>
            <MODAL___REUSABLE

                modal_is_open={appearance_modal_is_open}

                modal_navbar_jsx={
                    <Typography variant='h6'>
                        Appearance
                    </Typography>
                }

                modal_content_jsx={<APPEARANCE___REUSABLE />}

                user_can_close_the_modal={true}

                handle_close_modal={close_appearance_modal}

                modal_footer_jsx={

                    <Button
                        onClick={close_appearance_modal}
                        variant='outlined'
                    >
                        Close
                    </Button>
                }

            />

        </>

    )
}