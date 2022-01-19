import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ItemInvoiceReference } from '../../../types';

export type LineItemComponentProps = {
  currencyCode: string;
  rate?: number;
  lineItem: ItemInvoiceReference;
  addTagColor?: string;
  deductTagColor?: string;
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
};
