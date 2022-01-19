import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FilterTagName, InvoiceParam } from '../../../types';

export type FilterBarComponentProps = {
  params: InvoiceParam;
  tags: FilterTagName[];
  closeIcon?: ReactNode;
  style?: FilterBarComponentStyles;
  onChanged: (params: InvoiceParam, tags: FilterTagName[]) => void;
};

export type FilterBarComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  itemCloseButtonStyle?: StyleProp<ViewStyle>;
};
