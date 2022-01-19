import { AttachmentIcon, InvoiceViewIcon, MoreIcon } from '../../assets';
import { isEmpty } from 'lodash';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InvoiceItemComponentProps, InvoiceItemComponentStyles } from './types';
import useMergeStyles from './theme';
import moment from 'moment';
import { useCurrencyFormat } from 'react-native-theme-component';
import { InvoiceStatusType, InvoiceSubStatus, InvoiceSubStatusType } from '../../types';
import { addAlpha, getCustomerName } from '../../utils/helper';

const ItemInvoiceComponent = (props: InvoiceItemComponentProps) => {
  const {
    style,
    invoice,
    paidColor,
    dueColor,
    overdueColor,
    colorOpacity,
    onMoreAction,
    onPressed,
    dateFormat,
    moreIcon,
    attachmentIcon,
  } = props;
  const styles: InvoiceItemComponentStyles = useMergeStyles(style);
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';
  const _paidColor = paidColor ?? '#00CD5F';
  const _dueColor = dueColor ?? '#FFAD33';
  const _overdueColor = overdueColor ?? '#DB0011';

  const invoiceStatus = invoice.status[0].key;

  const getSubStatus = () => {
    if (!isEmpty(invoice.subStatus)) {
      let subStatusText: string = '';
      let subStatusIcon: boolean = false;
      invoice.subStatus?.forEach((s: InvoiceSubStatus) => {
        if (s.value && s.key !== InvoiceSubStatusType.viewed) {
          subStatusText = InvoiceSubStatusType.sent;
        } else if (s.value && s.key === InvoiceSubStatusType.viewed) {
          subStatusIcon = true;
        }
      });
      return { subStatusText: subStatusText, showIcon: subStatusIcon };
    }
    return null;
  };

  const des = () => {
    let customerName = getCustomerName(invoice);
    if (!isEmpty(customerName)) {
      return customerName;
    }
    if (!isEmpty(invoice?.description)) {
      return invoice.description;
    }
    return undefined;
  };

  const truncateString = (text: string, maxLength: number) => {
    if (!text) {
      return null;
    }
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };

  const description = des();
  const subStatus = getSubStatus();
  const isShowDocument = invoice.numberOfDocuments !== undefined && invoice.numberOfDocuments > 0;

  const getStatusBackground = (status?: InvoiceStatusType) => {
    switch (status) {
      case InvoiceStatusType.due:
        return addAlpha(_dueColor, colorOpacity ?? 0.1);
      case InvoiceStatusType.overDue:
        return addAlpha(_overdueColor, colorOpacity ?? 0.1);
      case InvoiceStatusType.paid:
        return addAlpha(_paidColor, colorOpacity ?? 0.1);
      default:
        return 'white';
    }
  };

  const getStatusColor = (status?: InvoiceStatusType) => {
    switch (status) {
      case InvoiceStatusType.due:
        return _dueColor;
      case InvoiceStatusType.overDue:
        return _overdueColor;
      case InvoiceStatusType.paid:
        return _paidColor;
      default:
        return '#000000';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerStyle}
      onPress={() => onPressed(invoice)}
    >
      <View style={styles.leftContainerStyle}>
        <View style={styles.invoiceNumberContainerStyle}>
          <Text style={styles.invoiceNumberStyle}>{`#${invoice.invoiceNumber}`}</Text>
          {isShowDocument && (attachmentIcon ?? <AttachmentIcon size={12} />)}
        </View>
        {description && (
          <Text numberOfLines={2} style={styles.invoiceDescriptionStyle}>
            {truncateString(description, 100)}
          </Text>
        )}
        <Text style={styles.invoiceDateStyle}>
          {moment(invoice.invoiceDate).format(_dateFormat)}
        </Text>
      </View>
      <View style={styles.rightContainerStyle}>
        <View style={styles.invoiceAmountContainerStyle}>
          <Text style={styles.invoiceAmountStyle}>
            {useCurrencyFormat(invoice.totalAmount, invoice.currency)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onMoreAction(invoice);
            }}
            style={styles.moreContainerStyle}
          >
            {moreIcon ?? <MoreIcon color="#000" />}
          </TouchableOpacity>
        </View>
        <View style={styles.statusContainerStyle}>
          {subStatus && (
            <>
              {subStatus.showIcon && <InvoiceViewIcon size={14} />}
              {!isEmpty(subStatus.subStatusText) && (
                <Text style={styles.subStatusTextStyle}>{subStatus.subStatusText}</Text>
              )}
            </>
          )}
          <View
            style={[styles.statusBoxStyle, { backgroundColor: getStatusBackground(invoiceStatus) }]}
          >
            <Text style={[styles.statusTextStyle, { color: getStatusColor(invoiceStatus) }]}>
              {invoiceStatus}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemInvoiceComponent;
