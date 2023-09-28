'use client'


/*__________________________________________

 ✅ import
____________________________________________*/

// route
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation'

// css in js
import AUTH_PAGE_CONTAINER___STYLED from '@/components/styled/just-for-this-project/auth-page-container'
import config_obj from '@/config'

// mui component
import { Button, Typography, Stack } from '@mui/material'


/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function DELETE_ACCOUNT___COMPONENT() {



    return (
        <AUTH_PAGE_CONTAINER___STYLED paddingTop='3.5rem'>

            <Stack alignItems="center" spacing='1.5rem' >

                <Typography variant='h6'>If you really want to delete your account, navigate to the confirmation page</Typography>



                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.delete_account_confirmation}>
                    <Button
                        variant='contained'>
                        Navigate
                    </Button>
                </ROUTER_NAVIGATION___COMPONENT>

            </Stack>


        </AUTH_PAGE_CONTAINER___STYLED>

    )
}



