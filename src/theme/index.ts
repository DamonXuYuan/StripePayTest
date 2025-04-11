import { extendTheme, theme as baseTheme, ThemeConfig } from '@chakra-ui/react'

import styles from './styles'
import borders from './foundations/borders'
import components from './components'

const config: ThemeConfig = {}

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1366px',
}

const colors = {
  ...baseTheme.colors,
  white: {
    '100': '#FFFFFF',
  },
  black: {
    '100': '#000000',
    '200': 'rgba(0, 0, 0, 0.2)',
  },
  blue: {
    '100': '#3A68E7',
  },
  green: {
    '100': '#A3F030',
  },
  yellow: {
    '100': 'rgba(250, 250, 210, 1)',
  },
  red: {
    '100': 'red',
  },
}

const textStyles = {
  '12': {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '14': {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '16': {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '18': {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '24': {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '30': {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '48': {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  '64': {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 1,
  },
}

const layerStyles = {}

// https://chakra-ui.com/docs/theming/theme
const theme = extendTheme({
  config,
  colors,
  fonts: {
    body: '"Bai Jamjuree Regular", "SF Pro Display", "PingFang SC", "Source Han Sans CN", "Microsoft Yahei"',
  },
  sizes: {
    xl: '1080px',
  },
  fontSizes: {
    '12': '12px',
    '14': '14px',
    '16': '16px',
    '18': '18px',
    '24': '24px',
  },
  styles,
  borders,
  components,
  breakpoints,
  layerStyles,
  textStyles,
})

export default theme
