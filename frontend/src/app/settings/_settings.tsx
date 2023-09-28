'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// auth store
import { auth_store } from '@/store/auth-store';


// types
import { type_of_tabs } from '@/components/reusable/for-any-project/tabs/tabs';

// icons
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// component
import { Typography } from '@mui/material'

import TABS___REUSABLE from '@/components/reusable/for-any-project/tabs/tabs';

import PROFILE___COMPONENT from './__edit-profile'
import PASSWORD___COMPONENT from './__change-password'
import APPEARANCE___COMPONENT from './__appearance'
import DELETE_ACCOUNT___COMPONENT from './__delete-account';



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function SETTINGS___COMPONENT() {


    // 🍪 get the user_info  
    const { user_info } = auth_store(state => ({
        user_info: state?.user_info
    }))



    // 🍪 tab based on auth
    let password_tab_based_on_auth = []

    if (user_info.auth_provider === 'email') {

        password_tab_based_on_auth = [
            {
                tab_name_jsx: <Typography variant='caption'> Password  </Typography>,
                tab_icon_jsx: <PasswordRoundedIcon sx={{ fontSize: '1.3rem' }} />,
                component_jsx: <PASSWORD___COMPONENT />
            }
        ]
    }


    // 🍪 all tabs
    const tabs: type_of_tabs = [

        {
            tab_name_jsx: <Typography variant='caption'> Profile </Typography>,
            tab_icon_jsx: <ManageAccountsRoundedIcon sx={{ fontSize: '1.3rem' }} />,
            component_jsx: <PROFILE___COMPONENT />
        },


        ...password_tab_based_on_auth,


        {
            tab_name_jsx: <Typography variant='caption'> Appearance </Typography>,
            tab_icon_jsx: <PaletteRoundedIcon sx={{ fontSize: '1.3rem' }} />,
            component_jsx: <APPEARANCE___COMPONENT />
        },

        {
            tab_name_jsx: <Typography variant='caption'> Delete </Typography>,
            tab_icon_jsx: <DeleteForeverIcon sx={{ fontSize: '1.3rem' }} />,
            component_jsx: <DELETE_ACCOUNT___COMPONENT />
        }

    ]




    /*__________________________________________

    ✅ TSX
    ____________________________________________*/

    return (

        <>

            <TABS___REUSABLE

                tabs={tabs}

                variation={{
                    mobile: {
                        tab_style: 'customized',
                        tab_position: 'top',
                        tab_icon_position: 'top'
                    },

                    desktop: {
                        tab_style: 'customized',
                        tab_position: 'top',
                        tab_icon_position: 'top'
                    }
                }}
            />


        </>

    )

}

