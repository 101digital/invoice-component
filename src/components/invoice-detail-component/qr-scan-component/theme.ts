import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { QrScanComponentStyles } from './types';

const useMergeStyles = (style?: QrScanComponentStyles): QrScanComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: QrScanComponentStyles = StyleSheet.create({
    containerStyle: {
      minHeight: 430,
      backgroundColor: '#fff',
      borderRadius: 10,
      marginHorizontal: 40,
    },
    headerTitleStyle: {
      color: colors.primaryTextColor,
      fontSize: 16,
      fontFamily: fonts.medium,
      marginLeft: 22,
    },
    rowItemContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    invoiceNumberLabelStyle: {
      color: colors.primaryTextColor,
      fontSize: 14,
      fontFamily: fonts.regular,
      marginLeft: 22,
      paddingVertical: 22,
    },
    invoiceNumberValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 14,
      fontFamily: fonts.medium,
      marginRight: 22,
    },
    amountLabelStyle: {
      color: colors.primaryTextColor,
      fontSize: 14,
      fontFamily: fonts.medium,
      paddingTop: 10,
      marginLeft: 22,
      paddingBottom: 40,
    },
    amountValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 25,
      fontFamily: fonts.bold,
      paddingTop: 10,
      paddingBottom: 40,
      marginRight: 22,
    },
    closeButtonContainerStyle: {
      padding: 22,
    },
    qrContainerStyle: {
      width: 260,
      height: 260,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    qrFrameImageStyle: {
      width: 250,
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
