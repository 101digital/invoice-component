import { addAlpha } from '../../utils/helper';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceListComponentStyles } from './types';

const useMergeStyles = (style?: InvoiceListComponentStyles): InvoiceListComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: InvoiceListComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    tabBarContainerStyle: {
      backgroundColor: 'white',
      flex: 1,
      elevation: 0,
      shadowOffset: { height: 0, width: 0 },
      shadowColor: 'transparent',
      shadowOpacity: 0,
    },
    tabContainerStyle: {
      width: 'auto',
      elevation: 0,
      minWidth: '19%',
    },
    tabTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
    },
    tabViewContainerStyle: {
      backgroundColor: 'white',
      zIndex: 10,
    },
    tabViewContentContainerStyle: {
      paddingHorizontal: 16,
      height: 45,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      shadowOpacity: 0.05,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation: 2,
    },
    searchContainerStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ECECF4',
      borderWidth: 0,
      backgroundColor: addAlpha(colors.primaryColor!, 0.2),
      alignSelf: 'center',
    },
    createInvoiceButtonStyle: {
      width: 60,
      height: 60,
      position: 'absolute',
      bottom: 15,
      right: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
