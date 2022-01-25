import { Extension } from '../../../../types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type AddExtensionModalProps = {
  maxAmount: number;
  isVisible?: boolean;
  title: string;
  type: 'tax' | 'discount';
  initData?: Extension;
  onClose: () => void;
  activeBorderColor?: string;
  currencyCode: string;
  onSubmit: (data?: Extension) => void;
  style?: AddExtensionModalStyles;
};

export type AddExtensionModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  cancelButtonStyle?: ButtonStyles;
  confirmButtonStyle?: ButtonStyles;
  typeContainerStyle?: StyleProp<ViewStyle>;
  activeTypeContainerStyle?: StyleProp<ViewStyle>;
  inActiveTypeContainerStyle?: StyleProp<ViewStyle>;
  activeTypeTextStyle?: StyleProp<TextStyle>;
  inActiveTypeTextStyle?: StyleProp<TextStyle>;
  inputValueContainerStyle?: StyleProp<ViewStyle>;
};
