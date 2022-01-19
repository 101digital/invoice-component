import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { InvoiceSubStatus } from '../../types';

export type InvoiceActionSheetProps = {
  subStatus?: InvoiceSubStatus[];
  status: string;
  isVisible?: boolean;
  disableOpacity?: number;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  shareIcon?: ReactNode;
  style?: InvoiceActionSheetStyles;
  onShareInvoice: () => void;
  onEditInvoice: () => void;
  onDeleteInvoice: () => void;
  onClose: () => void;
  onChaseInvoice: () => void;
};

export type InvoiceActionSheetStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  actionButtonStyle?: StyleProp<ViewStyle>;
  actionTitleStyle?: StyleProp<TextStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
};
