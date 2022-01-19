import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';
import { Invoice, PaymentItem } from '../../../types';

export type AddPaymentComponentProps = {
  isVisible?: boolean;
  paymentData?: PaymentItem;
  invoice: Invoice;
  topSpacer?: number;
  activeBorderColor?: string;
  dateFormat?: string;
  calendarIcon?: ReactNode;
  arrowDownIcon?: ReactNode;
  closeIcon?: ReactNode;
  style?: AddPaymentComponentStyles;
  onClose: () => void;
};

export type AddPaymentComponentStyles = {
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  closeButtonContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  suffixIconStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: ButtonStyles;
  saveButtonStyle?: ButtonStyles;
  paymentTypeContainerStyle?: StyleProp<ViewStyle>;
  paymentTypeItemContainerStyle?: StyleProp<ViewStyle>;
  paymentTypeItemTextStyle?: StyleProp<TextStyle>;
};
