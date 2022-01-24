import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { InvoiceParam, InvoiceStatusType } from '../../../types';

export type EmptyInvoicesProps = {
  status?: InvoiceStatusType;
  params?: InvoiceParam;
  noInvoiceIcon?: ReactNode;
  plusIcon?: ReactNode;
  indicatorColor?: string;
  onCreateInvoice?: () => void;
  style?: EmptyInvoicesStyles;
};

export type EmptyInvoicesStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  createButtonContainerStyle?: StyleProp<ViewStyle>;
  createButtonTextStyle?: StyleProp<TextStyle>;
};
