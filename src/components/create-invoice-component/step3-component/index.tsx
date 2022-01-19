import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Step3ComponentProps, Step3ComponentStyles } from './types';
import useMergeStyles from './theme';
import FooterComponent from '../footer-component';
import LineItemComponent from '../line-item-component';
import SummaryItemComponent from '../../summary-item-component';
import ActionButtonComponent from '../../action-button-component';
import { isEmpty } from 'lodash';
import { Extension } from '../../../types';
import { getExtensionAmount, getExtensionPercent, getTotalAmount } from '../../../utils/helper';
import { formatCurrency, ThemeContext } from 'react-native-theme-component';
import AddExtensionModal from './add-extension-modal';
import AddReferenceModal from './add-reference-modal';
import { InvoiceContext } from '../../../context/invoice-context';

const Step3Component = (props: Step3ComponentProps) => {
  const {
    style,
    onBackPressed,
    step2Data,
    currencyCode,
    step1Data,
    tax,
    discount,
    reference,
    onUpdateDiscount,
    onUpdateReference,
    onUpdateTax,
    onAttachDocument,
    onNextPressed,
    isEditInvoice,
    Footer,
    ExtensionModal,
    ReferenceModal,
    ActionButton,
    SummaryItem,
    LineItem,
  } = props;
  const styles: Step3ComponentStyles = useMergeStyles(style);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { currencies, i18n } = useContext(ThemeContext);
  const [isShowDiscountModal, setShowDiscountModal] = useState(false);
  const toggleShowDiscountModal = () => setShowDiscountModal(!isShowDiscountModal);
  const [isShowTaxModal, setShowTaxModal] = useState(false);
  const toggleShowTaxModal = () => setShowTaxModal(!isShowTaxModal);
  const [isShowReferenceModal, setShowReferenceModal] = useState(false);
  const toggleShowReferenceModal = () => setShowReferenceModal(!isShowReferenceModal);
  const { isCreatingInvoice, isUpdatingInvoice } = useContext(InvoiceContext);

  useEffect(() => {
    if (!isEmpty(step2Data)) {
      setSubTotal(getTotalAmount(step2Data));
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(step2Data)) {
      const total =
        subTotal + getExtensionAmount(subTotal, tax) - getExtensionAmount(subTotal, discount);
      setTotalPrice(total);
    }
  }, [subTotal, tax, discount]);

  return (
    <>
      <View style={styles.containerStyle}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Text style={styles.headerLabelStyle}>
            {i18n?.t('create_invoice_component.lbl_step_details') ?? 'Details'}
          </Text>
          <View style={styles.detailContainerStyle}>
            <View style={styles.detailItemContainerStyle}>
              <Text style={styles.detailItemLabelStyle}>
                {i18n?.t('create_invoice_component.lbl_invoice_date') ?? 'Invoice date'}
              </Text>
              <Text style={styles.detailItemValueStyle}>{step1Data.invoiceDate}</Text>
            </View>
            <View style={styles.detailItemContainerStyle}>
              <Text style={styles.detailItemLabelStyle}>
                {i18n?.t('create_invoice_component.lbl_due_date') ?? 'Due date'}
              </Text>
              <Text style={styles.detailItemValueStyle}>{step1Data.invoiceDueDate}</Text>
            </View>
            {!isEmpty(step1Data.customerName) && (
              <View style={styles.detailItemContainerStyle}>
                <Text style={styles.detailItemLabelStyle}>
                  {i18n?.t('create_invoice_component.lbl_customer') ?? 'Customer'}
                </Text>
                <Text style={styles.detailItemValueStyle}>{step1Data.customerName}</Text>
              </View>
            )}
          </View>
          <Text style={styles.headerLabelStyle}>
            {i18n?.t('create_invoice_component.lbl_items_added') ?? 'Items added'}
          </Text>
          {step2Data.map((item) => (
            <LineItemComponent
              key={item.id}
              data={item}
              currencyCode={currencyCode}
              style={LineItem?.style}
              {...LineItem?.props}
            />
          ))}
          <SummaryItemComponent
            title={i18n?.t('create_invoice_component.lbl_sub_total') ?? 'Sub total'}
            amount={formatCurrency(currencies, subTotal, currencyCode)}
            variant={'primary'}
            style={SummaryItem?.style}
            {...SummaryItem?.props}
          />
          <SummaryItemComponent
            title={i18n?.t('create_invoice_component.lbl_discount') ?? 'Discount'}
            amount={
              discount
                ? `- ${formatCurrency(
                    currencies,
                    getExtensionAmount(subTotal, discount),
                    currencyCode
                  )}`
                : ''
            }
            variant={'secondary'}
            onAddValue={toggleShowDiscountModal}
            subTitle={getExtensionPercent(discount)}
            style={SummaryItem?.style}
            {...SummaryItem?.props}
          />
          <SummaryItemComponent
            title={i18n?.t('create_invoice_component.lbl_tax') ?? 'Tax'}
            amount={
              tax
                ? `+ ${formatCurrency(currencies, getExtensionAmount(subTotal, tax), currencyCode)}`
                : ''
            }
            variant={'secondary'}
            subTitle={getExtensionPercent(tax)}
            onAddValue={toggleShowTaxModal}
            style={SummaryItem?.style}
            {...SummaryItem?.props}
          />
          <SummaryItemComponent
            title={i18n?.t('create_invoice_component.lbl_total') ?? 'Total'}
            amount={formatCurrency(currencies, totalPrice, currencyCode)}
            variant={'primary'}
            style={SummaryItem?.style}
            {...SummaryItem?.props}
          />
          <View style={{ height: 10, zIndex: -1 }} />
          <ActionButtonComponent
            title={i18n?.t('create_invoice_component.btn_attach_document') ?? 'Attachments'}
            onPressed={onAttachDocument}
            style={ActionButton?.style}
            {...ActionButton?.props}
          />
          <ActionButtonComponent
            title={i18n?.t('create_invoice_component.btn_reference_number') ?? 'Reference number'}
            onPressed={toggleShowReferenceModal}
            isLastItem
            style={ActionButton?.style}
            {...ActionButton?.props}
          />
        </ScrollView>
        <FooterComponent
          backButtonTitle={i18n?.t('create_invoice_component.btn_back') ?? 'Back'}
          nextButtonTitle={
            isEditInvoice
              ? i18n?.t('create_invoice_component.btn_update_invoice') ?? 'Update invoice'
              : i18n?.t('create_invoice_component.btn_create_invoice') ?? 'Create invoice'
          }
          canNext
          onBackPressed={onBackPressed}
          onNextPressed={onNextPressed}
          isLoading={isCreatingInvoice || isUpdatingInvoice}
          style={Footer?.style}
        />
      </View>
      <AddExtensionModal
        title={i18n?.t('create_invoice_component.lbl_add_discount') ?? 'Add discount'}
        isVisible={isShowDiscountModal}
        onClose={toggleShowDiscountModal}
        currencyCode={currencyCode}
        maxAmount={subTotal}
        type={'discount'}
        initData={discount}
        onSubmit={(data?: Extension) => {
          onUpdateDiscount(data);
          toggleShowDiscountModal();
        }}
        style={ExtensionModal?.style}
        {...ExtensionModal?.props}
      />
      <AddExtensionModal
        title={i18n?.t('create_invoice_component.lbl_add_tax') ?? 'Add tax'}
        isVisible={isShowTaxModal}
        onClose={toggleShowTaxModal}
        currencyCode={currencyCode}
        maxAmount={subTotal}
        initData={tax}
        type={'tax'}
        onSubmit={(data?: Extension) => {
          onUpdateTax(data);
          toggleShowTaxModal();
        }}
        style={ExtensionModal?.style}
        {...ExtensionModal?.props}
      />
      <AddReferenceModal
        referenceNumber={reference}
        isVisible={isShowReferenceModal}
        onClose={toggleShowReferenceModal}
        onSubmit={(ref?: string) => {
          onUpdateReference(ref);
          toggleShowReferenceModal();
        }}
        style={ReferenceModal?.style}
        {...ReferenceModal?.props}
      />
    </>
  );
};

export default Step3Component;
