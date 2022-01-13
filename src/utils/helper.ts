import { chain, isEmpty } from 'lodash';
import moment from 'moment';
import { Dimensions, NativeScrollEvent, Platform } from 'react-native';
import { Invoice, ShareLink } from '../types';
import Share from 'react-native-share';

function rgbToHex(color: string) {
  const a = color.replace(/[^\d,]/g, '').split(',');
  return '#' + ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1);
}

export const addAlpha = (color: string, opacity: number) => {
  if (!color.startsWith('#')) {
    color = rgbToHex(color);
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16)?.toUpperCase();
};

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export const groupInvoices = (invoices: Invoice[]): any[] => {
  if (!isEmpty(invoices)) {
    const groupedData = chain(invoices)
      .groupBy((item) => {
        return moment(item.invoiceDate).format('YYYY-MM');
      })
      .map((value, key) => ({ date: key, data: value }))
      .orderBy((item) => item.date, ['desc'])
      .value();
    return groupedData;
  } else {
    return [];
  }
};

export const getCustomerName = (invoice?: Invoice) => {
  if (invoice && invoice.customer) {
    return (
      invoice.customer.name ||
      `${invoice.customer?.firstName ?? ''} ${invoice.customer?.lastName ?? ''}`.trim()
    );
  }
  return '';
};

export const getCustomerEmail = (invoice?: Invoice) => {
  if (invoice && invoice.customer) {
    return invoice.customer?.contact?.email ?? '';
  }
  return '';
};

export const showShareInvoice = async (
  shareLink: ShareLink,
  clearShareLink: () => void,
  updateSubStatus?: (invoice: Invoice) => void,
  i18n?: any
) => {
  if (shareLink) {
    try {
      const res = await Share.open({
        title: i18n?.t('invoice_component.lbl_share_invoice') ?? 'Share invoice',
        message: (
          i18n?.t('invoice_component.msg_share_invoice') ??
          'Hi,\n\nPlease use the below URL to view and pay for the invoice.\n\n%s'
        ).replace('%s', shareLink.link),
        failOnCancel: false,
      });
      clearShareLink();
      if (Platform.OS === 'ios') {
        if (res.success) {
          updateSubStatus?.(shareLink.invoice);
        }
      } else {
        updateSubStatus?.(shareLink.invoice);
      }
    } catch (error) {
      clearShareLink();
      if (__DEV__) {
        console.log(error);
      }
    }
  }
};

export const showChaseInvoice = async (
  shareLink: ShareLink,
  clearShareLink: () => void,
  formatCurrency: (amount: number, code: string) => string,
  updateSubStatus?: (invoice: Invoice) => void,
  i18n?: any
) => {
  if (shareLink) {
    const customerName = getCustomerName(shareLink.invoice);
    const customerEmail = getCustomerEmail(shareLink.invoice);
    const subject = (i18n?.t('invoice_component.lbl_chase_subject') ?? 'Invoice %no from %mc')
      .replace('%no', shareLink.invoice.invoiceNumber)
      .replace('%mc', shareLink.invoice.merchant.name);
    const amount = formatCurrency(shareLink.invoice.totalAmount, shareLink.invoice.currency);
    try {
      const res = await Share.open({
        title: i18n?.t('invoice_component.lbl_share_invoice') ?? 'Share invoice',
        subject: subject,
        email: customerEmail,
        message: (
          i18n?.t('invoice_component.msg_chase_invoice') ??
          'Hi %cn,\n\nI hope you are well. We have yet to receive payment of %am in respect of our invoice #%no which was due for payment on %dd.\n\nI would be really grateful if you could let me know when we can expect to receive the payment.\n\nView your invoice online: %sl\n\nBest regards\n\n%mc\n'
        )
          .replace('%cn', customerName)
          .replace('%am', amount)
          .replace('%no', shareLink.invoice.invoiceNumber)
          .replace('%dd', shareLink.invoice.dueDate)
          .replace('%sl', shareLink.link)
          .replace('%mc', shareLink.invoice.merchant.name),
        failOnCancel: false,
      });
      clearShareLink();
      if (Platform.OS === 'ios') {
        if (res.success) {
          updateSubStatus?.(shareLink.invoice);
        }
      } else {
        updateSubStatus?.(shareLink.invoice);
      }
    } catch (error) {
      clearShareLink();
      if (__DEV__) {
        console.log(error);
      }
    }
  }
};

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
