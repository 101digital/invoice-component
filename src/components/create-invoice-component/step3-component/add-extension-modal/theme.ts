import { addAlpha } from './../../../../utils/helper';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddExtensionModalStyles } from './types';

const useMergeStyles = (style?: AddExtensionModalStyles): AddExtensionModalStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AddExtensionModalStyles = StyleSheet.create({
    headerTitleStyle: {
      color: colors.primaryTextColor,
      fontSize: 18,
      fontFamily: fonts.regular,
      flex: 1,
      textAlign: 'left',
      paddingLeft: 0,
    },
    typeContainerStyle: {
      height: 34,
      borderWidth: 1,
      borderColor: '#E6E6E6',
      borderRadius: 5,
      flexDirection: 'row',
      overflow: 'hidden',
      marginBottom: 10,
      marginTop: 5,
    },
    activeTypeContainerStyle: {
      borderRadius: 5,
      backgroundColor: addAlpha(colors.primaryColor!, 0.2),
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inActiveTypeContainerStyle: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeTypeTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.primaryTextColor,
    },
    inActiveTypeTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: '#8b8b8b',
    },
    inputValueContainerStyle: {
      marginTop: 15,
      marginBottom: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
