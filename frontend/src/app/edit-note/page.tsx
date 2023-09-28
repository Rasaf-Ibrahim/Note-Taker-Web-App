
/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner"
import ROUTE_PROTECTION___COMPONENT from "@/utils/route/protection/route-protection"


// dynamic component import
import dynamic from 'next/dynamic'

const EDIT_NOTE___COMPONENT = dynamic(
    () => import('./_edit-note'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)



/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Edit Note',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function EDIT_NOTE___PAGE() {

    return (

        <ROUTE_PROTECTION___COMPONENT can_access="signed_in_and_verified_user">

            <DYNAMIC___LAYOUT 
                auth_layout={true}
                no_navigation_drawer={true}>

                <EDIT_NOTE___COMPONENT />

            </DYNAMIC___LAYOUT>

        </ROUTE_PROTECTION___COMPONENT>
    )
}