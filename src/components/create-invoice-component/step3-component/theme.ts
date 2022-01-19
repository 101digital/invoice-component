import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { Step3ComponentStyles } from './types';

const useMergeStyles = (style?: Step3ComponentStyles): Step3ComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: Step3ComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    contentContainerStyle: {
      paddingBottom: 20,
    },
    headerLabelStyle: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      color: colors.primaryTextColor,
      fontSize: 13,
      fontFamily: fonts.medium,
      zIndex: 99,
    },
    detailContainerStyle: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderColor: '#f4f8fb',
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    detailItemContainerStyle: {
      flexDirection: 'row',
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailItemLabelStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.regular,
    },
    detailItemValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.medium,
      alignItems: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
