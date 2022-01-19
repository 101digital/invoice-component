import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CustomerParams } from '../../../types';
import { FooterComponentStyles } from '../footer-component/types';
import { CreateInvoiceStepOneData } from './model';

export type Step1ComponentProps = {
  style?: Step1ComponentStyles;
  stepOneData: CreateInvoiceStepOneData;
  customer?: CustomerParams;
  dateFormat?: string;
  calendarIcon?: ReactNode;
  arrowRightIcon?: ReactNode;
  closeIcon?: ReactNode;
  activeBorderColor?: string;
  minDate?: Date;
  onSearchCustomer: () => void;
  onEdited: () => void;
  onCancel: () => void;
  onNextPressed: (data: CreateInvoiceStepOneData) => void;
  Footer?: {
    style?: FooterComponentStyles;
  };
};

export type Step1ComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  inputTextStyle?: StyleProp<TextStyle>;
  datesContainerStyle?: StyleProp<ViewStyle>;
  dateItemContainerStyle?: StyleProp<ViewStyle>;
  descriptionContainerStyle?: StyleProp<ViewStyle>;
  suffixIconContainerStyle?: StyleProp<ViewStyle>;
};
