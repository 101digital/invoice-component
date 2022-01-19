import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ItemInvoiceData } from '../../../types';
import { FooterComponentStyles } from '../footer-component/types';
import { LineItemComponentStyles } from '../line-item-component/types';
import { AddInvoiceModalComponentStyles } from './add-invoice-modal-component/types';

export type Step2ComponentProps = {
  onPressedBack: (items: ItemInvoiceData[]) => void;
  addItemIcon?: ReactNode;
  style?: Step2ComponentStyles;
  currencyCode: string;
  initItems?: ItemInvoiceData[];
  onNext: (items: ItemInvoiceData[]) => void;
  LineItem?: {
    props?: {
      addTagColor?: string;
      deductTagColor?: string;
      editIcon?: ReactNode;
      deleteIcon?: ReactNode;
    };
    style?: LineItemComponentStyles;
  };
  Footer?: {
    style?: FooterComponentStyles;
  };
  AddInvoiceModal?: {
    props?: {
      topSpacer?: number;
      activeBorderColor?: string;
      closeIcon?: ReactNode;
      minusIcon?: ReactNode;
      plusIcon?: ReactNode;
    };
    style?: AddInvoiceModalComponentStyles;
  };
};

export type Step2ComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  headerLabelStyle?: StyleProp<TextStyle>;
  addButtonContainerStyle?: StyleProp<ViewStyle>;
  addButtonTitleStyle?: StyleProp<TextStyle>;
};
