'use client'

// router hook
import { useRouter } from 'next/navigation'

// hook
import useComponentMounted from '../global-hooks/component-mounted-hook'







type type_of_redirect_payload = {
    path: string;
    replace?: boolean;
    checkMount?: boolean;
}




export default function useRouterProgrammaticNavigation() {

    // useNavigate hook
    const router = useRouter()


   
    const { mounted } = useComponentMounted()


    function redirect(payload: type_of_redirect_payload) {

        // destructing 
        const {
            path,
            replace = false,
            checkMount = false
        } = payload;


        // Only proceed if either we're not checking for mount or if the component is mounted
        if (checkMount && !mounted) return;


        if (replace) {

            return router.replace(path)
        }

        else {

            return router.push(path)

        }


    }


    return redirect
}