import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { InvoiceStatusType } from '../../../types';

export type ErrorLoadInvoiceComponentProps = {
  errorIcon?: ReactNode;
  status?: InvoiceStatusType;
  style?: ErrorLoadInvoiceComponentStyles;
};

export type ErrorLoadInvoiceComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  errorTitleStyle?: StyleProp<TextStyle>;
  errorMessageStyle?: StyleProp<TextStyle>;
  retryButtonContainerStyle?: StyleProp<ViewStyle>;
  retryTextStyle?: StyleProp<TextStyle>;
};
