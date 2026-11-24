import { device } from "../breakpoints.ts"

const Fonts = {
    default: 'Inter, sans-serif',

}

const fontSize = {
    extra_small: device.isDesktop ? '12px' : device.isTablet ? '10px' : device.isMobile ? '8px' : "12px", 
    small:  device.isDesktop ? '14px' : device.isTablet ? '12px' : device.isMobile ? '10px' : "14px", 
    normal:  device.isDesktop ? '16px' : device.isTablet ? '14px' : device.isMobile ? '12px' : "16px", 
    medium: device.isDesktop ? '18px' : device.isTablet ? '16px' : device.isMobile ? '14px' : "18px", 
    large:  device.isDesktop ? '24px' : device.isTablet ? '22px' : device.isMobile ? '20px' : "24px", 
}

export { Fonts, fontSize }