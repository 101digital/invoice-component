import React, { useCallback, useContext, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AttachmentComponentProps, AttachmentComponentStyles } from './types';
import useMergeStyles from './theme';
import { CameraIcon, PhotoIcon } from '../../assets';
// @ts-expect-error:
import * as mime from 'react-native-mime-types';
import Picker from 'react-native-image-crop-picker';
import { InvoiceService } from '../../service/invoice-service';
import { showMessage, ThemeContext } from 'react-native-theme-component';
import { openSettings } from 'react-native-permissions';
import { uniqueId } from 'lodash';
import { InvoiceContext } from '../../context/invoice-context';
import ItemDocumentComponent from './item-document-component';

const InvoiceAttachmentComponent = (props: AttachmentComponentProps) => {
  const { style, editable, cameraIcon, photoIcon, uploadingComponent, ItemDocument } = props;
  const styles: AttachmentComponentStyles = useMergeStyles(style);
  const imageSize = InvoiceService.instance().getMaxDocumentSize();
  const imageTypes = InvoiceService.instance().getDocumentTypes();
  const { i18n } = useContext(ThemeContext);
  const {
    isUploadingDocument,
    uploadDocument,
    documents,
    setDocuments,
    errorUploadDocument,
    clearErrors,
  } = useContext(InvoiceContext);
  const _contentHorizontalPadding = parseInt(
    (StyleSheet.flatten(styles.containerStyle).paddingHorizontal ?? 8).toString()
  );

  useEffect(() => {
    if (errorUploadDocument) {
      showMessage({
        message:
          i18n?.t('invoice_attachment_component.msg_attach_failed') ?? 'Upload document failed',
        backgroundColor: '#ff0000',
      });
      clearErrors();
    }
  }, [errorUploadDocument]);

  const launchCamera = () => {
    Picker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 1440,
      compressImageMaxHeight: 890,
      compressImageQuality: 0.8,
      cropping: false,
      cropperCircleOverlay: false,
      useFrontCamera: false,
    })
      .then((image) => {
        if (image.size < imageSize) {
          const imageType = imageHandler(image.sourceURL ? image.sourceURL : image.path);
          const validatedImageType = imageTypes.filter((element: String) =>
            imageType.toLowerCase().includes(element)
          );
          if (validatedImageType.length > 0) {
            onUpload(image);
          } else {
            showMessage({
              message:
                i18n?.t('invoice_attachment_component.msg_allow_file_type') ??
                'Allowed file types are PNG and JPG/JPEG',
              backgroundColor: '#ff0000',
            });
          }
        } else {
          showMessage({
            message:
              i18n?.t('invoice_attachment_component.msg_max_file_size') ??
              'Maximum file size should be 2MB',
            backgroundColor: '#ff0000',
          });
        }
      })
      .catch((e) => {
        if (e.toString() !== 'Error: User cancelled image selection') {
          Alert.alert(
            i18n?.t('invoice_attachment_component.msg_allow_access_camera') ??
              'Allow application to access your camera',
            i18n?.t('invoice_attachment_component.msg_turn_camera_setting') ??
              'Tap Open Settings and turn on Camera to allow access.',
            [
              { text: i18n?.t('invoice_attachment_component.btn_cancel') ?? 'Cancel' },
              {
                text: i18n?.t('invoice_attachment_component.btn_open_setting') ?? 'Open Settings',
                onPress: () => openSettings(),
              },
            ]
          );
        }
      });
  };

  const launchImageLibrary = () => {
    Picker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 1440,
      compressImageMaxHeight: 890,
      compressImageQuality: 0.8,
      cropping: false,
      cropperCircleOverlay: false,
    })
      .then((image) => {
        if (image.size < imageSize) {
          const imageType = imageHandler(image.sourceURL ? image.sourceURL : image.path);
          const validatedImageType = imageTypes.filter((element: String) =>
            imageType.toLowerCase().includes(element)
          );

          if (validatedImageType.length > 0) {
            onUpload(image);
          } else {
            showMessage({
              message:
                i18n?.t('invoice_attachment_component.msg_allow_file_type') ??
                'Allowed file types are PNG and JPG/JPEG',
              backgroundColor: '#ff0000',
            });
          }
        } else {
          showMessage({
            message:
              i18n?.t('invoice_attachment_component.msg_max_file_size') ??
              'Maximum file size should be 2MB',
            backgroundColor: '#ff0000',
          });
        }
      })
      .catch((e) => {
        if (e.toString() !== 'Error: User cancelled image selection') {
          Alert.alert(
            i18n?.t('invoice_attachment_component.msg_allow_access_photo') ??
              'Allow application to access your photos',
            i18n?.t('invoice_attachment_component.msg_turn_photo_setting') ??
              'Tap Open Settings and turn on Photos to allow access.',
            [
              { text: i18n?.t('invoice_attachment_component.btn_cancel') ?? 'Cancel' },
              {
                text: i18n?.t('invoice_attachment_component.btn_open_setting') ?? 'Open Settings',
                onPress: () => openSettings(),
              },
            ]
          );
        }
      });
  };

  const imageHandler = (uri: String) => {
    const getFilename = uri.split('/');
    const imgName = getFilename[getFilename.length - 1];
    return mime.lookup(imgName);
  };

  const onUpload = useCallback(
    async (image: any) => {
      const document = await uploadDocument({
        content: image.data,
        type: 'INVOICE',
        contentType: 'image/png',
        name: image?.filename ?? uniqueId(),
      });
      if (document) {
        setDocuments([...documents, document]);
      }
    },
    [documents]
  );

  return (
    <FlatList
      keyExtractor={(item) => item.documentId}
      data={documents}
      renderItem={({ item }) => {
        return (
          <ItemDocumentComponent
            editable={editable}
            numColumn={3}
            paddingHorizontal={_contentHorizontalPadding}
            document={item}
            onDelete={() => {
              setDocuments(documents.filter((i) => i.documentId !== item.documentId));
            }}
            style={ItemDocument?.style}
          />
        );
      }}
      numColumns={3}
      style={styles.containerStyle}
      ListHeaderComponent={() =>
        isUploadingDocument ? (
          <View style={styles.uploadingContainerStyle}>
            {uploadingComponent ?? (
              <Text style={styles.uploadingTextStyle}>
                {i18n?.t('invoice_attachment_component.msg_uploading') ?? 'Uploading document...'}
              </Text>
            )}
          </View>
        ) : (
          <View />
        )
      }
      ListFooterComponent={
        editable ? (
          <View style={styles.footerContainerStyle}>
            <TouchableOpacity
              disabled={isUploadingDocument}
              style={[styles.actionButtonStyle, { opacity: isUploadingDocument ? 0.5 : 1 }]}
              activeOpacity={0.8}
              onPress={launchCamera}
            >
              {cameraIcon ?? <CameraIcon size={18} />}
              <Text style={styles.actionButtonTitleStyle}>
                {i18n?.t('invoice_attachment_component.btn_take_photo') ?? 'Take photo'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isUploadingDocument}
              style={[styles.actionButtonStyle, { opacity: isUploadingDocument ? 0.5 : 1 }]}
              activeOpacity={0.8}
              onPress={launchImageLibrary}
            >
              {photoIcon ?? <PhotoIcon size={18} />}
              <Text style={styles.actionButtonTitleStyle}>
                {i18n?.t('invoice_attachment_component.btn_choose_photo') ?? 'Choose photo'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : undefined
      }
    />
  );
};

InvoiceAttachmentComponent.defaultProps = {
  editable: true,
};

export default InvoiceAttachmentComponent;
