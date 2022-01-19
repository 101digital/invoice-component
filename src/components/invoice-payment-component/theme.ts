import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoicePaymentComponentStyles } from './types';

const useMergeStyles = (style?: InvoicePaymentComponentStyles): InvoicePaymentComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: InvoicePaymentComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainerStyle: {
      flex: 1,
      paddingBottom: 3,
    },
    footerContainerStyle: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 10,
      elevation: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    addButtonContainerStyle: {
      flexDirection: 'row',
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#f4f8fb',
      borderBottomWidth: 1,
    },
    rowItemContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalAmountLabelStyle: {
      color: colors.primaryTextColor,
      fontSize: 16,
      fontFamily: fonts.medium,
      paddingVertical: 15,
    },
    totalAmountValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 25,
      fontFamily: fonts.bold,
    },
    balanceDueLabelStyle: {
      color: colors.primaryTextColor,
      fontSize: 14,
      fontFamily: fonts.medium,
      paddingVertical: 5,
    },
    balanceDueValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 17,
      fontFamily: fonts.bold,
    },
    addButtonTitleStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.medium,
      zIndex: 99,
      opacity: 1,
      paddingLeft: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
