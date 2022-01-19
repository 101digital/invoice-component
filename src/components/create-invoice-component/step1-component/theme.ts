import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { Step1ComponentStyles } from './types';

const useMergeStyles = (style?: Step1ComponentStyles): Step1ComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: Step1ComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    contentContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    labelTextStyle: {
      paddingVertical: 10,
      paddingBottom: 10,
      color: colors.primaryTextColor,
      fontFamily: fonts.regular,
    },
    suffixIconContainerStyle: {
      paddingHorizontal: 10,
    },
    descriptionContainerStyle: {
      height: 110,
      paddingVertical: 7,
      alignItems: 'flex-start',
    },
    datesContainerStyle: {
      flexDirection: 'row',
    },
    dateItemContainerStyle: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
