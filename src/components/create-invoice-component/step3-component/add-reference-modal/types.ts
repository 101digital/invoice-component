import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type AddReferenceModalProps = {
  isVisible?: boolean;
  referenceNumber?: string;
  onClose: () => void;
  activeBorderColor?: string;
  onSubmit: (ref?: string) => void;
  style?: AddReferenceModalStyles;
};

export type AddReferenceModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  cancelButtonStyle?: ButtonStyles;
  confirmButtonStyle?: ButtonStyles;
  inputValueContainerStyle?: StyleProp<ViewStyle>;
};
