import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions (iPhone X/11 styling)
const baseWidth = 375;
const baseHeight = 812;

const scaleWidth = SCREEN_WIDTH / baseWidth;
const scaleHeight = SCREEN_HEIGHT / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

/**
 * Normalizes font size based on screen size
 */
export const fp = (size) => {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

/**
 * Normalizes width based on screen width
 */
export const wp = (dimension) => {
    return (dimension / baseWidth) * 100 + "%";
};

/**
 * Normalizes height based on screen height
 */
export const hp = (dimension) => {
    return (dimension / baseHeight) * 100 + "%";
};

/**
 * Normalizes pixel values strictly (returns number, not percentage)
 * Useful for margins, paddings, absolute positioning etc if precise pixel math is needed
 */
export const normalize = (size) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };
