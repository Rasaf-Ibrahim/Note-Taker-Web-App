/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";

// route protection
import ROUTE_PROTECTION___COMPONENT from "@/utils/route/protection/route-protection"

// dynamic component import
import dynamic from 'next/dynamic'

const PROFILE___COMPONENT = dynamic(
    () => import('./_profile'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)




/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Profile',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function PROFILE___PAGE() {

    return (



        <DYNAMIC___LAYOUT
            auth_layout={true}
            no_navigation_drawer={true}>

            <ROUTE_PROTECTION___COMPONENT can_access="signed_in_and_verified_user">

                <PROFILE___COMPONENT />

            </ROUTE_PROTECTION___COMPONENT>

        </DYNAMIC___LAYOUT>



    )
}