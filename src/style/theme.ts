import { Colors } from "./tokens/Colors.ts";
import { fontSize } from "./tokens/Fonts.ts";

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
        
        brand_color_200: string;
        brand_color_300: string;
        brand_color_400: string;
        brand_color_500: string;
        brand_color_600: string;
        brand_color_700: string;
        
        neutro_color_200: string;
        neutro_color_300: string;
        neutro_color_400: string;
        neutro_color_500: string;
        neutro_color_600: string;
        neutro_color_700: string;

        feedback_color_green: string;
        feedback_color_red: string;
        feedback_color_yellow: string;
        
        
        secondary_color_200: string;
        secondary_color_300: string;
        secondary_color_400: string;
        secondary_color_500: string;
        secondary_color_600: string;
        secondary_color_700: string;
        
        background_color: string;
    };
    fonts: {
        extra_small: string;
        small: string;
        normal: string;
        medium: string;
        large: string;

    };
  }
}


const defaultTheme = {
    colors: Colors,
    fonts: fontSize,
}


export default defaultTheme;