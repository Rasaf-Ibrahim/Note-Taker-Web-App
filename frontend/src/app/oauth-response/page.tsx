/*__________________________________________

 ✅ import 
____________________________________________*/


// component
import LOADING_SPINNER___COMPONENT from "@/components/reusable/for-any-project/loading-spinner/loading-spinner";


// dynamic component import
import dynamic from 'next/dynamic'

const OAUTH_RESPONSE___COMPONENT = dynamic(
    () => import('./_oauth-response'),
    {
        ssr: true,
        loading: () => <LOADING_SPINNER___COMPONENT full_screen={true} />,
    }
)




/*__________________________________________

 ✅ Metadata 
____________________________________________*/
export const metadata = {
    title: 'OAuth Response',
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function OAUTH_RESPONSE___PAGE() {

    return (


        /* 
            - The following page is needed during the login process and just after the login.

           - But I couldn't create any route protection HOC which would protect this page on the time when this page isn't necessary.
            
            However, even without any route protection HOC, showing right content based on the state of the application   
        
        */

        <OAUTH_RESPONSE___COMPONENT />

    )
}