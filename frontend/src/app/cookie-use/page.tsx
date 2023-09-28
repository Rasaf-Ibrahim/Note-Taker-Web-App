
/*__________________________________________

 ✅ import 
____________________________________________*/

// component
import DYNAMIC___LAYOUT from "@/components/layouts/dynamic-layout/dynamic-layout";
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";



// dynamic component import
import dynamic from 'next/dynamic'

const COOKIE_USE___COMPONENT = dynamic(
    () => import('./_cookie-use'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)




/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'Cookie Use',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function COOKIE_USE___PAGE() {

    return (

        <DYNAMIC___LAYOUT
            auth_layout={true} 
            no_navigation_drawer={true}>

            <COOKIE_USE___COMPONENT />

        </DYNAMIC___LAYOUT>

    )
}