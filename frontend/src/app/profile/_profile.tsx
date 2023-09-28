'use client'

/*__________________________________________

 ✅ import 
____________________________________________*/
// config
import config_obj from '@/config'

// types
import { type_of_anything } from '@/types/commonly-used-types'

// store
import { auth_store } from '@/store/auth-store'

// styled components
import { styled } from "@mui/material/styles"
import css_media_queries from '@/styles/css-utils/media-queries'

// router
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation'


// icons
import EditIcon from '@mui/icons-material/Edit'

// components
import { Avatar, Box, Typography, Button } from '@mui/material'


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function PROFILE___COMPONENT() {


    // 🍪 get the state properties 
    const { user_info } = auth_store(state => ({
        user_info: state?.user_info
    }))



    return (

        <WRAPPER_OF_JSX___STYLED>

            <PROFILE_CARD___STYLED>

                <AVATAR___STYLED
                    src={user_info.picture_link}
                    alt={user_info.username}
                >
                    {/* if the user has no profile picture, we will show the first letter of the username as avatar */}
                    {user_info.username.slice(0, 1)}

                </AVATAR___STYLED>


                <Typography variant='h4'>
                    {user_info.full_name}
                </Typography>


                <Typography variant='body1'>
                    Username: {user_info.username}
                </Typography>


                <Typography variant='body1'>
                    Email: {user_info.email}
                </Typography>


                <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.settings}>
                    <Button variant="outlined" startIcon={< EditIcon />}>
                        Edit Profile
                    </Button>
                </ROUTER_NAVIGATION___COMPONENT>


            </PROFILE_CARD___STYLED>


        </WRAPPER_OF_JSX___STYLED>
    )
}





/*__________________________________________

✅ Styled Components for
 <PROFILE___COMPONENT/>
____________________________________________*/


// 🍪
const WRAPPER_OF_JSX___STYLED = styled((props: type_of_anything) =>

    <Box {...props} />

)(({ theme }) => `

    ${/* child layout */ ''}
    display: flex;
    flex-direction: column;
    align-items: center;


`)




// 🍪
const PROFILE_CARD___STYLED = styled((props: type_of_anything) =>

    <Box {...props} />

)(({ theme }) => `

    ${/* layout */ ''}
    margin-top:7rem; 
    padding:2rem;
    ${css_media_queries.name_xs_sm_md_lg_xl('width', '100%', '90%', '80%', '70%', '60%')};

    ${/* appearance */ ''}
    background-color: ${theme.palette.background.variation_1};
    border: 0.05rem solid ${theme.palette.divider};
    border-radius: 0.5rem;


    ${/* child layout */ ''}
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:2rem;


`)




// 🍪
const AVATAR___STYLED = styled((props: type_of_anything) =>

    <Avatar {...props} />

)(({ theme }) => `

    ${/* layout */''}
    width: 7rem;
    height: 7rem;
    margin-top:-6rem;

    ${/* appearance */''}
    border: 0.5rem solid ${theme.palette.background.default}; 
    borderRadius:50%; 

`)

