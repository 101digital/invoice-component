import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddReferenceModalStyles } from './types';

const useMergeStyles = (style?: AddReferenceModalStyles): AddReferenceModalStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AddReferenceModalStyles = StyleSheet.create({
    headerTitleStyle: {
      color: colors.primaryTextColor,
      fontSize: 18,
      fontFamily: fonts.regular,
      flex: 1,
      textAlign: 'left',
      paddingLeft: 0,
    },
    inputValueContainerStyle: {
      marginVertical: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
