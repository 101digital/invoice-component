import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SearchHeaderComponentStyles } from './types';

const useMergeStyles = (style?: SearchHeaderComponentStyles): SearchHeaderComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: SearchHeaderComponentStyles = StyleSheet.create({
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
      paddingVertical: 10,
      zIndex: 2,
    },
    leftButtonContainerStyle: {
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    rightButtonContainerStyle: {
      width: 42,
      height: 42,
      backgroundColor: '#f4f8fb',
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    searchContainerStyle: {
      flexDirection: 'row',
      height: 42,
      alignItems: 'center',
      borderRadius: 22,
      backgroundColor: '#f4f8fb',
      flex: 1,
    },
    searchIconContainerStyle: {
      paddingHorizontal: 15,
    },
    iconSearchContainerStyle: {
      paddingHorizontal: 15,
    },
    searchTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.primaryTextColor,
      flex: 1,
      textAlignVertical: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    },
    activeFilterDotStyle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primaryColor,
      position: 'absolute',
      right: 3,
      top: 3,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
