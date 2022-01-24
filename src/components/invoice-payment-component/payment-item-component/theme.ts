import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { PaymentItemComponentStyles } from './types';

const useMergeStyles = (style?: PaymentItemComponentStyles): PaymentItemComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: PaymentItemComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#f4f8fb',
      borderBottomWidth: 1,
      borderBottomColor: '#bfbfbf',
      paddingVertical: 12,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    paymentTypeStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.regular,
      flex: 1,
    },
    amountStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.regular,
    },
    footerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
      marginRight: 7.5,
      marginTop: 5,
    },
    dateStyle: {
      color: colors.primaryTextColor,
      fontSize: 13,
      fontFamily: fonts.regular,
      alignItems: 'center',
      paddingRight: 20,
      flex: 1,
    },
    actionButtonContainerStyle: {
      paddingHorizontal: 7.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
