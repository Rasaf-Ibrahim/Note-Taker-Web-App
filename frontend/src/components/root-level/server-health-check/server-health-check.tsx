/*__________________________________________

 ✅ import
____________________________________________*/
// hook
import { useEffect, useState } from "react";
import { useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";

// api hook
import { useServerHealthCheck } from "@/api-calls/server-health-check/server-health-check";

//  react-toastify
import { toast } from "react-toastify";

// icons
import TimerIcon from '@mui/icons-material/Timer';

// components
import { Box, Stack, Typography, IconButton } from "@mui/material";
import MODAL___REUSABLE from "@/components/reusable/for-any-project/modal/modal";



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function SERVER_HEALTH_CHECK___ROOT_LEVEL() {


    // 🍪  useServerHealthCheck hook
    const {
        isFetching,
        isSuccess,
        isError,
    } = useServerHealthCheck();








    // 🍪 get the state properties and updater function using useImmer hook
    const [server_health_state, update_server_health_state] = useImmer({
        server_is_running: true,
        server_is_sleeping: false,
        server_is_down: false
    })






    // 🍪 checking whether the server is down
    useUpdateEffect(() => {

        if (isError) {

            update_server_health_state(draft => {

                draft.server_is_running = false
                draft.server_is_sleeping = false
                draft.server_is_down = true

            })
        }


        else if (!isError && isSuccess) {

            update_server_health_state(draft => {

                draft.server_is_running = true
                draft.server_is_sleeping = false
                draft.server_is_down = false

            })

        }

    }, [isError])





    

    // 🍪 checking whether the server is sleeping
    useEffect(() => {


        
        const timer = setTimeout(() => {

            // server is sleeping
            if (isFetching) {
                update_server_health_state(draft => {
                    draft.server_is_running = false
                    draft.server_is_sleeping = true
                    draft.server_is_down = false
                })
            }

        }, 3000)


      

        if (!isFetching && isSuccess) {

            update_server_health_state(draft => {
                draft.server_is_running = true
                draft.server_is_sleeping = false
                draft.server_is_down = false
            })

        }


        return () => clearTimeout(timer)


    }, [isFetching])






    /*__________________________________________

     ✅ JSX
    ____________________________________________*/
    return (

        <>

            <SERVER_IS_DOWN_MODAL___CHILD
                server_is_down={server_health_state.server_is_down}
                isSuccess={isSuccess}
            />


            <SERVER_IS_SLEEPING_MODAL___CHILD
                server_is_sleeping={server_health_state.server_is_sleeping}
                isSuccess={isSuccess}
            />

        </>
    )

}



/*__________________________________________

 ✅ Child Components for
  <SERVER_HEALTH_CHECK___ROOT_LEVEL/>
____________________________________________*/



// 🍪
function SERVER_IS_DOWN_MODAL___CHILD({ server_is_down, isSuccess }) {


    const [open, setOpen] = useState(server_is_down);


    useUpdateEffect(() => {

        if (server_is_down) {
            setOpen(true)
        }

        else {
            setOpen(false)

            if (isSuccess) {
                toast.success("The server is up and running", {
                    toastId: 'server_is_up_and_running'
                })
            }


        }

    }, [server_is_down])







    return (


        <MODAL___REUSABLE

            modal_is_open={open}

            modal_navbar_jsx={
                <Typography variant='h6' sx={{ fontWeight: 600, color: "primary.main", textAlign: 'center' }}>
                    Server is Down!
                </Typography>
            }


            modal_content_jsx={

                <Box>

                    <Typography sx={{ marginTop: '1rem' }} align='justify'>
                        The server is currently down because we are using a free hosting service. Free hosting services often have limited resources, which can lead to downtime. We apologize for any inconvenience this may cause.
                    </Typography>


                    <Typography sx={{ marginTop: '1rem' }} align='justify'>
                        We are working on upgrading to a paid service, which will give us more resources and improve uptime. In the meantime, we appreciate your patience.
                    </Typography>


                </Box>
            }

            user_can_close_the_modal={false}
        />


    )
}


// 🍪
function SERVER_IS_SLEEPING_MODAL___CHILD({ server_is_sleeping, isSuccess }) {


    const [open, setOpen] = useState(server_is_sleeping);


    useUpdateEffect(() => {

        if (server_is_sleeping) {
            setOpen(true)
        }

        else {
            setOpen(false)


            if (isSuccess) {
                toast.success("The server is up and running", {
                    toastId: 'server_is_up_and_running'
                })
            }
        }

    }, [server_is_sleeping])



    return (


        <MODAL___REUSABLE

            modal_is_open={open}

            modal_navbar_jsx={
                <Stack alignItems='center' gap='1rem'>

                    <Typography variant='h6' sx={{ fontWeight: 600, color: "primary.main" }}>
                        Please wait, our server is waking up!
                    </Typography>

                    <ELAPSED_TIME___CHILD />
                </Stack>

            }


            modal_content_jsx={

                <Box>

                    <Typography sx={{ marginTop: '1rem' }} align='justify'>

                        It generally takes around 30 seconds for our server to wake up.

                    </Typography>


                    <Typography sx={{ marginTop: '1rem' }} align='justify'>
                        Our server is hosted on a free service that puts the server in sleep mode after 15 minutes of inactivity.
                    </Typography>

                    <Typography sx={{ marginTop: '1rem' }} align='justify'>
                        We are working on upgrading to a paid service, which will resolve this issue. In the meantime, we appreciate your patience.
                    </Typography>

                </Box>
            }

            user_can_close_the_modal={false}
        />
    )

}




/*__________________________________________

 ✅ Child Components for
  <SERVER_IS_SLEEPING_MODAL___CHILD/>
____________________________________________*/

// 🍪
function ELAPSED_TIME___CHILD() {


    const [elapsedTime, setElapsedTime] = useState(0)


    useEffect(() => {

        const timer = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1)
        }, 1000)


        return () => {
            clearInterval(timer)

            setElapsedTime(0)
        }

    }, [])





    return (

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <IconButton sx={{ color: 'primary.light' }} >
                <TimerIcon />
            </IconButton>

            <Typography
                variant="h6"
                align='center'
                sx={{
                    width: '3rem', // This ensures that the width remains consistent
                    marginLeft: '0.5rem',
                    fontWeight: 'bold',
                    color: 'primary.light'
                }}
            >
                {elapsedTime}s
            </Typography>
        </Box>
    )
}