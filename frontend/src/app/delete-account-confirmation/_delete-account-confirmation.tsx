'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// auth hook
import { useDeleteAccount } from '@/api-calls/auth/delete-account/delete-account'

// css in js
import AUTH_PAGE_CONTAINER___STYLED from '@/components/styled/just-for-this-project/auth-page-container'

// mui component
import { Button, Typography, Stack } from '@mui/material'


/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function DELETE_ACCOUNT_CONFIRMATION___COMPONENT() {


    const { mutate, isLoading } = useDeleteAccount()



    return (
        <AUTH_PAGE_CONTAINER___STYLED paddingTop='7rem'>

            <Stack alignItems="center" spacing='1.5rem' >

                <Typography variant='h6'>Are you sure you want to delete your account?</Typography>


                <Button
                    onClick={() => mutate()}
                    disabled={isLoading}
                    variant='contained'>

                    {!isLoading ?

                        <>Yes, I am</> :

                        <>Deleting..</>
                    }

                </Button>

            </Stack>


        </AUTH_PAGE_CONTAINER___STYLED>

    )
}



