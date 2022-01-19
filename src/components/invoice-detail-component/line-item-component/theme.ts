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
      borderTopColor: '#f1f1f1',
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
