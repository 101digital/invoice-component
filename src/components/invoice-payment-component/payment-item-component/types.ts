import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { PaymentItem } from '../../../types';

export type PaymentItemComponentProps = {
  payment: PaymentItem;
  canChange: boolean;
  onEdit: () => void;
  onDelete: () => void;
  dateFormat?: string;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  style?: PaymentItemComponentStyles;
};

export type PaymentItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  paymentTypeStyle?: StyleProp<TextStyle>;
  amountStyle?: StyleProp<TextStyle>;
  dateStyle?: StyleProp<TextStyle>;
  actionButtonContainerStyle?: StyleProp<ViewStyle>;
};
