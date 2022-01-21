import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageStyle, ImageURISource } from 'react-native';

export type QrScanComponentProps = {
  isVisible?: boolean;
  onClose: () => void;
  closeIcon?: ReactNode;
  qrFrameSource?: ImageURISource;
  style?: QrScanComponentStyles;
};

export type QrScanComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  rowItemContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  closeButtonContainerStyle?: StyleProp<ViewStyle>;
  qrContainerStyle?: StyleProp<ViewStyle>;
  invoiceNumberLabelStyle?: StyleProp<TextStyle>;
  invoiceNumberValueStyle?: StyleProp<TextStyle>;
  amountLabelStyle?: StyleProp<TextStyle>;
  amountValueStyle?: StyleProp<TextStyle>;
  qrFrameImageStyle?: StyleProp<ImageStyle>;
};
