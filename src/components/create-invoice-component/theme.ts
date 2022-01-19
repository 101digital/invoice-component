import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { CreateInvoiceComponentStyles } from './types';

const useMergeStyles = (style?: CreateInvoiceComponentStyles): CreateInvoiceComponentStyles => {
  const defaultStyles: CreateInvoiceComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
