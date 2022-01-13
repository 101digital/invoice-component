import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyInvoicesStyles } from './types';

const useMergeStyles = (style?: EmptyInvoicesStyles): EmptyInvoicesStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: EmptyInvoicesStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    titleTextStyle: {
      fontSize: 15,
      fontFamily: fonts.medium,
      color: colors.primaryTextColor,
      marginVertical: 20,
      textAlign: 'center',
    },
    messageTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
      marginBottom: 30,
      marginHorizontal: 30,
      textAlign: 'center',
      marginTop: -10,
    },
    createButtonContainerStyle: {
      height: 40,
      backgroundColor: colors.primaryButtonColor,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    createButtonTextStyle: {
      fontSize: 15,
      fontFamily: fonts.medium,
      color: colors.primaryButtonLabelColor,
      marginLeft: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
