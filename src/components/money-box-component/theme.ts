import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { MoneyBoxComponentStyles } from './types';

const useMergeStyles = (style?: MoneyBoxComponentStyles): MoneyBoxComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: MoneyBoxComponentStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 15,
      borderRadius: 5,
      paddingHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: colors.primaryColor,
      alignItems: 'center',
    },
    contentContainerStyle: {
      flex: 1,
      marginRight: 5,
    },
    labelStyle: {
      color: '#ffffff',
      fontSize: 15,
      fontFamily: fonts.regular,
    },
    valueStyle: {
      marginTop: 5,
      color: '#ffffff',
      fontFamily: fonts.medium,
      fontSize: 20,
      fontWeight: '600',
    },
    iconContainer: {
      backgroundColor: 'white',
      height: 36,
      width: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
