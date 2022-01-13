import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceDescriptionComponentStyles } from './types';

const useMergeStyles = (
  style?: InvoiceDescriptionComponentStyles
): InvoiceDescriptionComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: InvoiceDescriptionComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 24,
      backgroundColor: 'white',
    },
    descriptionStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.primaryTextColor,
      lineHeight: 20,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
