import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { LineItemComponentStyles } from './types';

const useMergeStyles = (style?: LineItemComponentStyles): LineItemComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: LineItemComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#f4f8fb',
      paddingVertical: 12,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    itemNameStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.regular,
    },
    itemPriceStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.regular,
    },
    itemQuantityStyle: {
      paddingTop: 5,
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
    },
    footerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: 15,
      paddingRight: 7.5,
    },
    tagContainerStyle: {
      height: 22,
      borderRadius: 11,
      paddingHorizontal: 10,
      justifyContent: 'center',
      marginRight: 5,
      marginTop: 5,
    },
    tagValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 13,
      fontFamily: fonts.regular,
    },
    actionButtonStyle: {
      paddingVertical: 5,
      paddingHorizontal: 7.5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
