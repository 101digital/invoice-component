import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { EmptyInvoicesStyles } from './empty-invoice-component/types';
import { InvoiceItemComponentStyles } from '../invoice-item-component/types';
import { InvoiceItemShimmerComponentProps } from '../item-shimmer-component/types';
import { ErrorLoadInvoiceComponentStyles } from './error-load-invoice-component/types';
import { InvoiceActionSheetStyles } from '../invoice-action-sheet/types';

export type InvoiceListComponentProps = {
  style?: InvoiceListComponentStyles;
  searchIcon?: ReactNode;
  createInvoiceIcon?: ReactNode;
  activeTabColor?: string;
  inActiveTabColor?: string;
  onSearchInvoice?: () => void;
  onInvoiceDetail: (invoiceId: string) => void;
  onCreateInvoice: () => void;
  onEditInvoice: (invoiceId: string) => void;
  EmptyInvoice?: {
    props?: {
      noInvoiceIcon?: ReactNode;
      plusIcon?: ReactNode;
      indicatorColor?: string;
    };
    style?: EmptyInvoicesStyles;
  };
  ErrorInvoice?: {
    props?: {
      errorIcon?: ReactNode;
    };
    style?: ErrorLoadInvoiceComponentStyles;
  };
  InvoiceItem?: {
    props?: {
      colorOpacity?: number;
      paidColor?: string;
      dueColor?: string;
      overdueColor?: string;
      dateFormat?: string;
    };
    style?: InvoiceItemComponentStyles;
  };
  InvoiceItemShimmer?: InvoiceItemShimmerComponentProps;
  ActionSheet?: {
    props?: {
      disableOpacity?: number;
      editIcon?: ReactNode;
      deleteIcon?: ReactNode;
      shareIcon?: ReactNode;
    };
    style?: InvoiceActionSheetStyles;
  };
};

export type InvoiceListComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  tabViewContainerStyle?: StyleProp<ViewStyle>;
  tabViewContentContainerStyle?: StyleProp<ViewStyle>;
  tabBarContainerStyle?: StyleProp<ViewStyle>;
  tabContainerStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  searchContainerStyle?: StyleProp<ViewStyle>;
  createInvoiceButtonStyle?: StyleProp<ViewStyle>;
};
