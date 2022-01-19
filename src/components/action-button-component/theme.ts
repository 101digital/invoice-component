import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ActionButtonComponentStyles } from './types';

const useMergeStyles = (style?: ActionButtonComponentStyles): ActionButtonComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ActionButtonComponentStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 25,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: '#f4f8fb',
      backgroundColor: 'white',
      borderTopWidth: 1,
    },
    titleStyle: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.primaryTextColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
