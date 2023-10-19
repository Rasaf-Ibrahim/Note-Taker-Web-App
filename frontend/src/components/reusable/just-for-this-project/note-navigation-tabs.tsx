/*__________________________________________

 ✅ import
____________________________________________*/

// config
import config_obj from "@/config"

// components
import {Box, Typography} from "@mui/material"

import NAVIGATION_TABS___REUSABLE from "../for-any-project/navigation-tabs/navigation-tabs"



/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function NOTE_NAVIGATION_TABS___REUSABLE() {

    return (
        <Box sx={{marginTop:'1.5rem', marginBottom:'1.5rem'}}>

            <NAVIGATION_TABS___REUSABLE 
                    
                    tabs_info={[

                        {
                            tab_name_jsx: <Typography variant='body2'> Notes </Typography>,
                            tab_href: config_obj.page_path.all_notes
                        },

                        {
                            tab_name_jsx: <Typography variant='body2'> Bookmarks </Typography>,
                            tab_href: config_obj.page_path.bookmarked_notes
                        },
                   
                        {
                            tab_name_jsx: <Typography variant='body2'> Create Note </Typography>,
                            tab_href: config_obj.page_path.create_note
                        },
                    ]}

                    tab_style={{
                        bottom_border_size: 'short'
                    }}
            
            />
        
        </Box>
    )


}