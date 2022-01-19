import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';
import { InvoiceParam, FilterTagName } from '../../../types';

export type FilterModalComponentProps = {
  isVisible?: boolean;
  currencyCode: string;
  initParam: InvoiceParam;
  dateFormat?: string;
  onClose: () => void;
  onCancel: () => void;
  onApply: (param: InvoiceParam, tags: FilterTagName[]) => void;
  sliderActiveColor?: string;
  sliderInActiveColor?: string;
  style?: FilterModalComponentStyles;
};

export type FilterModalComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  itemListContainerStyle?: StyleProp<ViewStyle>;
  activeItemContainerStyle?: StyleProp<ViewStyle>;
  inActiveItemContainerStyle?: StyleProp<ViewStyle>;
  activeItemTextStyle?: StyleProp<TextStyle>;
  inActiveItemTextStyle?: StyleProp<TextStyle>;
  sliderContainerStyle?: StyleProp<ViewStyle>;
  sliderValueStyle?: StyleProp<TextStyle>;
  cancelButtonStyle?: ButtonStyles;
  applyButtonStyle?: ButtonStyles;
};
