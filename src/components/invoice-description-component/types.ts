import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type InvoiceDescriptionComponentProps = {
  description: string;
  style?: InvoiceDescriptionComponentStyles;
};

export type InvoiceDescriptionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};
