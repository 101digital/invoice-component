import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Extension, ItemInvoiceData } from '../../../types';
import { ActionButtonComponentStyles } from '../../action-button-component/types';
import { SummaryItemComponentStyles } from '../../summary-item-component/types';
import { FooterComponentStyles } from '../footer-component/types';
import { LineItemComponentStyles } from '../line-item-component/types';
import { CreateInvoiceStepOneData } from '../step1-component/model';
import { AddExtensionModalStyles } from './add-extension-modal/types';
import { AddReferenceModalStyles } from './add-reference-modal/types';

export type Step3ComponentProps = {
  isEditInvoice: boolean;
  step1Data: CreateInvoiceStepOneData;
  step2Data: ItemInvoiceData[];
  currencyCode: string;
  onBackPressed: () => void;
  onNextPressed: () => void;
  onUpdateTax: (tax?: Extension) => void;
  onUpdateDiscount: (discount?: Extension) => void;
  onUpdateReference: (ref?: string) => void;
  onAttachDocument: () => void;
  tax?: Extension;
  discount?: Extension;
  reference?: string;
  style?: Step3ComponentStyles;
  Footer?: {
    style?: FooterComponentStyles;
  };
  ExtensionModal?: {
    props?: {
      activeBorderColor?: string;
    };
    style?: AddExtensionModalStyles;
  };
  ReferenceModal?: {
    props?: {
      activeBorderColor?: string;
    };
    style?: AddReferenceModalStyles;
  };
  ActionButton?: {
    props?: {
      arrowRightIcon?: ReactNode;
    };
    style?: ActionButtonComponentStyles;
  };
  SummaryItem?: {
    props?: {
      primaryColor?: string;
      secondaryColor?: string;
      arrowRightIcon?: ReactNode;
      addIcon?: ReactNode;
    };
    style?: SummaryItemComponentStyles;
  };
  LineItem?: {
    props?: {
      addTagColor?: string;
      deductTagColor?: string;
    };
    style?: LineItemComponentStyles;
  };
};

export type Step3ComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  headerLabelStyle?: StyleProp<TextStyle>;
  detailContainerStyle?: StyleProp<ViewStyle>;
  detailItemLabelStyle?: StyleProp<TextStyle>;
  detailItemValueStyle?: StyleProp<TextStyle>;
  detailItemContainerStyle?: StyleProp<ViewStyle>;
};
