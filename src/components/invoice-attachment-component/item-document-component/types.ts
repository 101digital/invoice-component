import { StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { DocumentReference } from '../../../types';

export type ItemDocumentComponentProps = {
  editable?: boolean;
  document: DocumentReference;
  numColumn: number;
  paddingHorizontal: number;
  onDelete: () => void;
  style?: ItemDocumentComponentStyles;
};

export type ItemDocumentComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ImageStyle>;
  deleteButtonContainerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  previewContainerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  previewHeaderStyle?: StyleProp<ViewStyle>;
  previewHeaderTitleStyle?: StyleProp<TextStyle>;
};
