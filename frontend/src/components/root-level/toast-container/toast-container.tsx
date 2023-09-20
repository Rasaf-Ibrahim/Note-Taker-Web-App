/*__________________________________________

 ✅ import
____________________________________________*/
// react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// useTheme hook
import { useTheme } from '@mui/material/styles';




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function TOAST_CONTAINER___ROOT_LEVEL() {

    // useTheme
    const theme = useTheme()


    return (

        <>

            {theme.palette.mode === 'dark' ?

                <ToastContainer theme='dark' position='bottom-right' autoClose={5000} />

                :

                <ToastContainer position='bottom-right' autoClose={5000} />
            }


        </>
    )
}