import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceDetailComponentStyles } from './types';

const useMergeStyles = (style?: InvoiceDetailComponentStyles): InvoiceDetailComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: InvoiceDetailComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    contentContainerStyle: {
      flex: 1,
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
      flexDirection: 'row',
      paddingHorizontal: 15,
    },
    rowItemContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerContainerStyle: {
      backgroundColor: '#fff',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      padding: 15,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      elevation: 2,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      zIndex: 5,
    },
    invoiceNumberStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.primaryTextColor,
      lineHeight: 20,
    },
    invoiceVersionStyle: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: colors.primaryTextColor,
      lineHeight: 20,
    },
    qrContainerStyle: {
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 5,
      marginLeft: 15,
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContentContainerStyle: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#f4f8fb',
      borderRadius: 5,
      marginTop: 15,
    },
    headerItemTitleStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.primaryTextColor,
    },
    headerItemValueStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryTextColor,
      paddingVertical: 5,
    },
    itemsLabelStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryTextColor,
      margin: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
