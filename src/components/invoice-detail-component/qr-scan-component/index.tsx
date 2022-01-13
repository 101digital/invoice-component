import React, { useContext, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { QrScanComponentProps, QrScanComponentStyles } from './types';
import useMergeStyles from './theme';
import { CloseIcon } from '../../../assets';
import { showMessage, ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import { InvoiceContext } from '../../../context/invoice-context';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

const QRScanComponent = (props: QrScanComponentProps) => {
  const { isVisible, style, onClose, qrFrameSource, closeIcon } = props;
  const styles: QrScanComponentStyles = useMergeStyles(style);
  const qrWidth = StyleSheet.flatten(styles.qrContainerStyle).width ?? 260;
  const qrHeight = StyleSheet.flatten(styles.qrContainerStyle).height ?? 260;
  const { i18n } = useContext(ThemeContext);

  const {
    invoiceDetail,
    shareLink,
    getShareLink,
    isLoadingShareLink,
    clearShareLink,
    errorLoadShareLink,
    clearErrors,
  } = useContext(InvoiceContext);

  useEffect(() => {
    if (errorLoadShareLink) {
      showMessage({
        message: i18n?.t('invoice_component.msg_error_loading_qr') ?? 'Error while loading QR code',
        backgroundColor: '#ff0000',
      });
      onClose();
      clearErrors();
    }
  }, [errorLoadShareLink]);

  useEffect(() => {
    if (isVisible && invoiceDetail) {
      getShareLink(invoiceDetail, false, 'qr-scan');
    } else {
      clearShareLink();
    }
  }, [isVisible]);

  return (
    <Modal
      deviceHeight={deviceHeight}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{ justifyContent: 'center', margin: 0 }}
      backdropOpacity={0.5}
    >
      <View style={styles.containerStyle}>
        <View style={styles.rowItemContainerStyle}>
          <Text style={styles.headerTitleStyle}>
            {i18n?.t('invoice_component.lbl_scan_qr_to_pay') ?? 'Scan QR to pay'}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={styles.closeButtonContainerStyle}
          >
            {closeIcon ?? <CloseIcon size={15} />}
          </TouchableOpacity>
        </View>
        {isLoadingShareLink ? (
          <ShimmerPlaceHolder width={qrWidth} height={qrHeight} style={styles.qrContainerStyle} />
        ) : (
          <View style={styles.qrContainerStyle}>
            <ImageBackground
              style={styles.qrFrameImageStyle}
              source={qrFrameSource ?? require('../../../assets/qr-window.png')}
            >
              {shareLink && <QRCode value={shareLink.link} size={220} />}
            </ImageBackground>
          </View>
        )}
        <View style={styles.rowItemContainerStyle}>
          <Text style={styles.invoiceNumberLabelStyle}>
            {i18n?.t('invoice_component.lbl_invoice_number') ?? 'Invoice number'}
          </Text>
          <Text style={styles.invoiceNumberValueStyle}>{`#${invoiceDetail?.invoiceNumber}`}</Text>
        </View>
        <View style={styles.rowItemContainerStyle}>
          <Text style={styles.amountLabelStyle}>
            {i18n?.t('invoice_component.lbl_total_amount') ?? 'Total amount'}
          </Text>
          <Text style={styles.amountValueStyle}>
            {useCurrencyFormat(invoiceDetail?.totalAmount ?? 0, invoiceDetail?.currency ?? 'USD')}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default QRScanComponent;
