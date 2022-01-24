import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddInvoiceModalComponentStyles } from './types';

const useMergeStyles = (style?: AddInvoiceModalComponentStyles): AddInvoiceModalComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AddInvoiceModalComponentStyles = StyleSheet.create({
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
    contentContainerStyle: {
      flex: 1,
      marginHorizontal: 15,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButtonContainerStyle: {
      height: 55,
      width: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryTextColor,
      lineHeight: 17,
      flex: 1,
      textAlign: 'center',
      marginLeft: 55,
    },
    labelTextStyle: {
      marginBottom: 10,
      fontSize: 13,
      fontFamily: fonts.medium,
      color: colors.primaryTextColor,
      marginTop: 15,
    },
    quantityActionButtonStyle: {
      height: 40,
      width: 42,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityContainerStyle: {
      marginTop: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
