import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type ActionButtonComponentProps = {
  title: string;
  isLastItem?: boolean;
  onPressed: () => void;
  arrowRightIcon?: ReactNode;
  style?: ActionButtonComponentStyles;
};

export type ActionButtonComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};
