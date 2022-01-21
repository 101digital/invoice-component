import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { addAlpha } from '../../../utils/helper';
import { FilterModalComponentStyles } from './types';

const useMergeStyles = (style?: FilterModalComponentStyles): FilterModalComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: FilterModalComponentStyles = StyleSheet.create({
    footerContainerStyle: {
      flexDirection: 'row',
      marginHorizontal: 24,
      marginTop: 32,
    },
    headerContainerStyle: {
      padding: 15,
      borderBottomColor: '#e2e2e2',
      borderBottomWidth: 0.5,
    },
    headerTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: colors.primaryTextColor,
      textAlign: 'center',
    },
    labelStyle: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
      marginHorizontal: 24,
      marginVertical: 15,
    },
    itemListContainerStyle: {
      marginHorizontal: 24,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    activeItemContainerStyle: {
      minWidth: 75,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      marginBottom: 8,
      backgroundColor: addAlpha(colors.primaryColor!, 0.3),
    },
    inActiveItemContainerStyle: {
      minWidth: 75,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      marginBottom: 8,
      backgroundColor: '#f2f3f5',
    },
    activeItemTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryColor,
    },
    inActiveItemTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryTextColor,
    },
    sliderContainerStyle: {
      marginHorizontal: 24,
    },
    sliderValueStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.primaryTextColor,
      textAlign: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
