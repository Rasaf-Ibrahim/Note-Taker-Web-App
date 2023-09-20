/*__________________________________________

 ✅ import
____________________________________________*/

// hook
import { useState } from 'react';

// routing
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation';

// components
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'


// icons
import Inbox from "@mui/icons-material/Inbox";
import Drafts from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function DRAWER_CONTENT___COMPONENT() {



    /*__________________________________________

     ✅ JSX
    ____________________________________________*/
    return (
        <List>


            {/* if you don't need nested items, use <ONE_ITEM___CHILD/> */}
            <ONE_ITEM___CHILD
                item_info={{
                    link: '/',
                    icon: <Inbox />,
                    label: 'Inbox'
                }}
            />


            {/* if you need nested items, use <NESTED_ITEMS___CHILD/> */}

            <NESTED_ITEMS___CHILD

                category_info={{
                    // icon is optional
                    label: 'Send'
                }}


                items_info={[

                    {
                        link: '/',
                        label: 'Inbox',
                        icon: <Inbox />
                    },

                    {
                        link: '/',
                        label: 'Drafts',
                        icon: <Drafts />
                    }

                ]}

            />



        </List>
    )
}




/*__________________________________________

 ✅ Section of 
 <NAV_LIST___COMPONENT/>
____________________________________________*/


function ONE_ITEM___CHILD ({ item_info }) {


    return (

        <ROUTER_NAVIGATION___COMPONENT href={item_info.link}>

            <ListItemButton>

                <ListItemIcon sx={{ fontSize: '1.7rem' }}>
                    {item_info.icon}
                </ListItemIcon>

                <ListItemText primary={item_info.label} />

            </ListItemButton>

        </ROUTER_NAVIGATION___COMPONENT>
    )
}



/*__________________________________________

 ✅ Section of 
 <NAV_LIST___COMPONENT/>
____________________________________________*/


function NESTED_ITEMS___CHILD ({ category_info, items_info }){

    const [open, setOpen] = useState(false)

    const handle_click = () => {
        setOpen(!open)
    }


    return (

        <>

            {/* Label and icon of the category of the nested items_info */}
            <ListItemButton onClick={handle_click}>

                <ListItemIcon sx={{ fontSize: '1.7rem' }}>
                    {category_info.icon}
                </ListItemIcon>

                <ListItemText primary={category_info.label} />

                {open ? <ExpandLess /> : <ExpandMore />}

            </ListItemButton>



            {/* Nested Items  */}
            <Collapse in={open} timeout="auto" unmountOnExit>

                <List sx={{ paddingLeft: '1rem' }}>

                    {items_info.map((item_info) => {

                        return (

                            <ROUTER_NAVIGATION___COMPONENT
                            key={item_info.link} 
                            href={item_info.link}>

                                <ListItemButton>

                                    <ListItemIcon sx={{ fontSize: '1.7rem' }}>
                                        {item_info.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item_info.label} />

                                </ListItemButton>

                            </ROUTER_NAVIGATION___COMPONENT>
                        )


                    })}

                </List>

            </Collapse>

        </>

    )
}