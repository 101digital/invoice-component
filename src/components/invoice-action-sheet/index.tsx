import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, ThemeContext } from 'react-native-theme-component';
import { DeleteIcon, EditIcon, ShareIcon } from '../../assets';
import { InvoiceActionSheetProps, InvoiceActionSheetStyles } from './types';
import useMergeStyles from './theme';
import { isEmpty } from 'lodash';
import { InvoiceStatusType } from '../../types';

const InvoiceActionSheet = (props: InvoiceActionSheetProps) => {
  const {
    isVisible,
    status,
    editIcon,
    deleteIcon,
    shareIcon,
    style,
    onDeleteInvoice,
    onEditInvoice,
    onShareInvoice,
    onChaseInvoice,
    onClose,
    disableOpacity,
    subStatus,
  } = props;
  const { i18n } = useContext(ThemeContext);
  const styles: InvoiceActionSheetStyles = useMergeStyles(style);
  const _disableOpacity = disableOpacity ?? 0.3;
  const isEnable = status !== InvoiceStatusType.paid;
  const isShareInvoice = isEmpty(subStatus) || status === InvoiceStatusType.paid;

  return (
    <BottomSheet isVisible={isVisible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={styles.containerStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isEnable}
          style={[styles.actionButtonStyle, { opacity: isEnable ? 1 : _disableOpacity }]}
          onPress={onEditInvoice}
        >
          {editIcon ?? <EditIcon />}
          <Text style={styles.actionTitleStyle}>
            {i18n?.t('invoice_component.btn_edit_invoice') ?? 'Edit invoice'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isEnable}
          style={[styles.actionButtonStyle, { opacity: isEnable ? 1 : _disableOpacity }]}
          onPress={onDeleteInvoice}
        >
          {deleteIcon ?? <DeleteIcon />}
          <Text style={styles.actionTitleStyle}>
            {i18n?.t('invoice_component.btn_delete_invoice') ?? 'Delete invoice'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionButtonStyle}
          onPress={() => {
            if (isShareInvoice) {
              onShareInvoice();
            } else {
              onChaseInvoice();
            }
          }}
        >
          {shareIcon ?? <ShareIcon />}
          <Text style={styles.actionTitleStyle}>
            {isShareInvoice
              ? i18n?.t('invoice_component.btn_share_invoice') ?? 'Share invoice'
              : i18n?.t('invoice_component.btn_send_reminder') ?? 'Send reminder'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.cancelButtonStyle} onPress={onClose}>
          <Text style={styles.cancelTextStyle}>
            {i18n?.t('invoice_component.btn_cancel')?.toUpperCase() ?? 'CANCEL'}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default InvoiceActionSheet;
