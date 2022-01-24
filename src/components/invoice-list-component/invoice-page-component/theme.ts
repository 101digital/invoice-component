import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoicePageComponentStyles } from './types';

const useMergeStyles = (style?: InvoicePageComponentStyles): InvoicePageComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: InvoicePageComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    sectionContainerStyle: {
      paddingLeft: 15,
      paddingVertical: 10,
      paddingTop: 15,
      lineHeight: 15,
      backgroundColor: '#f4f8fb',
    },
    sectionTextStyle: {
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
      fontSize: 13,
    },
    itemSeparatorStyle: {
      height: 1,
      backgroundColor: '#e2e2e2',
      marginHorizontal: 15,
    },
    loadMoreIndicatorStyle: {
      marginVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
