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
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
    descriptionStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.primaryTextColor,
      lineHeight: 20,
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitleStyle: {
      fontFamily: fonts.semiBold,
      color: colors.primaryTextColor,
      fontSize: 16,
      marginRight: 55,
      flex: 1,
      textAlign: 'center',
    },
    backButtonContainerStyle: {
      width: 55,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
