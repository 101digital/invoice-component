import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type SummaryItemComponentProps = {
  title: string;
  subTitle?: string;
  amount: string;
  variant: 'primary' | 'secondary';
  primaryColor?: string;
  secondaryColor?: string;
  arrowRightIcon?: ReactNode;
  addIcon?: ReactNode;
  onPressedAmount?: () => void;
  style?: SummaryItemComponentStyles;
  onAddValue?: () => void;
};

export type SummaryItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  amountStyle?: StyleProp<TextStyle>;
  arrowRightContainer?: StyleProp<ViewStyle>;
  amountContainerStyle?: StyleProp<ViewStyle>;
  addButtonTitleStyle?: StyleProp<TextStyle>;
};
