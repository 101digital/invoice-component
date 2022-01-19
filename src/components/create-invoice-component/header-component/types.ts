import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type HeaderComponentProps = {
  steps: string[];
  activeStep: number;
  headerTitle?: string;
  backIcon?: ReactNode;
  onGoBack: () => void;
  style?: HeaderComponentStyles;
};

export type HeaderComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  appBarContainerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  stepContainerStyle?: StyleProp<ViewStyle>;
  activeLineStyle?: StyleProp<ViewStyle>;
  inActiveLineStyle?: StyleProp<ViewStyle>;
  currentStepContainerStyle?: StyleProp<ViewStyle>;
  activeStepContainerStyle?: StyleProp<ViewStyle>;
  inActiveStepContainerStyle?: StyleProp<ViewStyle>;
  currentStepNumberStyle?: StyleProp<TextStyle>;
  activeStepNumberStyle?: StyleProp<TextStyle>;
  inActiveStepNumberStyle?: StyleProp<TextStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
  inActiveLabelStyle?: StyleProp<TextStyle>;
};
