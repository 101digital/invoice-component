import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type DetailHeaderComponentProps = {
  onBackPressed: () => void;
  actionButtonWidth?: number;
  backIcon?: ReactNode;
  headerRight?: ReactNode;
  invoiceNumber?: string;
  style?: DetailHeaderComponentStyles;
};

export type DetailHeaderComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerLeftContainerStyle?: StyleProp<ViewStyle>;
  headerRightContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  expandedTitleStyle?: StyleProp<TextStyle>;
  collapsedTitleStyle?: StyleProp<TextStyle>;
};
