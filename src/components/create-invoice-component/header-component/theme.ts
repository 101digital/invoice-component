import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { HeaderComponentStyles } from './types';

const useMergeStyles = (style?: HeaderComponentStyles): HeaderComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: HeaderComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      elevation: 3,
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      alignItems: 'center',
      paddingBottom: 10,
      zIndex: 2,
    },
    stepContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    appBarContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonContainerStyle: {
      height: 45,
      width: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitleStyle: {
      fontFamily: fonts.semiBold,
      color: colors.primaryTextColor,
      fontSize: 16,
      textAlign: 'center',
      flex: 1,
    },
    activeLineStyle: {
      flex: 1,
      height: 1,
      backgroundColor: colors.primaryColor,
    },
    inActiveLineStyle: {
      flex: 1,
      height: 1,
      backgroundColor: '#d2d4d6',
    },
    activeStepContainerStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inActiveStepContainerStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#d2d4d6',
    },
    activeStepNumberStyle: {
      color: '#ffffff',
      fontSize: 15,
      fontFamily: fonts.regular,
      fontWeight: '600',
      textAlign: 'center',
    },
    inActiveStepNumberStyle: {
      color: colors.primaryTextColor,
      fontSize: 15,
      fontFamily: fonts.regular,
      fontWeight: '600',
      textAlign: 'center',
    },
    labelContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 8,
    },
    activeLabelStyle: {
      flex: 1,
      color: colors.primaryColor,
      fontSize: 15,
      fontFamily: fonts.regular,
      fontWeight: '600',
      textAlign: 'center',
    },
    inActiveLabelStyle: {
      flex: 1,
      color: 'grey',
      fontSize: 15,
      fontFamily: fonts.regular,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
