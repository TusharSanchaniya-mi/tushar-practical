import { ColorSchemeName } from 'react-native/types';

export const color = {
  dark: {
    backgroundColor: '#f8f9fa',
    black: 'black',
    error: '#BE002C',
    errorBg: '#F4D2D2',
    lightGray: '#bebebe',
    lightGreen: '#b1feb1',
    primaryColor: '#b0447a',
    progressGreen: '#50B155',
    red: '#EE4B2B',
    secondaryColor: '#6c757d',
    textColor: '#343a40',
    white: 'white',
  },
  light: {
    backgroundColor: '#f8f9fa',
    black: 'black',
    error: '#BE002C',
    errorBg: '#F4D2D2',
    lightGray: '#bebebe',
    lightGreen: '#b1feb1',
    primaryColor: '#b0447a',
    progressGreen: '#50B155',
    red: '#EE4B2B',
    secondaryColor: '#6c757d',
    textColor: '#343a40',
    white: 'white',
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
