import {createDarkTheme, createTheme} from 'baseui'

const primitives = {
  primaryFontFamily: 'Questrial',
}

const overrides = {
  typography: {
    DisplayLarge: {
      fontFamily: 'Libre Franklin',
    },
    DisplayMedium: {
      fontFamily: 'Libre Franklin',
    },
    DisplaySmall: {
      fontFamily: 'Libre Franklin',
    },
    DisplayXSmall: {
      fontFamily: 'Libre Franklin',
    },
  },
}

export const LightTheme = createTheme(primitives, overrides)
export const DarkTheme = createDarkTheme(primitives, overrides)
