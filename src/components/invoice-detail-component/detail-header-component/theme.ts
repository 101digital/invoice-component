import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { DetailHeaderComponentStyles } from './types';

const useMergeStyles = (style?: DetailHeaderComponentStyles): DetailHeaderComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: DetailHeaderComponentStyles = StyleSheet.create({
    containerStyle: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: '#fff',
      elevation: 0,
      shadowOffset: { width: 0, height: 6 },
      shadowColor: '#D3D3D3',
      shadowOpacity: 0,
      shadowRadius: 4,
      zIndex: 9,
    },
    headerLeftContainerStyle: {
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainerStyle: {
      flex: 1,
    },
    expandedTitleStyle: {
      textAlign: 'center',
      fontFamily: fonts.semiBold,
      color: colors.primaryTextColor,
      fontSize: 16,
    },
    collapsedTitleStyle: {
      fontSize: 16,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
