import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Invoice } from '../../types';

export type InvoiceItemComponentProps = {
  invoice: Invoice;
  colorOpacity?: number;
  paidColor?: string;
  dueColor?: string;
  overdueColor?: string;
  dateFormat?: string;
  moreIcon?: ReactNode;
  attachmentIcon?: ReactNode;
  onPressed: (invoice: Invoice) => void;
  onMoreAction: (invoice: Invoice) => void;
  style?: InvoiceItemComponentStyles;
};

export type InvoiceItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  invoiceNumberStyle?: StyleProp<TextStyle>;
  invoiceNumberContainerStyle?: StyleProp<ViewStyle>;
  invoiceDescriptionStyle?: StyleProp<TextStyle>;
  invoiceDateStyle?: StyleProp<TextStyle>;
  invoiceAmountContainerStyle?: StyleProp<ViewStyle>;
  invoiceAmountStyle?: StyleProp<TextStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
  statusContainerStyle?: StyleProp<ViewStyle>;
  statusBoxStyle?: StyleProp<ViewStyle>;
  statusTextStyle?: StyleProp<TextStyle>;
  subStatusTextStyle?: StyleProp<TextStyle>;
};
