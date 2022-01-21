import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Step1ComponentProps, Step1ComponentStyles } from './types';
import useMergeStyles from './theme';
import FooterComponent from '../footer-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, FormikProps } from 'formik';
import { CreateInvoiceStepOneData, CreateInvoiceStepOneSchema } from './model';
import { DatePicker, InputField, ThemeContext } from 'react-native-theme-component';
import { ArrowRightIcon, CalendarIcon, CloseIcon } from '../../../assets';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { InvoiceService } from '../../../service/invoice-service';

const Step1Component = (props: Step1ComponentProps) => {
  const {
    style,
    activeBorderColor,
    dateFormat,
    closeIcon,
    calendarIcon,
    arrowRightIcon,
    onSearchCustomer,
    customer,
    onNextPressed,
    minDate,
    stepOneData,
    onEdited,
    onCancel,
    Footer,
  } = props;
  const styles: Step1ComponentStyles = useMergeStyles(style);
  const formikRef: any = useRef(null);
  const { colors, i18n } = useContext(ThemeContext);
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';
  const _defaultDueDate = InvoiceService.instance().getDefaultDueDate();
  const [dueAfter, setDueAfter] = useState<number>(_defaultDueDate);
  const [isShowInvoiceDatePicker, setShowInvoiceDatePicker] = useState(false);
  const [isShowInvoiceDueDatePicker, setShowInvoiceDueDatePicker] = useState(false);
  const toggleInvoiceDatePicker = () => setShowInvoiceDatePicker(!isShowInvoiceDatePicker);
  const toggleInvoiceDueDatePicker = () => setShowInvoiceDueDatePicker(!isShowInvoiceDueDatePicker);
  const [invoiceDate, setInvoiceDate] = useState(moment().toDate());
  const [invoiceDueDate, setInvoiceDueDate] = useState(moment().add(dueAfter, 'd').toDate());
  const _activeBorderColor = activeBorderColor ?? '#E6E6E6';

  useEffect(() => {
    formikRef?.current?.setFieldValue('dueAfter', dueAfter);
  }, [dueAfter]);

  useEffect(() => {
    if (customer) {
      onEdited();
      formikRef?.current?.setFieldValue('customerName', customer.name);
      formikRef?.current?.setFieldValue('customerId', customer.id);
      if (customer.dueDatePeriod !== undefined) {
        // if customer have due date period, change due date according to this
        if (customer.dueDatePeriod >= 0) {
          setDueAfter(customer.dueDatePeriod);
          const _dueDate = moment(invoiceDate, _dateFormat).add(customer.dueDatePeriod, 'd');
          setInvoiceDueDate(_dueDate.toDate());
        }
      }
      if (!customer.dueDatePeriod) {
        setDueAfter(_defaultDueDate);
        const _dueDate = moment(invoiceDate, dateFormat).add(_defaultDueDate, 'd');
        setInvoiceDueDate(_dueDate.toDate());
      }
    }
  }, [customer]);

  useEffect(() => {
    if (!isEmpty(stepOneData.invoiceDate)) {
      setInvoiceDate(moment(stepOneData.invoiceDate, _dateFormat).toDate());
    }
    if (!isEmpty(stepOneData.invoiceDueDate)) {
      setInvoiceDueDate(moment(stepOneData.invoiceDueDate, _dateFormat).toDate());
    }
    if (!isEmpty(stepOneData.description)) {
      formikRef?.current?.setFieldValue('description', stepOneData.description);
    }
    if (stepOneData.dueAfter && stepOneData.dueAfter >= 0) {
      setDueAfter(stepOneData.dueAfter);
    }
  }, [stepOneData]);

  const _updateInvoiceDate = (date: Date | undefined) => {
    onEdited();
    toggleInvoiceDatePicker();
    if (date) {
      setInvoiceDate(date);
      // only change due date if invoice date is after due date
      if (moment.utc(date, _dateFormat).isAfter(moment.utc(invoiceDueDate, _dateFormat))) {
        const _dueDate = moment(date, _dateFormat).add(dueAfter, 'd');
        setInvoiceDueDate(_dueDate.toDate());
      }
    }
  };

  const _updateInvoiceDueDate = (date: Date | undefined) => {
    onEdited();
    toggleInvoiceDueDatePicker();
    if (date) {
      setInvoiceDueDate(date);
    }
  };

  const handleSubmit = (values: CreateInvoiceStepOneData) => {
    const { description, customerId, customerName } = values;
    onEdited();
    onNextPressed(
      new CreateInvoiceStepOneData(
        description,
        customerName,
        customerId,
        moment(invoiceDate).format(_dateFormat),
        moment(invoiceDueDate).format(_dateFormat),
        dueAfter
      )
    );
  };

  const renderForm = (formikProps: FormikProps<CreateInvoiceStepOneData>) => {
    return (
      <>
        <Text style={styles.labelTextStyle}>
          {i18n?.t('create_invoice_component.lbl_customer_optional') ?? 'Customer (Optional)'}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (isEmpty(formikProps.values.customerName)) {
              onSearchCustomer();
            } else {
              formikProps.setFieldValue('customerName', '');
              formikProps.setFieldValue('customerId', '');
            }
          }}
        >
          <InputField
            name={'customerName'}
            activeBorderColor={_activeBorderColor}
            placeholder={
              i18n?.t('create_invoice_component.plh_search_customer') ?? 'Search customer'
            }
            textAlignVertical="center"
            editable={false}
            pointerEvents="none"
            suffixIcon={
              <View style={styles.suffixIconContainerStyle}>
                {isEmpty(formikProps.values.customerName)
                  ? arrowRightIcon ?? <ArrowRightIcon size={12} color={colors.primaryColor} />
                  : closeIcon ?? <CloseIcon size={12} color={colors.primaryColor} />}
              </View>
            }
          />
        </TouchableOpacity>
        <View style={styles.datesContainerStyle}>
          <View style={styles.dateItemContainerStyle}>
            <Text style={styles.labelTextStyle}>
              {i18n?.t('create_invoice_component.lbl_invoice_date') ?? 'Invoice date'}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleInvoiceDatePicker}>
              <InputField
                name="invoiceDate"
                value={moment(invoiceDate).format(_dateFormat)}
                activeBorderColor={_activeBorderColor}
                textAlignVertical="center"
                editable={false}
                pointerEvents="none"
                suffixIcon={
                  <View style={styles.suffixIconContainerStyle}>
                    {calendarIcon ?? <CalendarIcon size={19} color={colors.primaryColor} />}
                  </View>
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ width: StyleSheet.flatten(styles.contentContainerStyle).paddingHorizontal }}
          />
          <View style={styles.dateItemContainerStyle}>
            <Text style={styles.labelTextStyle}>
              {i18n?.t('create_invoice_component.lbl_due_date') ?? 'Due date'}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleInvoiceDueDatePicker}>
              <InputField
                name="invoiceDueDate"
                value={moment(invoiceDueDate).format(_dateFormat)}
                activeBorderColor={_activeBorderColor}
                textAlignVertical="center"
                editable={false}
                pointerEvents="none"
                suffixIcon={
                  <View style={styles.suffixIconContainerStyle}>
                    {calendarIcon ?? <CalendarIcon size={19} color={colors.primaryColor} />}
                  </View>
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.labelTextStyle}>
          {i18n?.t('create_invoice_component.lbl_description') ?? 'Description'}
        </Text>
        <InputField
          name={'description'}
          activeBorderColor={_activeBorderColor}
          placeholder={
            i18n?.t('create_invoice_component.plh_enter_description') ?? 'Enter description'
          }
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={250}
          style={{
            inputContainerStyle: styles.descriptionContainerStyle,
            textInputStyle: {
              height: '100%',
            },
          }}
          onChangeText={(value) => {
            onEdited();
            formikProps.setFieldValue('description', value);
          }}
        />
      </>
    );
  };

  return (
    <>
      <View style={styles.containerStyle}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          style={styles.contentContainerStyle}
          enableOnAndroid
        >
          <Formik
            innerRef={formikRef}
            initialValues={stepOneData}
            validationSchema={CreateInvoiceStepOneSchema}
            onSubmit={handleSubmit}
          >
            {renderForm}
          </Formik>
        </KeyboardAwareScrollView>
        <FooterComponent
          canNext
          onBackPressed={onCancel}
          onNextPressed={() => {
            formikRef?.current?.submitForm();
          }}
          style={Footer?.style}
        />
      </View>
      <DatePicker
        isVisible={isShowInvoiceDatePicker}
        onClose={toggleInvoiceDatePicker}
        onChange={_updateInvoiceDate}
        title={i18n?.t('create_invoice_component.lbl_invoice_date') ?? 'Invoice date'}
        minDate={minDate ?? moment().subtract(2, 'year').toDate()}
        pickedDate={invoiceDate}
      />
      <DatePicker
        isVisible={isShowInvoiceDueDatePicker}
        onClose={toggleInvoiceDueDatePicker}
        onChange={_updateInvoiceDueDate}
        title={i18n?.t('create_invoice_component.lbl_due_date') ?? 'Due date'}
        minDate={invoiceDate}
        pickedDate={invoiceDueDate}
      />
    </>
  );
};

export default Step1Component;
