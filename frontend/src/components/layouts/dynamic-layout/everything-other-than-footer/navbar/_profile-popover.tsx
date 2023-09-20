// config
import config_obj from "@/config";


// hook
import { useState } from "react"
import { useTheme } from '@mui/material/styles';


// store
import { auth_store } from "@/store/auth-store"



// routing
import ROUTER_NAVIGATION___COMPONENT from '@/utils/route/router-navigation';

// icons
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutIcon from '@mui/icons-material/Logout'


// components
import { Avatar, Popover, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Switch, Divider } from '@mui/material';




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function PROFILE_POPOVER___COMPONENT() {

    // 🍪 state to show and hide popover
    const [showPopover, SetShowPopover] = useState(null);

    const handle_click = (event) => {
        SetShowPopover(event.currentTarget);
    }

    const handle_close = () => {
        SetShowPopover(null);
    }




    // 🍪 get the state properties 
    const { user_info } = auth_store(state => ({
        user_info: state?.user_info
    }))






    return (

        <>
            <Avatar
                onClick={handle_click}
                src={user_info.picture_link}
                alt={user_info.username}

                sx={(theme) => ({
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: `0 0 0 4px ${theme.palette.divider}`
                    }
                })}
            >
                {/* if the user has no profile, we will show the first letter of the username as avatar */}
                {user_info.username.slice(0, 1)}

            </Avatar>



            <Popover
                open={Boolean(showPopover)}
                anchorEl={showPopover}
                onClose={handle_close}
                disableScrollLock={true}

                anchorOrigin={{
                    vertical: 42,
                    horizontal: 'right',
                }}

                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>



                <POPOVER_CONTENT___CHILD />


            </Popover>

        </>

    )
}



/*__________________________________________

 ✅ Child Component of <PROFILE_POPOVER___COMPONENT/>
____________________________________________*/

function POPOVER_CONTENT___CHILD() {

    // mui theme hook
    const theme = useTheme()

    /*__________________________________________

     ✅ JSX
    ____________________________________________*/
    return (
        <List sx={{ width: '16rem', backgroundColor: 'background.variation_1', border: `2px solid ${theme.palette.divider}` }}>


            {/* Profile */}
            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.profile}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleRoundedIcon sx={{ fontSize: '2rem' }} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
            </ROUTER_NAVIGATION___COMPONENT>



            {/* Settings */}
            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.settings}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon sx={{ fontSize: '2rem' }} />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </ROUTER_NAVIGATION___COMPONENT>




            <Divider />


            {/* Sign out */}
            <ROUTER_NAVIGATION___COMPONENT href={config_obj.page_path.sign_out_confirmation}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon sx={{ fontSize: '2rem' }} />
                        </ListItemIcon>
                        <ListItemText primary="Sign out" />
                    </ListItemButton>
                </ListItem>
            </ROUTER_NAVIGATION___COMPONENT>


        </List>
    )
}
