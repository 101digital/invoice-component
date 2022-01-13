import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AlertModalStyles } from 'react-native-theme-component/src/alert';
import { Invoice } from '../../types';
import { AddPaymentComponentStyles } from './add-payment-component/types';
import { PaymentItemComponentStyles } from './payment-item-component/types';

export type InvoicePaymentComponentProps = {
  invoice: Invoice;
  addItemIcon?: ReactNode;
  style?: InvoicePaymentComponentStyles;
  PaymentItem?: {
    props: {
      dateFormat?: string;
      editIcon?: ReactNode;
      deleteIcon?: ReactNode;
    };
    style?: PaymentItemComponentStyles;
  };
  AddPaymentModal?: {
    props?: {
      topSpacer?: number;
      activeBorderColor?: string;
      dateFormat?: string;
      calendarIcon?: ReactNode;
      arrowDownIcon?: ReactNode;
    };
    style?: AddPaymentComponentStyles;
  };
};

export type InvoicePaymentComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  addButtonContainerStyle?: StyleProp<ViewStyle>;
  addButtonTitleStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  rowItemContainerStyle?: StyleProp<ViewStyle>;
  totalAmountLabelStyle?: StyleProp<TextStyle>;
  totalAmountValueStyle?: StyleProp<TextStyle>;
  balanceDueLabelStyle?: StyleProp<TextStyle>;
  balanceDueValueStyle?: StyleProp<TextStyle>;
  confirmAlertStyle?: AlertModalStyles;
};
