import { ColorSchemeName } from 'react-native/types';

export const color = {
  dark: {
    backgroundColor: '#F4F5FA',
    black: 'black',
    borderColor: '#E5E4E2',
    darkGrey: '#757A79',
    error: '#BE002C',
    errorBg: '#F4D2D2',
    lightGray: '#bebebe',
    lightGreen: '#b1feb1',
    primaryColor: '#b0447a',
    progressGreen: '#50B155',
    red: '#EE4B2B',
    secondaryColor: '#6c757d',
    tabColor: '#FAF9F6',
    textColor: '#343a40',
    transparent: 'transparent',
    white: 'white',
  },
  light: {
    backgroundColor: '#F4F5FA',
    black: 'black',
    borderColor: '#E5E4E2',
    darkGrey: '#757A79',
    error: '#BE002C',
    errorBg: '#F4D2D2',
    lightGray: '#bebebe',
    lightGreen: '#b1feb1',
    primaryColor: '#b0447a',
    progressGreen: '#50B155',
    red: '#EE4B2B',
    secondaryColor: '#6c757d',
    tabColor: '#FAF9F6',
    textColor: '#343a40',
    transparent: 'transparent',
    white: 'white',
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;

export const getRandomColor = (opacity?: number) => {
  var letters = '0123456789ABCDEF';
  var colorWithHash = '#';
  for (var i = 0; i < 6; i++) {
    colorWithHash += letters[Math.floor(Math.random() * 16)];
  }
  if (opacity) {
    return colorWithHash + opacity?.toString;
  } else {
    return colorWithHash;
  }
};
