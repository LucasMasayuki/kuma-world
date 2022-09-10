import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles'

export type PaletteColors = 'primary' | 'error' | 'secondary' | 'info' | 'success' | 'warning' | 'neutral' | undefined

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
    secondarySuccess: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    secondarySuccess?: Palette['primary']
    neutral?: PaletteOptions['primary']
  }

  interface PaletteColor {
    neutral?: string
  }

  interface SimplePaletteColorOptions {
    neutral?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    confirm: true
  }
  interface ButtonPropsColorOverrides {
    neutral: true
    secondarySuccess: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    neutral: true
  }
}

const appTheme = (): Theme =>
  responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
      palette: {
        primary: {
          main: '#eb5f2d',
          light: '#f79b7a',
          dark: '#a4421f',
        },
        secondary: {
          main: '#0f87d4',
          light: '#89cbff',
          dark: '#004c7d',
        },
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
        secondarySuccess: {
          main: '#4caf50',
          light: '#58d378',
          dark: '#357a38',
          contrastText: '#fff',
        },
        success: {
          main: '#2deb60',
          contrastText: '#fff',
        },
        error: {
          main: '#f44336',
          light: '#F57079',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: '#ffc8a269',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '100px',
              fontWeight: 600,
              padding: '6px 16px',
              textTransform: 'capitalize',
            },
            contained: {
              color: 'white',
            },
          },
          variants: [
            {
              props: { variant: 'confirm' },
              style: {
                backgroundColor: '#2deb60',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#25c24f',
                },
                '&:disabled': {
                  color: 'white',
                  backgroundColor: 'lightgrey',
                  cursor: 'not-allowed',
                },
              },
            },
          ],
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
          },
        },
        MuiListItemText: {
          styleOverrides: {
            root: {
              fontSize: 'small',
            },
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              minWidth: '40px',
            },
          },
        },
        MuiOutlinedInput: {
          defaultProps: {
            margin: 'dense',
          },
          styleOverrides: {
            root: {
              borderRadius: '12px',
            },
          },
        },
        MuiTextField: {
          defaultProps: {
            margin: 'dense',
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
            },
          },
        },
        MuiGrid: {
          styleOverrides: {
            item: {
              padding: 9,
            },
          },
        },
        MuiInputBase: {
          defaultProps: {
            margin: 'dense',
          },
          styleOverrides: {
            root: {
              '& input[type=number]::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                opacity: 1,
              },
            },
            input: {
              padding: '16.5px 14px',
            },
          },
        },
        MuiFormControl: {
          defaultProps: {
            margin: 'dense',
          },
          styleOverrides: {
            root: {
              marginTop: 0,
            },
          },
        },
        MuiFormHelperText: {
          defaultProps: {
            margin: 'dense',
          },
        },
      },
    }),
  )

export default appTheme
