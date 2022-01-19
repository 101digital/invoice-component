import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceItemComponentStyles } from './types';

const useMergeStyles = (style?: InvoiceItemComponentStyles): InvoiceItemComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);
  const defaultStyles: InvoiceItemComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 2,
      flexDirection: 'row',
    },
    leftContainerStyle: {
      flex: 1,
      paddingVertical: 15,
      paddingLeft: 10,
      paddingRight: 5,
    },
    rightContainerStyle: {
      alignItems: 'flex-end',
    },
    invoiceNumberStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryTextColor,
      marginRight: 5,
    },
    invoiceNumberContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    invoiceDescriptionStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryTextColor,
    },
    invoiceDateStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryTextColor,
      marginTop: 3,
    },
    invoiceAmountContainerStyle: {
      flexDirection: 'row',
    },
    moreContainerStyle: {
      width: 25,
      paddingTop: 15,
      paddingBottom: 4,
      alignItems: 'center',
    },
    invoiceAmountStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryTextColor,
      marginTop: 15,
    },
    statusBoxStyle: {
      marginTop: 2,
      marginRight: 25,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 4,
      marginLeft: 10,
    },
    statusTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
    },
    statusContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subStatusTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: '#9B9BC5',
      marginLeft: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
