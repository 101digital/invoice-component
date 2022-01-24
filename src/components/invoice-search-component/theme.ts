import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { InvoiceSearchComponentStyles } from './types';

const useMergeStyles = (style?: InvoiceSearchComponentStyles): InvoiceSearchComponentStyles => {
  const defaultStyles: InvoiceSearchComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
