import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type InvoiceDescriptionComponentProps = {
  isVisible?: boolean;
  onClose: () => void;
  description: string;
  style?: InvoiceDescriptionComponentStyles;
};

export type InvoiceDescriptionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};
