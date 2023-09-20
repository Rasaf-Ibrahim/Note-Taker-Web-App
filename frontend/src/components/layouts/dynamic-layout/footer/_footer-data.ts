// config
import config_obj from "@/config";

// icons
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from '@mui/icons-material/GitHub';

// types
import { type_of_mui_icon_component, type_of_react_functional_component } from "@/types/commonly-used-types";


type type_of_footer_data = {

    basic?: {
        logo_component?: type_of_react_functional_component
        about?: string;
        address?: string;
        helpline?: string;
        available?: string;
    }

    social_accounts?: {
        ICON_COMPONENT?: type_of_mui_icon_component
        link?: string;
    }[]

    payment_methods_img_src?: string[]

    groups_of_link?: {
        title?: string;
        links?: {
            text?: string;
            url?: string;
        }[]

    }[]

}




export const footer_data: type_of_footer_data = {


    /* 🍪 */
    social_accounts: [
        {
            ICON_COMPONENT: TwitterIcon,
            link: 'https://twitter.com/_Rasaf_Ibrahim'
        },

        {
            ICON_COMPONENT: LinkedInIcon,
            link: 'https://www.linkedin.com/in/rasaf-ibrahim'
        },

        {
            ICON_COMPONENT: GitHubIcon,
            link: 'https://github.com/Rasaf-Ibrahim'
        },

    ],




    /* 🍪 */
    groups_of_link: [



        {
            title: 'Legal',

            links: [

                {
                    text: 'Privacy Policy',
                    url: config_obj.page_path.privacy_policy
                },

                {
                    text: 'Terms of Service',
                    url: config_obj.page_path.terms_of_service
                },

                {
                    text: 'Cookie Use',
                    url: config_obj.page_path.cookie_use
                },

            ],
        },

    ]
}



