'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// auth hook
import { useSignOutUser } from '@/api-calls/auth/sign-out/sign-out'

// css in js
import AUTH_PAGE_CONTAINER___STYLED from '@/components/styled/just-for-this-project/auth-page-container'

// mui component
import { Button, Typography, Stack } from '@mui/material'


/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function SIGN_OUT_CONFIRMATION___COMPONENT() {


    const { mutate, isLoading } = useSignOutUser()



    return (
        <AUTH_PAGE_CONTAINER___STYLED paddingTop='7rem'>

            <Stack alignItems="center" spacing='1.5rem' >

                <Typography variant='h6'>Are you sure you want to sign out?</Typography>


                <Button
                    onClick={() => mutate()}
                    disabled={isLoading}
                    variant='contained'>

                    {!isLoading ?

                        <>Yes, sign out</> :

                        <>Signing out..</>
                    }

                </Button>

            </Stack>


        </AUTH_PAGE_CONTAINER___STYLED>

    )
}



