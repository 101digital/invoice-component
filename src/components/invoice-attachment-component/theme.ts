import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AttachmentComponentStyles } from './types';

const useMergeStyles = (style?: AttachmentComponentStyles): AttachmentComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AttachmentComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 8,
      paddingTop: 10,
      backgroundColor: 'white',
    },
    footerContainerStyle: {
      marginTop: 10,
    },
    actionButtonStyle: {
      padding: 10,
      flexDirection: 'row',
      backgroundColor: '#f4f8fb',
      marginVertical: 5,
      marginHorizontal: 10,
    },
    actionButtonTitleStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
      marginLeft: 10,
    },
    uploadingContainerStyle: {
      margin: 8,
    },
    uploadingTextStyle: {
      fontSize: 15,
      fontFamily: fonts.regular,
      color: colors.primaryTextColor,
      marginLeft: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
