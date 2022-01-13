import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { InvoiceParam } from '../../../types';
import { FilterBarComponentStyles } from '../filter-bar-component/types';
import { FilterModalComponentStyles } from '../filter-modal-component/types';

export type SearchHeaderComponentProps = {
  onBackPressed: () => void;
  params: InvoiceParam;
  currencyCode: string;
  placeholderColor?: string;
  backIcon?: ReactNode;
  searchIcon?: ReactNode;
  settingIcon?: ReactNode;
  style?: SearchHeaderComponentStyles;
  onSearch: (params: InvoiceParam) => void;
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
};

export type SearchHeaderComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;

  leftButtonContainerStyle?: StyleProp<ViewStyle>;
  rightButtonContainerStyle?: StyleProp<ViewStyle>;
  activeFilterDotStyle?: StyleProp<ViewStyle>;
  searchContainerStyle?: StyleProp<ViewStyle>;
  iconSearchContainerStyle?: StyleProp<ViewStyle>;
  searchTextStyle?: StyleProp<TextStyle>;
};
