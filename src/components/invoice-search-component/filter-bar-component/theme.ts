import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { addAlpha } from '../../../utils/helper';
import { FilterBarComponentStyles } from './types';

const useMergeStyles = (style?: FilterBarComponentStyles): FilterBarComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: FilterBarComponentStyles = StyleSheet.create({
    containerStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: 10,
      paddingHorizontal: 15,
      borderTopWidth: 1,
      borderTopColor: '#e2e2e2',
      marginTop: 10,
      alignItems: 'center',
    },
    labelStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryTextColor,
      marginRight: 10,
    },
    itemCloseButtonStyle: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainerStyle: {
      height: 28,
      borderRadius: 14,
      backgroundColor: addAlpha(colors.primaryColor!, 0.3),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingLeft: 10,
      marginRight: 10,
    },
    itemTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.primaryColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
