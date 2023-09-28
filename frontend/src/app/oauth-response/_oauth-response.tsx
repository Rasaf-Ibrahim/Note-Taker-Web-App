'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config"

// hook
import { useLogger, useMount, useUpdateEffect } from "react-use"

// api hook
import { useOauthResponse } from "@/api-calls/auth/oauth/oauth-response"

// zustand store & immer
import { auth_store } from "@/store/auth-store"


// route
import ROUTER_NAVIGATION___COMPONENT from "@/utils/route/router-navigation"

// styled component
import AUTH_PAGE_CONTAINER___STYLED from "@/components/styled/just-for-this-project/auth-page-container"

// components
import { Box, Button, Container, Typography } from "@mui/material";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";






/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function OAUTH_RESPONSE___COMPONENT() {


    // 🍪 useOauthResponse 
    const { mutate, isLoading, isSuccess, isError, data, error } = useOauthResponse()



    // 🍪 mutate on mount
    useMount(() => {
        mutate()
    })




    // ✅ TSX
    return (
        <AUTH_PAGE_CONTAINER___STYLED paddingTop='11rem'>

            {/* 🥔 Loading */}
            {isLoading &&

                <>

                    <Typography variant="body1" color='primary.main' align='center'>
                        Loading..
                    </Typography>

                    <LOADING_SPINNER___COMPONENT full_screen={false} margin='3rem' />

                </>

            }


            {/* 🥔 Success */}
            {isSuccess &&

                <SUCCESS_RESPONSE___CHILD data={data} />

            }

            {/* 🥔 Error */}
            {isError &&

                <ERROR_RESPONSE___CHILD error={error} />

            }


        </AUTH_PAGE_CONTAINER___STYLED>
    )
}




/*__________________________________________

 ✅ Sections of 
 <OAUTH_RESPONSE___COMPONENT/>
____________________________________________*/


/* 🍪 */
function SUCCESS_RESPONSE___CHILD({ data }) {

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

            {data.data.message.toLowerCase().includes('signed up') &&

                <Typography variant='body1' align="center">

                    <div>Congratulations. 🎉</div>


                    <div>  Your account has successfully been created. </div>

                </Typography>

            }

            {data.data.message.toLowerCase().includes('signed in') &&

                <Typography variant='body1' align="center">

                    <div> Welcome back. 😀</div>
                    <div> You have successfully been signed in.</div>

                </Typography>

            }


            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.home_after_login}>

                <Button variant="outlined"> Go to Home Page </Button>

            </ROUTER_NAVIGATION___COMPONENT>

        </Box>
    )

}




/* 🍪 */
function ERROR_RESPONSE___CHILD({ error }) {


    // 🥔 get the state properties 
    const { user_state } = auth_store(state => ({
        user_state: state?.user_state
    }))


    return (

        <>

            {(() => {

                /* 🥔 If the user is already logged in then there is no point of showing error message, so checking for user first */

                if (user_state.signed_in_or_up) {

                    return (

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                            <Typography variant='body1' align='center'>
                                You are already signed in.
                            </Typography>


                            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.home_after_login}>

                                <Button variant="outlined"> Go back to the Home Page </Button>

                            </ROUTER_NAVIGATION___COMPONENT>

                        </Box>

                    )
                }



                else if (!user_state.signed_in_or_up) {

                    return (

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                            <Typography variant='body1' color='error.main' align='center'>
                                {error?.response.data.message}
                            </Typography>


                            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.sign_in}>

                                <Button variant="outlined"> Sign in Page </Button>

                            </ROUTER_NAVIGATION___COMPONENT>


                        </Box>
                    )
                }



            })()}

        </>
    )

}




