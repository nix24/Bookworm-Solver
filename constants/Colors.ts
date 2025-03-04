/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Bookworm theme colors - inspired by Lex the bookworm (green with red bowtie)
const primaryGreen = '#2A9D8F'; // Vibrant green for Lex's body
const primaryRed = '#9D2A38';   // Warm red for Lex's bowtie
const accentYellow = '#E9C46A'; // Warm accent color
const darkGreen = '#264653';    // Dark green for contrast
const lightCream = '#F8F9FA';   // Light background color

export const Colors = {
  light: {
    text: darkGreen,
    background: lightCream,
    tint: primaryGreen,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryGreen,
    
    // Glassmorphism and Frutiger Aero style colors
    primary: primaryGreen,
    secondary: primaryRed,
    accent: accentYellow,
    cardBackground: 'rgba(255, 255, 255, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.5)',
    glassShadow: 'rgba(0, 0, 0, 0.1)',
    buttonGradientStart: primaryGreen,
    buttonGradientEnd: '#38B2AC',
    inputBackground: 'rgba(255, 255, 255, 0.8)',
    tableBorder: 'rgba(42, 157, 143, 0.3)',
    tableHeaderBackground: 'rgba(42, 157, 143, 0.1)',
    tableRowEven: 'rgba(255, 255, 255, 0.7)',
    tableRowOdd: 'rgba(248, 249, 250, 0.9)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#1A1E23',
    tint: primaryGreen,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryGreen,
    
    // Glassmorphism and Frutiger Aero style colors
    primary: primaryGreen,
    secondary: primaryRed,
    accent: accentYellow,
    cardBackground: 'rgba(38, 70, 83, 0.7)',
    glassBorder: 'rgba(42, 157, 143, 0.3)',
    glassShadow: 'rgba(0, 0, 0, 0.3)',
    buttonGradientStart: primaryGreen,
    buttonGradientEnd: '#1E6E64',
    inputBackground: 'rgba(38, 70, 83, 0.6)',
    tableBorder: 'rgba(42, 157, 143, 0.3)',
    tableHeaderBackground: 'rgba(42, 157, 143, 0.2)',
    tableRowEven: 'rgba(38, 70, 83, 0.7)',
    tableRowOdd: 'rgba(26, 30, 35, 0.8)',
  },
};
