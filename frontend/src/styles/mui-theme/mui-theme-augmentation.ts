import { 
    TypeBackground, 
    PaletteColor,
    TypeText
} from '@mui/material/styles/createPalette';




declare module '@mui/material/styles/createPalette' {


    
    interface TypeBackground {
      variation_1: string;
      variation_2: string;
      variation_3: string;

      static_variant: {
        light_default: string,
        light_variation_1: string,
        light_variation_2: string,
        light_variation_3: string,

        dark_default: string,
        dark_variation_1: string,
        dark_variation_2: string,
        dark_variation_3: string
      }
      
    }


   
    interface PaletteColor {

        opposite_theme: {

            light: string;
            main: string;
            dark: string;
            contrastText: string;
        },

        static_variant: {

            light_1: string,
            light_2: string,
            light_3: string,

            dark_1: string,
            dark_2: string,
            dark_3: string
        }

    }



 
    interface TypeText {

        opposite_theme: {
            primary: string,
            secondary: string,
            disabled: string,
        },

        static_variant: {
            light_primary: string,
            light_secondary: string,
            light_disabled: string,

            dark_primary: string,
            dark_secondary: string,
            dark_disabled: string,
        }
    }



  
}
  





