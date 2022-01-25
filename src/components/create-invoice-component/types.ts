import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BankAccountReference, CustomerParams, Invoice } from '../../types';
import { ActionButtonComponentStyles } from '../action-button-component/types';
import { SummaryItemComponentStyles } from '../summary-item-component/types';
import { FooterComponentStyles } from './footer-component/types';
import { HeaderComponentStyles } from './header-component/types';
import { LineItemComponentStyles } from './line-item-component/types';
import { Step1ComponentStyles } from './step1-component/types';
import { AddInvoiceModalComponentStyles } from './step2-component/add-invoice-modal-component/types';
import { Step2ComponentStyles } from './step2-component/types';
import { AddExtensionModalStyles } from './step3-component/add-extension-modal/types';
import { AddReferenceModalStyles } from './step3-component/add-reference-modal/types';
import { Step3ComponentStyles } from './step3-component/types';

export type CreateInvoiceComponentRefs = {
  updateCustomer: (params: CustomerParams) => void;
  setActiveStep: (index: number) => void;
};

export type CreateInvoiceComponentProps = {
  invoiceId?: string;
  bankAccount?: BankAccountReference;
  currencyCode: string;
  dateFormat?: string;
  style?: CreateInvoiceComponentStyles;
  onSearchCustomer: () => void;
  onAttachDocument: () => void;
  onGoBack: () => void;
  onCreatedInvoice: (invoice: Invoice) => void;
  onUpdatedInvoice: (invoice: Invoice) => void;
  Header?: {
    props?: {
      backIcon?: ReactNode;
    };
    style?: HeaderComponentStyles;
  };
  Footer?: {
    style?: FooterComponentStyles;
  };
  Step1?: {
    props?: {
      calendarIcon?: ReactNode;
      arrowRightIcon?: ReactNode;
      closeIcon?: ReactNode;
      activeBorderColor?: string;
      minDate?: Date;
    };
    style?: Step1ComponentStyles;
  };
  Step2?: {
    props?: {
      addItemIcon?: ReactNode;
    };
    style?: Step2ComponentStyles;
    LineItem?: {
      props?: {
        addTagColor?: string;
        deductTagColor?: string;
        editIcon?: ReactNode;
        deleteIcon?: ReactNode;
      };
      style?: LineItemComponentStyles;
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
  Step3?: {
    style?: Step3ComponentStyles;
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
};

export type CreateInvoiceComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
