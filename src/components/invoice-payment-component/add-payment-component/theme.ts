import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddPaymentComponentStyles } from './types';

const useMergeStyles = (style?: AddPaymentComponentStyles): AddPaymentComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AddPaymentComponentStyles = StyleSheet.create({
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
      borderBottomWidth: 1,
      borderBottomColor: '#e2e2e2',
    },
    closeButtonContainerStyle: {
      height: 55,
      width: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
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
    suffixIconStyle: {
      paddingHorizontal: 10,
    },
    paymentTypeContainerStyle: {
      paddingHorizontal: 15,
      maxHeight: 200,
      borderRadius: 3,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: Platform.OS === 'ios' ? 1 : 4,
      position: 'absolute',
      backgroundColor: '#ffffff',
      marginTop: 3,
      zIndex: 100,
      left: 1,
      right: 1,
      borderWidth: 1,
      borderColor: '#e1e1e1',
    },
    paymentTypeItemContainerStyle: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e2e2',
    },
    paymentTypeItemTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.primaryTextColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
