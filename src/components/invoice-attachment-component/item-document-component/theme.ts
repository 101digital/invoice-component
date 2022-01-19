import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ItemDocumentComponentStyles } from './types';

const useMergeStyles = (style?: ItemDocumentComponentStyles): ItemDocumentComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ItemDocumentComponentStyles = StyleSheet.create({
    containerStyle: {
      aspectRatio: 1,
      flexDirection: 'row',
      borderRadius: 6,
      overflow: 'hidden',
      margin: 8,
    },
    contentStyle: {
      flex: 1,
    },
    loadingContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButtonContainerStyle: {
      position: 'absolute',
      right: 5,
      top: 5,
      backgroundColor: '#00000066',
      borderRadius: 3,
    },
    previewContainerStyle: {
      width: '100%',
      height: '100%',
    },
    backButtonContainerStyle: {
      width: 55,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    previewHeaderStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    previewHeaderTitleStyle: {
      fontFamily: fonts.semiBold,
      color: colors.primaryTextColor,
      fontSize: 16,
      marginRight: 55,
      flex: 1,
      textAlign: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
