import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, formatCurrency, showMessage, ThemeContext } from 'react-native-theme-component';
import { InvoiceContext } from '../../context/invoice-context';
import DetailHeaderComponent from './detail-header-component';
import DetailShimmerComponent from './detail-shimmer-component';
import ScrollContextProvider, { AnimatedScrollView } from './scroll-provider-component';
import { InvoiceDetailComponentProps, InvoiceDetailComponentStyles } from './types';
import useMergeStyles from './theme';
import { QrIcon } from '../../assets';
import moment from 'moment';
import { getCustomerName, showChaseInvoice, showShareInvoice } from '../../utils/helper';
import { compact, isEmpty } from 'lodash';
import { InvoiceStatusType } from '../../types';
import LineItemComponent from './line-item-component';
import SummaryItemComponent from './summary-item-component';
import ActionButtonComponent from './action-button-component';
import QRScanComponent from './qr-scan-component';
import AddPaymentComponent from '../invoice-payment-component/add-payment-component';

const InvoiceDetailComponent = (props: InvoiceDetailComponentProps) => {
  const {
    onBackPressed,
    invoiceId,
    style,
    qrIcon,
    dateFormat,
    dueColor,
    overdueColor,
    paidColor,
    onViewAttachments,
    onViewDescription,
    onViewPayments,
    AddPaymentModal,
    DetailHeader,
    LineItem,
    SummaryItem,
    DetailShimmer,
    ScanQRModal,
    ActionButton,
  } = props;
  const {
    getInvoiceDetail,
    isLoadingInvoiceDetail,
    invoiceDetail,
    errorLoadInvoiceDetail,
    clearInvoiceDetail,
    shareLink,
    isLoadingShareLink,
    getShareLink,
    clearShareLink,
    updateInvoiceSubStatus,
    isUpdatingInvoice,
    isAddedPaymentSuccess,
    isUpdatedPaymentSuccess,
    isDeletedPaymentSuccess,
  } = useContext(InvoiceContext);
  const { i18n, colors, currencies } = useContext(ThemeContext);
  const styles: InvoiceDetailComponentStyles = useMergeStyles(style);
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';
  const customerName = getCustomerName(invoiceDetail);
  const _paidColor = paidColor ?? '#00CD5F';
  const _dueColor = dueColor ?? '#FFAD33';
  const _overdueColor = overdueColor ?? '#DB0011';
  const [isShowQrModal, setShowQrModal] = useState(false);
  const [isShowPayment, setShowPayment] = useState(false);

  const toggleShowPayment = () => setShowPayment(!isShowPayment);
  const toggleQrModal = () => setShowQrModal(!isShowQrModal);

  useEffect(() => {
    if (isAddedPaymentSuccess) {
      setShowPayment(false);
      showMessage({
        message: i18n?.t(
          'invoice_payment_component.msg_add_payment_successful' ?? 'Payment added successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [isAddedPaymentSuccess]);

  useEffect(() => {
    if (isUpdatedPaymentSuccess) {
      showMessage({
        message: i18n?.t(
          'invoice_payment_component.msg_update_payment_successful' ??
            'Payment updated successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [isUpdatedPaymentSuccess]);

  useEffect(() => {
    if (isDeletedPaymentSuccess) {
      showMessage({
        message: i18n?.t(
          'invoice_payment_component.msg_delete_payment_successful' ??
            'Payment deleted successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [isDeletedPaymentSuccess]);

  useEffect(() => {
    if (shareLink && shareLink.showFrom === 'invoice-detail') {
      if (shareLink.isChase) {
        showChaseInvoice(
          shareLink,
          clearShareLink,
          (amount, code) => formatCurrency(currencies, amount, code),
          updateInvoiceSubStatus,
          i18n
        );
      } else {
        showShareInvoice(shareLink, clearShareLink, updateInvoiceSubStatus, i18n);
      }
    }
  }, [shareLink]);

  useEffect(() => {
    getInvoiceDetail(invoiceId);
    return () => {
      clearInvoiceDetail();
    };
  }, [invoiceId]);

  useEffect(() => {
    if (errorLoadInvoiceDetail) {
      onBackPressed();
    }
  }, [errorLoadInvoiceDetail]);

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

  if (isLoadingInvoiceDetail || !invoiceDetail) {
    return (
      <DetailShimmerComponent
        onBackPressed={onBackPressed}
        style={DetailShimmer?.style}
        {...DetailShimmer?.props}
      />
    );
  }

  const invoiceItems = compact(invoiceDetail.items);
  const showShareButton =
    isEmpty(invoiceDetail.subStatus) || invoiceDetail.status[0].key === InvoiceStatusType.paid;
  const canPayMore = invoiceDetail.status[0].key !== InvoiceStatusType.paid;

  const handleShareInvoice = () => {
    if (!isLoadingShareLink) {
      getShareLink(invoiceDetail, !showShareButton, 'invoice-detail');
    }
  };

  return (
    <>
      <ScrollContextProvider>
        <View style={styles.containerStyle}>
          <DetailHeaderComponent
            invoiceNumber={invoiceDetail.invoiceNumber}
            onBackPressed={onBackPressed}
            style={DetailHeader?.style}
            {...DetailHeader?.props}
          />
          <AnimatedScrollView
            style={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainerStyle}>
              <View style={styles.rowItemContainerStyle}>
                <Text style={styles.invoiceNumberStyle}>
                  {`#${invoiceDetail.invoiceNumber || invoiceDetail.invoiceId}`}
                  <Text style={styles.invoiceVersionStyle}>{` (v${invoiceDetail.version})`}</Text>
                </Text>
                <TouchableOpacity activeOpacity={0.8} onPress={toggleQrModal}>
                  {qrIcon ?? <QrIcon color={colors.primaryButtonColor} />}
                </TouchableOpacity>
              </View>
              <View style={styles.headerContentContainerStyle}>
                <View style={styles.rowItemContainerStyle}>
                  <Text style={styles.headerItemTitleStyle}>
                    {i18n?.t('invoice_component.lbl_invoice_date') ?? 'Invoice date'}
                  </Text>
                  <Text style={styles.headerItemValueStyle}>
                    {moment(invoiceDetail.invoiceDate).format(_dateFormat)}
                  </Text>
                </View>
                <View style={styles.rowItemContainerStyle}>
                  <Text style={styles.headerItemTitleStyle}>
                    {i18n?.t('invoice_component.lbl_invoice_due_date') ?? 'Due date'}
                  </Text>
                  <Text style={styles.headerItemValueStyle}>
                    {moment(invoiceDetail.dueDate).format(_dateFormat)}
                  </Text>
                </View>
                {!isEmpty(customerName) && (
                  <View style={styles.rowItemContainerStyle}>
                    <Text style={styles.headerItemTitleStyle}>
                      {i18n?.t('invoice_component.lbl_customer') ?? 'Customer'}
                    </Text>
                    <Text style={styles.headerItemValueStyle}>{customerName}</Text>
                  </View>
                )}
                {!isEmpty(invoiceDetail.invoiceReference) && (
                  <View style={styles.rowItemContainerStyle}>
                    <Text style={styles.headerItemTitleStyle}>
                      {i18n?.t('invoice_component.lbl_reference') ?? 'Reference'}
                    </Text>
                    <Text style={styles.headerItemValueStyle}>
                      {invoiceDetail.invoiceReference}
                    </Text>
                  </View>
                )}
                <View style={styles.rowItemContainerStyle}>
                  <Text style={styles.headerItemTitleStyle}>
                    {i18n?.t('invoice_component.lbl_status') ?? 'Status'}
                  </Text>
                  <Text
                    style={[
                      styles.headerItemValueStyle,
                      { color: getStatusColor(invoiceDetail.status[0].key) },
                    ]}
                  >
                    {invoiceDetail.status[0].key}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.itemsLabelStyle}>
              {i18n?.t('invoice_component.lbl_items') ?? 'Item(s)'}
            </Text>
            <>
              {invoiceItems.map((item) => (
                <LineItemComponent
                  key={Math.floor(Math.random() * 1001).toString()}
                  lineItem={item}
                  currencyCode={invoiceDetail.currency}
                  style={LineItem?.style}
                  {...LineItem?.props}
                />
              ))}
            </>
            <SummaryItemComponent
              variant="primary"
              title={i18n?.t('invoice_component.lbl_sub_total') ?? 'Sub total'}
              amount={formatCurrency(
                currencies,
                invoiceDetail.invoiceSubTotal,
                invoiceDetail.currency
              )}
              style={SummaryItem?.style}
              {...SummaryItem?.props}
            />
            <SummaryItemComponent
              variant="secondary"
              title={i18n?.t('invoice_component.lbl_discount') ?? 'Discount'}
              amount={`${invoiceDetail.totalDiscount !== 0 ? '-' : ''} ${formatCurrency(
                currencies,
                invoiceDetail.totalDiscount,
                invoiceDetail.currency
              )}`}
              subTitle={
                invoiceDetail.totalDiscount !== 0
                  ? `(${(
                      (invoiceDetail.totalDiscount / invoiceDetail.invoiceSubTotal) *
                      100
                    ).toFixed(2)}%)`
                  : ''
              }
              style={SummaryItem?.style}
              {...SummaryItem?.props}
            />
            <SummaryItemComponent
              variant="secondary"
              title={i18n?.t('invoice_component.lbl_tax') ?? 'Tax'}
              amount={`${invoiceDetail.totalTax !== 0 ? '+' : ''} ${formatCurrency(
                currencies,
                invoiceDetail.totalTax,
                invoiceDetail.currency
              )}`}
              subTitle={
                invoiceDetail.totalTax !== 0
                  ? `(${((invoiceDetail.totalTax / invoiceDetail.invoiceSubTotal) * 100).toFixed(
                      2
                    )}%)`
                  : ''
              }
              style={SummaryItem?.style}
              {...SummaryItem?.props}
            />
            <SummaryItemComponent
              variant="primary"
              title={i18n?.t('invoice_component.lbl_total') ?? 'Total'}
              amount={formatCurrency(currencies, invoiceDetail.totalAmount, invoiceDetail.currency)}
              style={SummaryItem?.style}
              {...SummaryItem?.props}
            />
            <SummaryItemComponent
              variant="secondary"
              title={i18n?.t('invoice_component.lbl_payment_paid') ?? 'Paid'}
              amount={formatCurrency(currencies, invoiceDetail.totalPaid, invoiceDetail.currency)}
              onPressedAmount={() => onViewPayments(invoiceDetail)}
              style={SummaryItem?.style}
              {...SummaryItem?.props}
            />
            <SummaryItemComponent
              variant="primary"
              title={i18n?.t('invoice_component.lbl_balance_due') ?? 'Balance due'}
              amount={formatCurrency(
                currencies,
                invoiceDetail.balanceAmount,
                invoiceDetail.currency
              )}
              style={SummaryItem?.style}
              {...SummaryItem?.props}
            />
            <View style={{ height: 10 }} />
            <>
              {!isEmpty(invoiceDetail.description) && (
                <ActionButtonComponent
                  title={
                    i18n?.t('invoice_component.btn_invoice_description') ?? 'Invoice description'
                  }
                  onPressed={() => {
                    onViewDescription(invoiceDetail.description);
                  }}
                  style={ActionButton?.style}
                  {...ActionButton?.props}
                />
              )}
              <ActionButtonComponent
                title={i18n?.t('invoice_component.btn_attachments') ?? 'Attachments'}
                onPressed={() => {
                  onViewAttachments(invoiceDetail.documents);
                }}
                isLastItem
                style={ActionButton?.style}
                {...ActionButton?.props}
              />
            </>
          </AnimatedScrollView>
          <View style={styles.footerContainerStyle}>
            <Button
              style={
                style?.addPaymentButtonStyle ?? {
                  primaryContainerStyle: {
                    flex: 1,
                    marginRight: 7.5,
                  },
                }
              }
              label={i18n?.t('invoice_component.btn_add_payment') ?? 'Add payment'}
              disabled={!canPayMore}
              onPress={toggleShowPayment}
            />
            <Button
              style={
                style?.shareButtonStyle ?? {
                  primaryContainerStyle: {
                    flex: 1,
                    marginLeft: 7.5,
                  },
                }
              }
              label={
                showShareButton
                  ? i18n?.t('invoice_component.lbl_share_invoice') ?? 'Share invoice'
                  : i18n?.t('invoice_component.btn_send_reminder') ?? 'Send reminder'
              }
              onPress={handleShareInvoice}
              isLoading={(isLoadingShareLink && !isShowQrModal) || isUpdatingInvoice}
            />
          </View>
        </View>
      </ScrollContextProvider>
      <QRScanComponent
        isVisible={isShowQrModal}
        onClose={toggleQrModal}
        style={ScanQRModal?.style}
        {...ScanQRModal?.props}
      />
      <AddPaymentComponent
        invoice={invoiceDetail}
        isVisible={isShowPayment}
        onClose={toggleShowPayment}
        style={AddPaymentModal?.style}
        {...AddPaymentModal?.props}
      />
    </>
  );
};

export default InvoiceDetailComponent;
