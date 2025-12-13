/* Typography - Figma Text Styles */
export const Typography = {
    largeTitleRegular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 34,
      lineHeight: 41,
      letterSpacing: 0.4,
    },
    largeTitleEmphasized: {
      fontFamily: "SF Pro",
      fontWeight: "700" as const,
      fontSize: 34,
      lineHeight: 41,
      letterSpacing: 0.4,
    },
    title1Emphasized: {
      fontFamily: "SF Pro",
      fontWeight: "700" as const,
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: 0.38,
    },
    title2Regular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: -0.26,
    },
    title2Emphasized: {
      fontFamily: "SF Pro",
      fontWeight: "700" as const,
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: -0.26,
    },
    title3Regular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 20,
      lineHeight: 25,
      letterSpacing: -0.45,
    },
    title3Emphasized: {
      fontFamily: "SF Pro",
      fontWeight: "600" as const,
      fontSize: 20,
      lineHeight: 25,
      letterSpacing: -0.45,
    },
    bodyRegular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.43,
    },
    bodyEmphasized: {
      fontFamily: "SF Pro",
      fontWeight: "600" as const,
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.43,
    },
    bodyStrong: {
      fontFamily: "Inter",
      fontWeight: "600" as const,
      fontSize: 16,
    },
    calloutRegular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: -0.31,
    },
    calloutEmphasized: {
      fontFamily: "SF Pro",
      fontWeight: "600" as const,
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: -0.31,
    },
    subheadlineRegular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.23,
    },
    subheadlineEmphasized: {
      fontFamily: "SF Pro",
      fontWeight: "600" as const,
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.23,
    },
    caption1Regular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    caption1Emphasized: {
      fontFamily: "SF Pro",
      fontWeight: "500" as const,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    caption2Regular: {
      fontFamily: "SF Pro",
      fontWeight: "400" as const,
      fontSize: 11,
      lineHeight: 13,
      letterSpacing: 0.06,
    },
  };
  
  /* Colors - Figma Colors */
  export const Color = {
    // Transparent colors
    transparentBlack80: "#000000CC",
    transparentBlack64: "#000000A3",
    transparentBlack48: "#0000007A",
    transparentBlack32: "#00000052",
    transparentBlack16: "#00000029",
    transparentWhite80: "#FFFFFFCC",
    transparentWhite64: "#FFFFFFA3",
    transparentWhite48: "#FFFFFF7A",
    transparentWhite32: "#FFFFFF52",
    transparentWhite16: "#FFFFFF29",
  
    // Blue scale
    blue95: "#172554FF",
    blue90: "#1E3A8AFF",
    blue80: "#1E40AFFF",
    blue70: "#1D4ED8FF",
    blue60: "#2563EBFF",
    blue50ButtonBlueForBlackFontOrBlueFontOnBlackBg: "#3C83F6FF",
    blue40: "#60A5FAFF",
    blue30: "#93C5FDFF",
    blue20: "#BFDBFEFF",
    blue10: "#DBEAFEFF",
    blue5: "#EFF6FFFF",
  
    // Success scale
    success95: "#1A2E05FF",
    success90: "#365314FF",
    success80: "#3F6212FF",
    success70: "#4D7C0FFF",
    success60: "#0AC257FF",
    success50: "#15C55FFF",
    success40: "#26C86AFF",
    success30: "#BEF264FF",
    success20: "#D9F99DFF",
    success10: "#ECFCCBFF",
    success5: "#F7FEE7FF",
  
    // Warning scale
    warning95: "#451A03FF",
    warning90: "#78350FFF",
    warning80: "#92400EFF",
    warning70: "#B45309FF",
    warning60: "#D97706FF",
    warning50: "#F59E0BFF",
    warning40: "#FBBF24FF",
    warning30: "#FCD34DFF",
    warning20: "#FDE68AFF",
    warning10: "#FEF3C7FF",
    warning5: "#FFFBEBFF",
  
    // Destructive scale
    destructive95: "#4C0519FF",
    destructive90: "#881337FF",
    destructive80: "#9F1239FF",
    destructive70: "#BE123CFF",
    destructive60: "#E11D48FF",
    destructive50: "#F43F5EFF",
    destructive40: "#FB7185FF",
    destructive30: "#FDA4AFFF",
    destructive20: "#FECDD3FF",
    destructive10: "#FFE4E6FF",
    destructive5: "#FFF1F1FF",
  
    // Ranking colors
    ranking5060: "#B03D2CFF",
    ranking6070: "#E08438FF",
    ranking7080: "#EDC342FF",
    ranking8090: "#8CFFA4FF",
    ranking90100: "#15C55FFF",
  
    // Orange colors
    orangeSteakLight: "#FFC801FF",
    orangeStreakDark: "#FF9600FF",
    orangePremiumOrange: "#FFAC04FF",
  
    // Brand scale
    brand95: "#172554FF",
    brand90: "#1E3A8AFF",
    brand80: "#1E40AFFF",
    brand70: "#1D4ED8FF",
    brand60: "#2563EBFF",
    brand50GraphicsOrBrandButton: "#1068F4FF",
    brand40LetzteButtonOrBlueText: "#3C83F6FF",
    brand30: "#93C5FDFF",
    brand20: "#BFDBFEFF",
    brand10: "#DBEAFEFF",
    brand5: "#EFF6FFFF",
  
    // Neutral colors
    neutralBlackText: "#000000FF",
    neutralBackgroundDark: "#121212FF",
    neutralBackgroundDarkElevated: "#1F1F1FFF",
    neutralInputOnDark: "#262626FF",
    neutralTagColor: "#333333FF",
    neutralStrokeColor: "#3F3F46FF",
    neutralButtonInactive: "#535353FF",
    neutralTextOrTabGrey: "#B3B3B3FF",
    neutralWhite: "#FFFFFFFF",
  
    // Legacy colors (for backward compatibility)
    colorBlueviolet: "#9747ff",
    colorDarkgray: "#b3b3b3",
    colorDarkslategray: "#3f3f46",
    colorRoyalblue: "#1068f4",
    colorWhite: "#fff",
    colorGray100: "#262626",
    colorGray200: "#1f1f1f",
  };
  
  /* Fonts - Legacy support */
  export const FontFamily = {
    sFPro: "SF Pro",
    inter: "Inter",
  };
  
  /* Font sizes - Legacy support */
  export const FontSize = {
    fs_11: 11,
    fs_12: 12,
    fs_15: 15,
    fs_16: 16,
    fs_17: 17,
    fs_20: 20,
    fs_22: 22,
    fs_28: 28,
    fs_34: 34,
  };
  
  /* Line heights - Legacy support */
  export const LineHeight = {
    lh_13: 13,
    lh_16: 16,
    lh_20: 20,
    lh_21: 21,
    lh_22: 22,
    lh_25: 25,
    lh_28: 28,
    lh_34: 34,
    lh_41: 41,
  };
  
  /* Letter spacing - Legacy support */
  export const LetterSpacing = {
    ls_0_06: 0.06,
    ls_0: 0,
    ls__0_23: -0.23,
    ls__0_26: -0.26,
    ls__0_31: -0.31,
    ls__0_43: -0.43,
    ls__0_45: -0.45,
    ls_0_38: 0.38,
    ls_0_4: 0.4,
  };
  
  /* Gaps */
  export const Gap = {
    gap_6: 6,
    gap_8: 8,
    gap_16: 16,
  };
  
  /* Paddings */
  export const Padding = {
    padding_10: 10,
    padding_16: 16,
    padding_2: 2,
    padding_4: 4,
    
  };
  
  /* Box shadows - Figma Effects */
  export const BoxShadow = {
    shadow_drop: "0px 4px 8px rgba(15, 23, 42, 0.03)",
    shadow_drop1: "0px 12px 16px rgba(15, 23, 42, 0.08)",
    shadowXs: {
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      shadowColor: "rgba(15, 23, 42, 0.13)",
      shadowOpacity: 1,
      elevation: 1,
    },
    shadowSm: {
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      shadowColor: "rgba(15, 23, 42, 0.15)",
      shadowOpacity: 1,
      elevation: 2,
    },
    shadowMd: {
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      shadowColor: "rgba(15, 23, 42, 0.05)",
      shadowOpacity: 1,
      elevation: 4,
    },
    shadowLg: {
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      shadowColor: "rgba(15, 23, 42, 0.08)",
      shadowOpacity: 1,
      elevation: 6,
    },
    shadowXl: {
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 8,
      shadowColor: "rgba(15, 23, 42, 0.08)",
      shadowOpacity: 1,
      elevation: 8,
    },
    shadow2Xl: {
      shadowOffset: { width: 0, height: 24 },
      shadowRadius: 48,
      shadowColor: "rgba(15, 23, 42, 0.46)",
      shadowOpacity: 1,
      elevation: 12,
    },
    shadowG: {
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.31)",
      shadowOpacity: 1,
      elevation: 6,
    },
    dropShadowStandard: {
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOpacity: 1,
      elevation: 4,
    },
  };
  
  /* Width */
  export const Width = {
    width_24: 24,
    width_40: 40,
    width_48: 48,
  };
  
  /* Height */
  export const Height = {
    height_24: 24,
    height_40: 40,
    height_5: 5,
    height_48: 48,
  };
  
  /* Border radiuses */
  export const Border = {
    br_9999: 9999,
  };
  
  /* Grid - Figma Grids */
  export const Grid = {
    mobileGrid: {
      alignment: "STRETCH",
      count: 4,
      gutterSize: 16,
      pattern: "COLUMNS",
    },
  };
  