import { ButtonStyles } from 'react-native-theme-component/src/button';
import { ReactNode } from 'react';
import { ImageURISource, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { DocumentReference, Invoice } from '../../types';
import { AddPaymentComponentStyles } from '../invoice-payment-component/add-payment-component/types';
import { ActionButtonComponentStyles } from '../action-button-component/types';
import { DetailHeaderComponentStyles } from './detail-header-component/types';
import { DetailShimmerComponentStyles } from './detail-shimmer-component/types';
import { QrScanComponentStyles } from './qr-scan-component/types';
import { SummaryItemComponentStyles } from '../summary-item-component/types';
import { LineItemComponentStyles } from './line-item-component/types';

export type InvoiceDetailComponentProps = {
  invoiceId: string;
  invoice?: Invoice;
  onBackPressed: () => void;
  onViewAttachments: () => void;
  onViewPayments: (invoice: Invoice) => void;
  qrIcon?: ReactNode;
  dateFormat?: string;
  paidColor?: string;
  dueColor?: string;
  overdueColor?: string;
  style?: InvoiceDetailComponentStyles;
  AddPaymentModal?: {
    props?: {
      topSpacer?: number;
      activeBorderColor?: string;
      dateFormat?: string;
      calendarIcon?: ReactNode;
      arrowDownIcon?: ReactNode;
    };
    style?: AddPaymentComponentStyles;
  };
  DetailHeader?: {
    props?: {
      actionButtonWidth?: number;
      backIcon?: ReactNode;
      headerRight?: ReactNode;
    };
    style?: DetailHeaderComponentStyles;
  };
  LineItem?: {
    props?: {
      addTagColor?: string;
      deductTagColor?: string;
    };
    style?: LineItemComponentStyles;
  };
  SummaryItem?: {
    props?: {
      primaryColor?: string;
      secondaryColor?: string;
      arrowRightIcon?: ReactNode;
    };
    style?: SummaryItemComponentStyles;
  };
  DetailShimmer?: {
    props?: {
      backIcon?: ReactNode;
    };
    style?: DetailShimmerComponentStyles;
  };
  ScanQRModal?: {
    props?: {
      closeIcon?: ReactNode;
      qrFrameSource?: ImageURISource;
    };
    style?: QrScanComponentStyles;
  };
  ActionButton?: {
    props?: {
      arrowRightIcon?: ReactNode;
    };
    style?: ActionButtonComponentStyles;
  };
};

export type InvoiceDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerContentContainerStyle?: StyleProp<ViewStyle>;
  rowItemContainerStyle?: StyleProp<ViewStyle>;
  invoiceNumberStyle?: StyleProp<TextStyle>;
  invoiceVersionStyle?: StyleProp<TextStyle>;
  qrContainerStyle?: StyleProp<ViewStyle>;
  headerItemTitleStyle?: StyleProp<TextStyle>;
  headerItemValueStyle?: StyleProp<TextStyle>;
  itemsLabelStyle?: StyleProp<TextStyle>;
  addPaymentButtonStyle?: ButtonStyles;
  shareButtonStyle?: ButtonStyles;
};
