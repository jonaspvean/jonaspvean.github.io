export interface ColorScheme {
  /* the following colors are from al-folio */
  white: string
  black: string
  lightgrey: string
  darkgrey: string
  grey: string
  purple: string
  cyan: string
  

  /* these colors are from Quartz */
  light: string
  lightgray: string
  gray: string
  darkgray: string
  dark: string
  secondary: string
  tertiary: string
  highlight: string
}

interface Colors {
  lightMode: ColorScheme
  darkMode: ColorScheme
}

export interface Theme {
  typography: {
    navbar: string
    header: string
    body: string
    code: string
  }
  cdnCaching: boolean
  colors: Colors
  fontOrigin: "googleFonts" | "local"
}

export type ThemeKey = keyof Colors

// adds the al-folio Roboto font for the navbar:
const DEFAULT_NAVBAR = 
  'Roboto'
const DEFAULT_SANS_SERIF =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const DEFAULT_MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"

export function googleFontHref(theme: Theme) {
  const { navbar, code, header, body } = theme.typography
  return `https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,400;0,600;1,400;1,600&display=swap&family=${navbar}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`
}

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
  return `
${stylesheet.join("\n\n")}

:root {
  --global-bg-color: ${theme.colors.lightMode.white};
  --global-text-color: ${theme.colors.lightMode.black};
  --global-text-color-light: ${theme.colors.lightMode.grey};
  --global-theme-color: ${theme.colors.lightMode.purple};
  --global-hover-color: ${theme.colors.lightMode.purple};
  --global-hover-text-color: ${theme.colors.lightMode.white};
  --global-footer-link-color: ${theme.colors.lightMode.white};
  --global-distill-app-color: ${theme.colors.lightMode.grey};
  --global-divider-color: rgba(0, 0, 0, 0.1);
  --global-card-bg-color: ${theme.colors.lightMode.white};


  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};

  --navbarFont: "${theme.typography.navbar}", ${DEFAULT_NAVBAR};
  --headerFont: "${theme.typography.header}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${theme.typography.body}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${theme.typography.code}", ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  
  --global-bg-color: ${theme.colors.darkMode.darkgrey};
  --global-text-color: ${theme.colors.darkMode.lightgrey};
  --global-text-color-light: ${theme.colors.darkMode.grey};
  --global-theme-color: ${theme.colors.darkMode.cyan};
  --global-hover-color: ${theme.colors.darkMode.cyan}; 
  --global-hover-text-color: ${theme.colors.darkMode.white};
  --global-distill-app-color: ${theme.colors.darkMode.lightgrey};
  --global-divider-color: #424246;
  --global-card-bg-color: #{$grey-900};


  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
}
`
}
