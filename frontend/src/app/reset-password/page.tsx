
/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout"
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"


// route protection
import ROUTE_PROTECTION___COMPONENT from "@/utils/route/protection/route-protection"


// dynamic component import
import dynamic from 'next/dynamic'

const SEND_PASSWORD_RESET_MAIL___COMPONENT = dynamic(
    () => import('./_reset-password'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)



/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Reset Password',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function RESET_PASSWORD___PAGE() {

    return (

        <ROUTE_PROTECTION___COMPONENT can_access="not_signed_in_user" >

            <DYNAMIC___LAYOUT
                auth_layout={true}
                no_navigation_drawer={true}>

                <SEND_PASSWORD_RESET_MAIL___COMPONENT />

            </DYNAMIC___LAYOUT>

        </ROUTE_PROTECTION___COMPONENT>

    )
}