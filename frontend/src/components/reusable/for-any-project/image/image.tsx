'use client'

/*__________________________________________

 ✅ import
____________________________________________*/

// types
import { type_of_anything } from "@/types/commonly-used-types"

// components
import Image from "next/image"
import { Box } from "@mui/material"


/*__________________________________________

 ✅ types
____________________________________________*/


type type_of_sx = {
    width: type_of_anything
    height: type_of_anything
    borderRadius?: type_of_anything
    objectFit?: type_of_anything
}

type type_of_image_props = {
    variation: 'next' | 'normal' | 'zoom'
    src: string
    alt: string
    max_width_across_breakpoints: string
    sx: type_of_sx,
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function IMAGE___REUSABLE(props: type_of_image_props) {


    // 🍪 props
    const {
        variation,
        src,
        alt,
        sx: { width, height, borderRadius = '0rem', objectFit = 'cover' },
        max_width_across_breakpoints
    } = props



    /*__________________________________________

    ✅ TSX
    ____________________________________________*/
    return (

        <Box sx={{
            position: 'relative',
            width: width,
            height: height,
            borderRadius: borderRadius,
            objectFit: objectFit
        }}>


            {/* 🍪 'next' variation 🍪 */}
            {variation === 'next' &&

                <Image
                    src={src}
                    alt={alt}

                    fill={true}
                    sizes={max_width_across_breakpoints}


                    placeholder='blur'
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkUAMAACwAKPAXDTMAAAAASUVORK5CYII="


                    style={{
                        objectFit: 'inherit',
                        borderRadius: 'inherit'
                    }}

                />


            }







        </Box>

    )
}