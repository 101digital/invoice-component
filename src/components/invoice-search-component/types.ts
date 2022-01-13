import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { InvoiceItemComponentStyles } from '../invoice-item-component/types';
import { EmptyInvoicesStyles } from '../invoice-list-component/empty-invoice-component/types';
import { ErrorLoadInvoiceComponentStyles } from '../invoice-list-component/error-load-invoice-component/types';
import { InvoiceItemShimmerComponentProps } from '../item-shimmer-component/types';
import { FilterBarComponentStyles } from './filter-bar-component/types';
import { FilterModalComponentStyles } from './filter-modal-component/types';
import { SearchHeaderComponentStyles } from './search-header-component/types';

export type InvoiceSearchComponentProps = {
  onBackPressed: () => void;
  currencyCode: string;
  onInvoiceDetail: (invoiceId: string) => void;
  style?: InvoiceSearchComponentStyles;
  SearchBox?: {
    props?: {
      backIcon?: ReactNode;
      placeholderColor?: string;
      searchIcon?: ReactNode;
      settingIcon?: ReactNode;
    };
    style?: SearchHeaderComponentStyles;
  };
  FilterModal?: {
    props?: {
      dateFormat?: string;
      sliderActiveColor?: string;
      sliderInActiveColor?: string;
    };
    style?: FilterModalComponentStyles;
  };
  FilterBar?: {
    props?: {
      closeIcon?: ReactNode;
    };
    style?: FilterBarComponentStyles;
  };
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
};

export type InvoiceSearchComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
