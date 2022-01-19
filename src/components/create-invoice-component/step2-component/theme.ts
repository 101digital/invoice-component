import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { Step2ComponentStyles } from './types';

const useMergeStyles = (style?: Step2ComponentStyles): Step2ComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: Step2ComponentStyles = StyleSheet.create({
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
    addButtonContainerStyle: {
      width: '100%',
      height: 40,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: '#f4f8fb',
      borderBottomWidth: 2,
      borderTopWidth: 1,
    },
    addButtonTitleStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.medium,
      zIndex: 99,
      paddingLeft: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
