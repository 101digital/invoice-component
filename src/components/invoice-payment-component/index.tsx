import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { InvoicePaymentComponentProps, InvoicePaymentComponentStyles } from './types';
import useMergeStyles from './theme';
import { InvoiceContext } from '../../context/invoice-context';
import {
  AlertModal,
  ThemeContext,
  useCurrencyFormat,
  LoadingModal,
} from 'react-native-theme-component';
import { isEmpty } from 'lodash';
import { AddItemIcon } from '../../assets';
import { InvoiceStatusType, PaymentItem } from '../../types';
import AddPaymentComponent from './add-payment-component';
import PaymentItemComponent from './payment-item-component';

const InvoicePaymentComponent = (props: InvoicePaymentComponentProps) => {
  const { style, invoice, addItemIcon, PaymentItem, AddPaymentModal } = props;
  const styles: InvoicePaymentComponentStyles = useMergeStyles(style);
  const {
    getPaymentByInvoiceId,
    isLoadingPayments,
    payments,
    invoiceDetail,
    clearPayments,
    isAddedPaymentSuccess,
    isUpdatedPaymentSuccess,
    isDeletedPaymentSuccess,
    isDeletingPayment,
    deletePayment,
  } = useContext(InvoiceContext);
  const [isShowPayment, setShowPayment] = useState(false);
  const { i18n, colors } = useContext(ThemeContext);
  const [_invoice, setInvoice] = useState(invoice);
  const [paymentItem, setPaymentItem] = useState<PaymentItem | undefined>(undefined);
  const [isConfirmDelete, setConfirmDelete] = useState(false);
  const toggleShowPayment = () => setShowPayment(!isShowPayment);
  const toggleShowConfirmDelete = () => {
    if (isConfirmDelete) {
      setPaymentItem(undefined);
    }
    setConfirmDelete(!isConfirmDelete);
  };

  useEffect(() => {
    if (
      (isAddedPaymentSuccess || isUpdatedPaymentSuccess || isDeletedPaymentSuccess) &&
      invoiceDetail
    ) {
      getPaymentByInvoiceId(invoiceDetail?.invoiceId);
    }
  }, [isAddedPaymentSuccess, isUpdatedPaymentSuccess, isDeletedPaymentSuccess]);

  useEffect(() => {
    if (invoiceDetail && invoiceDetail.invoiceId === _invoice.invoiceId) {
      setInvoice(invoiceDetail);
    }
  }, [invoiceDetail]);

  useEffect(() => {
    return () => {
      clearPayments();
    };
  }, []);

  useEffect(() => {
    if (isEmpty(payments)) {
      getPaymentByInvoiceId(invoice.invoiceId);
    }
  }, [invoice]);

  const canAdd = _invoice.status[0].key !== InvoiceStatusType.paid;

  return (
    <>
      <View style={styles.containerStyle}>
        <View style={styles.contentContainerStyle}>
          <FlatList
            keyExtractor={(item) => item.paymentId}
            data={payments}
            showsVerticalScrollIndicator={false}
            initialNumToRender={payments.length}
            renderItem={({ item }) => {
              return (
                <PaymentItemComponent
                  canChange={canAdd}
                  payment={item}
                  onDelete={() => {
                    setConfirmDelete(true);
                    setPaymentItem(item);
                  }}
                  onEdit={() => {
                    setShowPayment(true);
                    setPaymentItem(item);
                  }}
                  style={PaymentItem?.style}
                  {...PaymentItem?.props}
                />
              );
            }}
            ListFooterComponent={() => {
              if (canAdd) {
                return (
                  <TouchableOpacity
                    onPress={toggleShowPayment}
                    activeOpacity={0.8}
                    style={styles.addButtonContainerStyle}
                  >
                    {addItemIcon ?? <AddItemIcon size={14} color={colors.primaryColor} />}
                    <Text style={styles.addButtonTitleStyle}>
                      {i18n?.t('invoice_payment_component.btn_add_new') ?? 'Add new'}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return <View />;
            }}
          />
        </View>
        <View style={styles.footerContainerStyle}>
          <View style={styles.rowItemContainerStyle}>
            <Text style={styles.totalAmountLabelStyle}>
              {i18n?.t('invoice_payment_component.lbl_total_paid') ?? 'Total amount paid'}
            </Text>
            <Text style={styles.totalAmountValueStyle}>
              {useCurrencyFormat(_invoice.totalPaid, _invoice.currency)}
            </Text>
          </View>
          <View style={styles.rowItemContainerStyle}>
            <Text style={styles.balanceDueLabelStyle}>
              {i18n?.t('invoice_payment_component.lbl_balance_due') ?? 'Balance due'}
            </Text>
            <Text style={styles.balanceDueValueStyle}>
              {useCurrencyFormat(_invoice.balanceAmount, _invoice.currency)}
            </Text>
          </View>
        </View>
      </View>
      <AddPaymentComponent
        invoice={_invoice}
        isVisible={isShowPayment}
        onClose={() => {
          setPaymentItem(undefined);
          setShowPayment(false);
        }}
        paymentData={paymentItem}
        style={AddPaymentModal?.style}
        {...AddPaymentModal?.props}
      />
      <AlertModal
        isVisible={isConfirmDelete}
        title={i18n?.t('invoice_payment_component.lbl_delete_payment') ?? 'Delete payment'}
        cancelTitle={i18n?.t('invoice_payment_component.btn_cancel') ?? 'Cancel'}
        confirmTitle={i18n?.t('invoice_payment_component.btn_delete') ?? 'Delete'}
        onClose={toggleShowConfirmDelete}
        onCancel={toggleShowConfirmDelete}
        message={
          i18n?.t('invoice_payment_component.msg_confirm_delete_payment') ??
          'Are you sure? once deleted, you cannot undo this action.'
        }
        isShowClose={false}
        onConfirmed={() => {
          if (paymentItem && _invoice) {
            deletePayment(paymentItem.paymentId, _invoice.invoiceId);
            toggleShowConfirmDelete();
          }
        }}
        style={
          style?.confirmAlertStyle ?? {
            cancelButtonStyle: {
              secondaryContainerStyle: {
                backgroundColor: 'white',
                flex: 1,
              },
            },
          }
        }
      />
      <LoadingModal shouldShow={isLoadingPayments || isDeletingPayment} />
    </>
  );
};

export default InvoicePaymentComponent;
