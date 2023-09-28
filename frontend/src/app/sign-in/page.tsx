/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";


// route protection
import ROUTE_PROTECTION___COMPONENT from "@/utils/route/protection/route-protection";


// dynamic component import
import dynamic from 'next/dynamic'

const SIGN_IN___COMPONENT = dynamic(
    () => import('./_sign-in'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true}/> ,
    }
)




/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Sign In',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function SIGN_IN___PAGE() {

    return (

        <ROUTE_PROTECTION___COMPONENT can_access="not_signed_in_user">

            <SIGN_IN___COMPONENT />

        </ROUTE_PROTECTION___COMPONENT>

    )
}