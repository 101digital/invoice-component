import { ItemInvoiceData } from '../../../../types';
import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AddInvoiceModalComponentProps = {
  currencyCode: string;
  isVisible?: boolean;
  topSpacer?: number;
  activeBorderColor?: string;
  onClose: () => void;
  closeIcon?: ReactNode;
  minusIcon?: ReactNode;
  plusIcon?: ReactNode;
  style?: AddInvoiceModalComponentStyles;
  onSubmit: (itemData: ItemInvoiceData) => void;
  initData?: ItemInvoiceData;
};

export type AddInvoiceModalComponentStyles = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  closeButtonContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  quantityContainerStyle?: StyleProp<ViewStyle>;
  quantityActionButtonStyle?: StyleProp<ViewStyle>;
};
