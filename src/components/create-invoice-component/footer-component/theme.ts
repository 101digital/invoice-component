import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { FooterComponentStyles } from './types';

const useMergeStyles = (style?: FooterComponentStyles): FooterComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: FooterComponentStyles = StyleSheet.create({
    containerStyle: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
      zIndex: -1,
    },
    buttonContainerStyle: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    amountContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: '#e2e2e2',
      borderBottomWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    amountLabelStyle: {
      color: colors.primaryTextColor,
      fontSize: 16,
      fontFamily: fonts.medium,
    },
    amountValueStyle: {
      color: colors.primaryTextColor,
      fontSize: 25,
      fontFamily: fonts.bold,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
