import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceActionSheetStyles } from './types';

const useMergeStyles = (style?: InvoiceActionSheetStyles): InvoiceActionSheetStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: InvoiceActionSheetStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    actionButtonStyle: {
      flexDirection: 'row',
      paddingVertical: 15,
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
    },
    actionTitleStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.primaryTextColor,
      position: 'absolute',
      left: 50,
    },
    cancelButtonStyle: {
      flexDirection: 'row',
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    cancelTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: 'red',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
