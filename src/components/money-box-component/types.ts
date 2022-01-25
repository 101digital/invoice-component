import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type MoneyBoxComponentProps = {
  label: string;
  value: string;
  rightIcon?: ReactNode;
  style?: MoneyBoxComponentStyles;
};

export type MoneyBoxComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  iconContainer?: StyleProp<ViewStyle>;
};
