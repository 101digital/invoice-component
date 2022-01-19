import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type DetailShimmerComponentProps = {
  backIcon?: ReactNode;
  onBackPressed: () => void;
  style?: DetailShimmerComponentStyles;
};

export type DetailShimmerComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  appBarContainerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerContentContainerStyle?: StyleProp<ViewStyle>;
  rowItemContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  numberShimmerStyle?: StyleProp<ViewStyle>;
  versionShimmerStyle?: StyleProp<ViewStyle>;
  qrContainerStyle?: StyleProp<ViewStyle>;
  qrShimmerStyle?: StyleProp<ViewStyle>;
  dateTitleShimmerStyle?: StyleProp<ViewStyle>;
  dateValueShimmerStyle?: StyleProp<ViewStyle>;
  customerTitleShimmerStyle?: StyleProp<ViewStyle>;
  customerValueShimmerStyle?: StyleProp<ViewStyle>;
  statusTitleShimmerStyle?: StyleProp<ViewStyle>;
  statusValueShimmerStyle?: StyleProp<ViewStyle>;
  itemLabelShimmerStyle?: StyleProp<ViewStyle>;
  itemNameShimmerStyle?: StyleProp<ViewStyle>;
  itemPriceShimmerStyle?: StyleProp<ViewStyle>;
  itemQuantityShimmerStyle?: StyleProp<ViewStyle>;
  summaryTitleShimmerStyle?: StyleProp<ViewStyle>;
  summaryPriceShimmerStyle?: StyleProp<ViewStyle>;
  summaryExtensionShimmerStyle?: StyleProp<ViewStyle>;
  buttonShimmerStyle?: StyleProp<ViewStyle>;
};
