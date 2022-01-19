import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ItemInvoiceData } from '../../../types';

export type LineItemComponentProps = {
  currencyCode: string;
  rate?: number;
  data: ItemInvoiceData;
  addTagColor?: string;
  deductTagColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  style?: LineItemComponentStyles;
};

export type LineItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  itemNameStyle?: StyleProp<TextStyle>;
  itemPriceStyle?: StyleProp<TextStyle>;
  itemQuantityStyle?: StyleProp<TextStyle>;
  tagContainerStyle?: StyleProp<ViewStyle>;
  tagValueStyle?: StyleProp<TextStyle>;
  actionButtonStyle?: StyleProp<ViewStyle>;
};
