import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SummaryItemComponentStyles } from './types';

const useMergeStyles = (style?: SummaryItemComponentStyles): SummaryItemComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: SummaryItemComponentStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainerStyle: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    titleStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.primaryTextColor,
    },
    amountStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.primaryTextColor,
    },
    subTitleStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.primaryTextColor,
    },
    arrowRightContainer: {
      position: 'absolute',
      right: 3,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
