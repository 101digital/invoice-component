import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { InvoiceItemShimmerComponentStyles } from './types';

const useMergeStyles = (
  style?: InvoiceItemShimmerComponentStyles
): InvoiceItemShimmerComponentStyles => {
  const defaultStyles: InvoiceItemShimmerComponentStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 15,
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    leftContainerStyle: {
      marginLeft: 10,
      flex: 1,
    },
    rightContainerStyle: {
      alignItems: 'flex-end',
      marginRight: 10,
      flex: 1,
    },
    invoiceNumberStyle: {
      width: '100%',
      height: 12,
      borderRadius: 4,
    },
    invoiceDescriptionStyle: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      borderRadius: 4,
      height: 12,
    },
    invoiceDateStyle: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 4,
      height: 12,
    },
    invoiceAmountStyle: {
      width: '50%',
      height: 12,
      borderRadius: 4,
    },
    invoiceStatusStyle: {
      width: '30%',
      height: 12,
      borderRadius: 4,
      marginTop: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
