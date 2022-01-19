import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import {
  CreateInvoiceComponentProps,
  CreateInvoiceComponentRefs,
  CreateInvoiceComponentStyles,
} from './types';
import useMergeStyles from './theme';
import { View } from 'react-native';
import HeaderComponent from './header-component';
import { AlertModal, LoadingModal, showMessage, ThemeContext } from 'react-native-theme-component';
import Step1Component from './step1-component';
import {
  CustomerParams,
  DocumentReference,
  Extension,
  ItemInvoiceData,
  ItemInvoiceReference,
} from '../../types';
import { CreateInvoiceStepOneData } from './step1-component/model';
import Step2Component from './step2-component';
import Step3Component from './step3-component';
import { InvoiceContext } from '../../context/invoice-context';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { getCustomerName } from '../../utils/helper';
import { Danger2Icon } from '../../assets';

const CreateInvoiceComponent = forwardRef((props: CreateInvoiceComponentProps, ref) => {
  const {
    style,
    onSearchCustomer,
    currencyCode,
    dateFormat,
    onAttachDocument,
    onGoBack,
    invoiceId,
    bankAccount,
    onCreatedInvoice,
    onUpdatedInvoice,
    Header,
    Footer,
    Step1,
    Step2,
    Step3,
  } = props;

  const styles: CreateInvoiceComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);
  const [_currencyCode, setCurrencyCode] = useState(currencyCode);
  const [activeStep, setActiveStep] = useState(0);
  const [customer, setCustomer] = useState<CustomerParams | undefined>(undefined);
  const [step1Data, setStep1Data] = useState(CreateInvoiceStepOneData.init());
  const [step2Data, setStep2Data] = useState<ItemInvoiceData[]>([]);
  const [tax, setTax] = useState<Extension | undefined>(undefined);
  const [discount, setDiscount] = useState<Extension | undefined>(undefined);
  const [reference, setReference] = useState<string | undefined>(undefined);
  const {
    documents,
    clearDocuments,
    invoiceDetail,
    clearInvoiceDetail,
    createInvoice,
    isCreatedInvoiceSuccess,
    isCreatingInvoice,
    getInvoiceDetail,
    isLoadingInvoiceDetail,
    setDocuments,
    updateInvoice,
    isUpdatingInvoice,
    isUpdatedInvoiceSuccess,
  } = useContext(InvoiceContext);
  const [isEdited, setEditted] = useState(false);
  const [isShowDiscardModal, setShowDiscardModal] = useState(false);
  const isEditInvoice = invoiceId !== undefined;
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';

  useEffect(() => {
    if (invoiceId) {
      getInvoiceDetail(invoiceId);
    }
  }, [invoiceId]);

  useEffect(() => {
    if (isCreatedInvoiceSuccess) {
      showMessage({
        message: 'Invoice created successfully',
        backgroundColor: '#44ac44',
      });
    }
  }, [isCreatedInvoiceSuccess]);

  useEffect(() => {
    if (isUpdatedInvoiceSuccess) {
      showMessage({
        message: 'Invoice updated successfully',
        backgroundColor: '#44ac44',
      });
    }
  }, [isUpdatedInvoiceSuccess]);

  const onEdited = () => {
    if (!isEdited) {
      setEditted(true);
    }
  };

  useEffect(() => {
    if (!isEmpty(documents)) {
      clearDocuments();
    }
  }, []);

  useImperativeHandle(
    ref,
    (): CreateInvoiceComponentRefs => ({
      updateCustomer,
      setActiveStep,
    })
  );

  useEffect(() => {
    if (invoiceDetail) {
      onEdited();
      setCurrencyCode(invoiceDetail.currency);
      setDocuments(invoiceDetail.documents);
      const dueDate = moment(invoiceDetail.dueDate).diff(moment(invoiceDetail.invoiceDate), 'd');
      const customer: CustomerParams | undefined = invoiceDetail.customer
        ? {
            id: invoiceDetail.customer?.id,
            name: getCustomerName(invoiceDetail),
            dueDatePeriod: dueDate,
          }
        : undefined;
      if (customer) {
        setCustomer(customer);
      }
      setStep1Data(
        new CreateInvoiceStepOneData(
          invoiceDetail.description,
          customer?.name,
          customer?.id,
          moment(invoiceDetail.invoiceDate).format(_dateFormat),
          moment(invoiceDetail.dueDate).format(_dateFormat),
          dueDate
        )
      );
      var itemList = [];
      for (let index = 0; index < invoiceDetail.items.length; index++) {
        const element = invoiceDetail.items[index];
        itemList.push({
          id: index.toString(),
          itemName: element.itemName,
          quantity: element.quantity,
          amount: element.rate,
          discount: '0',
          itemUOM: element.itemUOM,
          extensions: element.extensions,
        });
      }
      for (let index = 0; index < invoiceDetail.extensions.length; index++) {
        const element = invoiceDetail.extensions[index];
        if (element.name === 'discount') {
          setDiscount({
            addDeduct: element.addDeduct,
            type: element.type,
            value: element.value,
            name: element.name,
          });
        } else if (element.name === 'tax') {
          setTax({
            addDeduct: element.addDeduct,
            type: element.type,
            value: element.value,
            name: element.name,
          });
        }
      }
      setStep2Data(itemList);
    }
  }, [invoiceDetail]);

  const updateCustomer = (params: CustomerParams) => {
    setCustomer(params);
  };

  const toggleShowDiscardModal = () => {
    if (isShowDiscardModal) {
      setShowDiscardModal(false);
    } else {
      if (isEdited) {
        setShowDiscardModal(true);
      } else {
        onGoBack();
      }
    }
  };

  const getCustomerDetail = () => {
    if (customer && customer.id) {
      return {
        id: customer.id,
      };
    } else {
      return undefined;
    }
  };

  const clearData = () => {
    if (invoiceDetail) {
      clearInvoiceDetail();
    }
    if (!isEmpty(documents)) {
      clearDocuments();
    }
  };

  const handleSubmitInvoice = async () => {
    const itemReferences: ItemInvoiceReference[] = [];
    const invoiceDate = moment(step1Data.invoiceDate, _dateFormat).format('YYYY-MM-DD');
    const dueDate = moment(step1Data.invoiceDueDate, _dateFormat).format('YYYY-MM-DD');
    let extensions: Extension[] = [];
    if (tax) {
      extensions.push(tax);
    }
    if (discount) {
      extensions.push(discount);
    }
    for (let index = 0; index < step2Data.length; index++) {
      const item = step2Data[index];
      let itemObject: ItemInvoiceReference = {
        itemName: item.itemName,
        rate: item.amount,
        quantity: item.quantity,
        itemUOM: item.itemUOM,
        extensions: item.extensions,
      };
      itemReferences.push(itemObject);
    }
    let documentReferences: DocumentReference[] = [];
    for (let index = 0; index < documents.length; index++) {
      documentReferences.push({
        documentId: documents[index].documentId,
        documentName: documents[index].documentName ? documents[index].documentName : 'document',
      });
    }
    if (isEditInvoice) {
      const _invoice = await updateInvoice(
        invoiceId,
        invoiceDate,
        dueDate,
        _currencyCode,
        itemReferences,
        documentReferences,
        step1Data?.description ?? '',
        extensions,
        reference,
        getCustomerDetail(),
        invoiceDetail?.status[0].key,
        bankAccount
      );
      if (_invoice) {
        onUpdatedInvoice(_invoice);
      }
    } else {
      const _invoice = await createInvoice(
        invoiceDate,
        dueDate,
        _currencyCode,
        itemReferences,
        documentReferences,
        step1Data?.description ?? '',
        extensions,
        reference,
        getCustomerDetail(),
        bankAccount
      );
      if (_invoice) {
        onCreatedInvoice(_invoice);
      }
    }
  };

  return (
    <>
      <View style={styles.containerStyle}>
        <HeaderComponent
          steps={[
            i18n?.t('create_invoice_component.lbl_step_details') ?? 'Details',
            i18n?.t('create_invoice_component.lbl_step_add_item') ?? 'Add items',
            i18n?.t('create_invoice_component.lbl_step_create') ?? 'Create',
          ]}
          headerTitle={
            isEditInvoice
              ? i18n?.t('create_invoice_component.lbl_edit_invoice') ?? 'Edit invoice'
              : i18n?.t('create_invoice_component.lbl_create_invoice') ?? 'Create invoice'
          }
          activeStep={activeStep}
          onGoBack={() => {
            if (isCreatingInvoice || isUpdatingInvoice) {
              return;
            }
            toggleShowDiscardModal();
          }}
          style={Header?.style}
          {...Header?.props}
        />
        {activeStep === 0 && (
          <Step1Component
            customer={customer}
            onSearchCustomer={onSearchCustomer}
            onNextPressed={(data) => {
              setStep1Data(data);
              setActiveStep(1);
            }}
            onCancel={toggleShowDiscardModal}
            stepOneData={step1Data}
            dateFormat={dateFormat}
            onEdited={onEdited}
            Footer={Footer}
            style={Step1?.style}
            {...Step1?.props}
          />
        )}
        {activeStep === 1 && (
          <Step2Component
            onPressedBack={(items) => {
              setStep2Data(items);
              setActiveStep(0);
            }}
            onNext={(items) => {
              setStep2Data(items);
              setActiveStep(2);
            }}
            currencyCode={_currencyCode}
            initItems={step2Data}
            Footer={Footer}
            style={Step2?.style}
            LineItem={Step2?.LineItem}
            AddInvoiceModal={Step2?.AddInvoiceModal}
            {...Step2?.props}
          />
        )}
        {activeStep === 2 && (
          <Step3Component
            isEditInvoice={isEditInvoice}
            step1Data={step1Data}
            step2Data={step2Data}
            onBackPressed={() => setActiveStep(1)}
            currencyCode={_currencyCode}
            onUpdateTax={setTax}
            onUpdateDiscount={setDiscount}
            onUpdateReference={setReference}
            tax={tax}
            discount={discount}
            reference={reference}
            onAttachDocument={onAttachDocument}
            onNextPressed={handleSubmitInvoice}
            Footer={Footer}
            ExtensionModal={Step3?.ExtensionModal}
            ReferenceModal={Step3?.ReferenceModal}
            ActionButton={Step3?.ActionButton}
            SummaryItem={Step3?.SummaryItem}
            LineItem={Step3?.LineItem}
          />
        )}
      </View>
      <AlertModal
        isVisible={isShowDiscardModal}
        isShowClose={false}
        leftIcon={<Danger2Icon color={'#FFA500'} size={17} />}
        title={i18n?.t('create_invoice_component.lbl_confirmation') ?? 'Confirmation'}
        onClose={toggleShowDiscardModal}
        message={
          i18n?.t('create_invoice_component.msg_confirm_discard_data') ??
          'Are you sure you want to quit? all your changes will be discarded.'
        }
        confirmTitle={i18n?.t('create_invoice_component.btn_yes') ?? 'Yes'}
        cancelTitle={i18n?.t('create_invoice_component.btn_no') ?? 'No'}
        onCancel={toggleShowDiscardModal}
        onConfirmed={() => {
          toggleShowDiscardModal();
          clearData();
          onGoBack();
        }}
      />
      <LoadingModal shouldShow={isLoadingInvoiceDetail} />
    </>
  );
});

export default CreateInvoiceComponent;
