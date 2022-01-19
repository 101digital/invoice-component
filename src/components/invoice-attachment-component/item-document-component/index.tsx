import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { InvoiceContext } from '../../../context/invoice-context';
import { DocumentData } from '../../../types';
import { ItemDocumentComponentProps, ItemDocumentComponentStyles } from './types';
import useMergeStyles from './theme';
import { BottomSheet, Image, ThemeContext } from 'react-native-theme-component';
import { BackIcon, CloseBorderIcon, images } from '../../../assets';
import { validBase64Image } from '../../../utils/helper';
const { width } = Dimensions.get('window');

const ItemDocumentComponent = (props: ItemDocumentComponentProps) => {
  const { document, style, numColumn, paddingHorizontal, onDelete, editable } = props;
  const styles: ItemDocumentComponentStyles = useMergeStyles(style);
  const [documentData, setDocumentData] = useState<DocumentData | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const { getDocumentDetail } = useContext(InvoiceContext);
  const { i18n } = useContext(ThemeContext);
  const [isShowPreview, setShowPreview] = useState(false);
  const toggleDocumentPreview = () => setShowPreview(!isShowPreview);
  const _itemMargin = parseInt((StyleSheet.flatten(styles.containerStyle).margin ?? 8).toString());
  const _totalPadding = paddingHorizontal * 2 + numColumn * _itemMargin * 2;

  useEffect(() => {
    if (document.documentId !== documentData?.id) {
      _getDocumentDetail();
    }
  }, [document]);

  const _getDocumentDetail = async () => {
    setLoading(true);
    const data = await getDocumentDetail(document.documentId);
    setLoading(false);
    setDocumentData(data);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.containerStyle, { width: (width - _totalPadding) / numColumn }]}
        activeOpacity={1}
        onPress={toggleDocumentPreview}
      >
        {isLoading ? (
          <View style={styles.loadingContainerStyle}>
            <ActivityIndicator size={'small'} color={'grey'} />
          </View>
        ) : (
          <>
            <Image
              key={documentData?.id}
              style={styles.contentStyle}
              resizeMode='cover'
              source={{
                uri: validBase64Image(documentData?.content)
                  ? documentData?.content
                  : `data:image/jpeg;base64,${documentData?.content}`,
              }}
              fallbackImage={images.bank}
            />
            {editable && (
              <TouchableOpacity
                onPress={onDelete}
                style={styles.deleteButtonContainerStyle}
                activeOpacity={0.8}
              >
                <CloseBorderIcon />
              </TouchableOpacity>
            )}
          </>
        )}
      </TouchableOpacity>
      <BottomSheet
        isVisible={isShowPreview}
        onBackButtonPress={toggleDocumentPreview}
        onBackdropPress={toggleDocumentPreview}
        animationIn='slideInRight'
        animationOut='slideOutRight'
        style={{
          containerStyle: {
            flex: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      >
        <SafeAreaView style={styles.previewContainerStyle}>
          <View style={styles.previewHeaderStyle}>
            <TouchableOpacity
              onPress={toggleDocumentPreview}
              activeOpacity={0.8}
              style={styles.backButtonContainerStyle}
            >
              <BackIcon color='#000000' />
            </TouchableOpacity>
            <Text style={styles.previewHeaderTitleStyle}>
              {i18n?.t('invoice_attachment_component.lbl_document_preview') ?? 'Document preview'}
            </Text>
          </View>
          <Image
            key={documentData?.id}
            style={styles.contentStyle}
            resizeMode='contain'
            source={{
              uri: validBase64Image(documentData?.content)
                ? documentData?.content
                : `data:image/jpeg;base64,${documentData?.content}`,
            }}
            fallbackImage={images.bank}
          />
        </SafeAreaView>
      </BottomSheet>
    </>
  );
};

export default ItemDocumentComponent;
