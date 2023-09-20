/*__________________________________________

 ✅ import
____________________________________________*/
// hook
import { useImmer } from 'use-immer'

// react-use
import { useNetworkState, useUpdateEffect } from 'react-use'

// component
import { Alert, Snackbar } from '@mui/material'


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function NETWORK_STATUS___ROOT_LEVEL() {

    // useNetworkState hook
    const network_report = useNetworkState()


    // network_status state
    const [network_status, update_network_status] = useImmer({
        was_online: network_report.online,
        is_offline: false,
        is_back_online: false
    })


    // update network_status state 
    useUpdateEffect(() => {

        // offline
        if (!network_report.online) {

            update_network_status(draft => {
                draft.is_offline = true
                draft.is_back_online = false
            })
        }


        // Back in Online
        if (!network_status.was_online && network_report.online) {

            update_network_status(draft => {
                draft.is_back_online = true
                draft.is_offline = false 
            })
        }


        // Update the previous state
        update_network_status(draft => {
            draft.was_online = network_report.online
        })

    }, [network_report])



    /*__________________________________________

     ✅ JSX 
    ____________________________________________*/
    return (

        <>

            {/* Offline */}
            <Snackbar
                open={network_status.is_offline}
                onClose={() => update_network_status(draft => { draft.is_offline = false })}
                autoHideDuration={5000}>

                <Alert severity="error" variant="filled">
                    You are offline!
                </Alert>

            </Snackbar>


            {/* Back online */}
            <Snackbar
                open={network_status.is_back_online}
                onClose={() => update_network_status(draft => { draft.is_back_online = false })}
                autoHideDuration={5000}>

                <Alert severity="success" variant="filled">
                    You are back online.
                </Alert>

            </Snackbar>

        </>

    )

}
