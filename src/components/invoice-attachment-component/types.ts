import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ItemDocumentComponentStyles } from './item-document-component/types';

export type AttachmentComponentProps = {
  editable?: boolean;
  cameraIcon?: ReactNode;
  photoIcon?: ReactNode;
  uploadingComponent?: ReactNode;
  style?: AttachmentComponentStyles;
  ItemDocument?: {
    style?: ItemDocumentComponentStyles;
  };
};

export type AttachmentComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  actionButtonStyle?: StyleProp<ViewStyle>;
  actionButtonTitleStyle?: StyleProp<TextStyle>;
  uploadingContainerStyle?: StyleProp<ViewStyle>;
  uploadingTextStyle?: StyleProp<TextStyle>;
};
