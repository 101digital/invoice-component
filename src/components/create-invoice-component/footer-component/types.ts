import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type FooterComponentProps = {
  backButtonTitle?: string;
  nextButtonTitle?: string;
  canNext?: boolean;
  canBack?: boolean;
  amountLabel?: string;
  amountValue?: string;
  isLoading?: boolean;
  onBackPressed: () => void;
  onNextPressed: () => void;
  style?: FooterComponentStyles;
};

export type FooterComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  backButtonStyle?: ButtonStyles;
  nextButtonStyle?: ButtonStyles;
  amountContainerStyle?: StyleProp<ViewStyle>;
  amountLabelStyle?: StyleProp<TextStyle>;
  amountValueStyle?: StyleProp<TextStyle>;
};
