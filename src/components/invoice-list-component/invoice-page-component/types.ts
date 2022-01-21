import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Invoice, InvoiceParam, InvoiceStatusType } from '../../../types';
import { EmptyInvoicesStyles } from '../empty-invoice-component/types';
import { InvoiceItemComponentStyles } from '../../invoice-item-component/types';
import { InvoiceItemShimmerComponentProps } from '../../item-shimmer-component/types';
import { ErrorLoadInvoiceComponentStyles } from '../error-load-invoice-component/types';
import { AlertModalStyles } from 'react-native-theme-component/src/alert';
import { InvoiceActionSheetStyles } from '../../invoice-action-sheet/types';

export type InvoicePageComponentProps = {
  status?: InvoiceStatusType;
  params?: InvoiceParam;
  indicatorColor?: string;
  sectionDateFormat?: string;
  style?: InvoicePageComponentStyles;
  onEditInvoice: (invoiceId: string) => void;
  onInvoiceDetail: (invoiceId: string) => void;
  onCreateInvoice?: () => void;
  onShareInvoice: (invoice: Invoice) => void;
  onChaseInvoice: (invoice: Invoice) => void;
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

export type InvoicePageComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  sectionContainerStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  itemSeparatorStyle?: StyleProp<ViewStyle>;
  loadMoreIndicatorStyle?: StyleProp<ViewStyle>;
  confirmAlertModalStyle?: AlertModalStyles;
};
