import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ErrorLoadInvoiceComponentStyles } from './types';

const useMergeStyles = (
  style?: ErrorLoadInvoiceComponentStyles
): ErrorLoadInvoiceComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: ErrorLoadInvoiceComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorTitleStyle: {
      fontSize: 15,
      fontFamily: fonts.regular,
      lineHeight: 20,
      color: colors.primaryTextColor,
      marginTop: 10,
    },
    retryTextStyle: {
      fontSize: 15,
      fontFamily: fonts.regular,
      lineHeight: 20,
      color: colors.primaryColor,
      textAlign: 'center',
    },
    retryButtonContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    errorMessageStyle: {
      color: colors.secondaryTextColor,
      paddingHorizontal: 14,
      textAlign: 'center',
      paddingVertical: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
