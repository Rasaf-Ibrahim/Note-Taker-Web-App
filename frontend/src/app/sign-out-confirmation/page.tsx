
/*__________________________________________

 ✅ import 
____________________________________________*/
// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";

// route protection
import ROUTE_PROTECTION___COMPONENT from "@/utils/route/protection/route-protection";



// dynamic component import
import dynamic from 'next/dynamic'

const SIGN_OUT_CONFIRMATION___COMPONENT = dynamic(
    () => import('./_sign-out-confirmation'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)


/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Sign out Confirmation',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function SIGN_OUT_CONFIRMATION___PAGE() {

    return (

        <ROUTE_PROTECTION___COMPONENT can_access="signed_in_user_and_verification_status_unimportant">

            <DYNAMIC___LAYOUT
             auth_layout={true} 
             no_navigation_drawer={true}>

                <SIGN_OUT_CONFIRMATION___COMPONENT />

            </DYNAMIC___LAYOUT>

        </ROUTE_PROTECTION___COMPONENT>
    )
}