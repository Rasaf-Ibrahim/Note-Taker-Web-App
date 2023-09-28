"use client"

// styled-components
import '@/styles/index.css'

// MUI_THEME___COMPONENT
import MUI_THEME___COMPONENT from '@/styles/mui-theme/mui-theme';

// @tanstack/react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import useZustandRehydration from '@/store/rehydration/zustand-rehydration-hook'

import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"

// components
import NETWORK_STATUS___ROOT_LEVEL from "@/components/root-level/network-status/network-status";
import SERVER_HEALTH_CHECK___ROOT_LEVEL from "@/components/root-level/server-health-check/server-health-check";
import TOAST_CONTAINER___ROOT_LEVEL from '@/components/root-level/toast-container/toast-container';
import PARTICLES___REUSABLE from '@/components/reusable/for-any-project/particles/particles';




export default function ALL_PAGE_WRAPPER___COMPONENT({ children }) {

    const queryClient = new QueryClient()



    const isZustandRehydrated = useZustandRehydration();




    return (

        <>
            {/* Load the application only after zustand is rehydrated */}
            {isZustandRehydrated ?

                <QueryClientProvider client={queryClient}>

                    <MUI_THEME___COMPONENT>

                        {children}

                        <NETWORK_STATUS___ROOT_LEVEL />
                        <SERVER_HEALTH_CHECK___ROOT_LEVEL />
                        {/* <PARTICLES___REUSABLE/> */}
                        <TOAST_CONTAINER___ROOT_LEVEL />


                    </MUI_THEME___COMPONENT>

                </QueryClientProvider>



                :


                /* When zustand is rehydrating, show loading spinner*/
                <MUI_THEME___COMPONENT force_dark_mode>

                    <LOADING_SPINNER___COMPONENT full_screen={true} />

                </MUI_THEME___COMPONENT>

            }

        </>

    )

}
