import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AddPaymentComponentProps, AddPaymentComponentStyles } from './types';
import useMergeStyles from './theme';
import {
  BottomSheet,
  Button,
  DatePicker,
  getAmountRawValue,
  InputField,
  ThemeContext,
  useCurrencyOption,
} from 'react-native-theme-component';
import { ArrowDownIcon, CalendarIcon, CloseIcon } from '../../../assets';
import { isIphoneX } from '../../../utils/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, FormikProps } from 'formik';
import { AddPaymentData, AddPaymentSchema } from './model';
import { InvoiceService } from '../../../service/invoice-service';
import moment from 'moment';
import { InvoiceContext } from '../../../context/invoice-context';

const AddPaymentComponent = (props: AddPaymentComponentProps) => {
  const {
    style,
    isVisible,
    onClose,
    topSpacer,
    invoice,
    paymentData,
    activeBorderColor,
    dateFormat,
    arrowDownIcon,
    calendarIcon,
    closeIcon,
  } = props;
  const styles: AddPaymentComponentStyles = useMergeStyles(style);
  const _spaceTop = topSpacer ?? (isIphoneX() ? 60 : 50);
  const formikRef: any = useRef(null);
  const _paymentTypes = InvoiceService.instance().getPaymentTypes();
  const { i18n, colors } = useContext(ThemeContext);
  const {
    addPayment,
    isAddingPayment,
    updatePayment,
    isUpdatingPayment,
    isAddedPaymentSuccess,
    isUpdatedPaymentSuccess,
    isDeletedPaymentSuccess,
  } = useContext(InvoiceContext);
  const currencyOption = useCurrencyOption(invoice?.currency ?? 'USD', true, false);
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';
  const _maxAmount = parseFloat(invoice?.balanceAmount.toFixed(2));
  const [isShowDatePicker, setShowDatePicker] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [paymentTypePosY, setPaymentTypePosY] = useState(0);
  const [isShowPaymentType, setShowPaymentType] = useState(false);
  const _activeBorderColor = activeBorderColor ?? '#E6E6E6';

  useEffect(() => {
    if (isAddedPaymentSuccess || isUpdatedPaymentSuccess || isDeletedPaymentSuccess) {
      onClose();
    }
  }, [isAddedPaymentSuccess, isUpdatedPaymentSuccess, isDeletedPaymentSuccess]);

  useEffect(() => {
    return () => {
      setShowPaymentType(false);
      setShowDatePicker(false);
    };
  }, [isVisible]);

  useEffect(() => {
    if (paymentData) {
      setTransactionDate(moment(paymentData.transactionDate).toDate());
    }
  }, [paymentData]);

  const toggleDatePicker = () => setShowDatePicker(!isShowDatePicker);
  const togglePaymentType = () => setShowPaymentType(!isShowPaymentType);

  const handleSubmit = (values: AddPaymentData) => {
    const { amount, paymentType, reference, transactionDate } = values;
    const paymentAmount = getAmountRawValue(amount.toString(), currencyOption);
    if (paymentData) {
      updatePayment(paymentData.paymentId, {
        invoiceId: invoice.invoiceId,
        amount: paymentAmount,
        currency: invoice.currency,
        description: paymentData.description,
        provider: paymentType,
        providerReference: paymentData.providerReference,
        reconciled: true,
        reference,
        status: 'Authorised',
        transactionDate: moment(transactionDate, dateFormat).format(),
      });
    } else {
      addPayment({
        invoiceId: invoice.invoiceId,
        amount: paymentAmount,
        currency: invoice.currency,
        description: '',
        provider: paymentType,
        providerReference: '',
        reconciled: true,
        reference,
        status: 'Authorised',
        transactionDate: moment(transactionDate, dateFormat).format(),
      });
    }
  };

  const renderForm = (formProps: FormikProps<AddPaymentData>) => {
    return (
      <>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          style={styles.contentContainerStyle}
          enableOnAndroid
          scrollEnabled={!isShowPaymentType}
          extraScrollHeight={-100}
        >
          <Text style={styles.labelTextStyle}>
            {i18n?.t('invoice_payment_component.lbl_payment_types') ?? 'Payment type'}
          </Text>
          <TouchableOpacity activeOpacity={1} onPress={togglePaymentType}>
            <InputField
              name={'paymentType'}
              activeBorderColor={_activeBorderColor}
              editable={false}
              pointerEvents="none"
              textAlignVertical="center"
              suffixIcon={
                <View style={styles.suffixIconStyle}>
                  {arrowDownIcon ?? <ArrowDownIcon size={15} color={colors.primaryColor} />}
                </View>
              }
            />
          </TouchableOpacity>
          <View
            onLayout={(event) => {
              if (paymentTypePosY === 0) {
                const layout = event.nativeEvent.layout;
                setPaymentTypePosY(layout?.y + layout.height);
              }
            }}
          />
          {isShowPaymentType && (
            <View style={[styles.paymentTypeContainerStyle, { top: paymentTypePosY }]}>
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {_paymentTypes.map((item) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.value}
                    style={styles.paymentTypeItemContainerStyle}
                    onPress={() => {
                      formProps.setFieldValue('paymentType', item.value);
                      togglePaymentType();
                    }}
                  >
                    <Text style={styles.paymentTypeItemTextStyle}>{item.value}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <View
            onTouchStart={() => {
              setShowPaymentType(false);
            }}
          >
            <Text style={styles.labelTextStyle}>
              {i18n?.t('invoice_payment_component.lbl_amount') ?? 'Amount'}
            </Text>
            <InputField
              type={'money'}
              name={'amount'}
              keyboardType="decimal-pad"
              returnKeyType="done"
              activeBorderColor={_activeBorderColor}
              placeholder={i18n?.t('invoice_payment_component.plh_enter_amount') ?? 'Enter amount'}
              formatError={(e) => i18n?.t(e)?.replace('%s', _maxAmount) ?? 'Invalid amount'}
              textAlignVertical="center"
              options={currencyOption}
              maxLength={15}
            />
            <Text style={styles.labelTextStyle}>
              {i18n?.t('invoice_payment_component.lbl_transaction_date') ?? 'Transaction date'}
            </Text>
            <TouchableOpacity activeOpacity={1} onPress={toggleDatePicker}>
              <InputField
                name="transactionDate"
                activeBorderColor={_activeBorderColor}
                formatError={(e) => i18n?.t(e)}
                textAlignVertical="center"
                editable={false}
                pointerEvents="none"
                suffixIcon={
                  <View style={styles.suffixIconStyle}>
                    {calendarIcon ?? <CalendarIcon color={colors.primaryColor} />}
                  </View>
                }
              />
            </TouchableOpacity>
            <Text style={styles.labelTextStyle}>
              {i18n?.t('invoice_payment_component.lbl_reference_optional') ??
                'Reference (Optional)'}
            </Text>
            <InputField
              name="reference"
              activeBorderColor={_activeBorderColor}
              placeholder={
                i18n?.t('invoice_payment_component.plh_enter_reference') ?? 'Enter reference'
              }
              formatError={(e) => i18n?.t(e)}
              textAlignVertical="center"
            />
          </View>
          <View
            style={{ height: 400 }}
            onTouchStart={() => {
              setShowPaymentType(false);
            }}
          />
        </KeyboardAwareScrollView>
        <View
          style={styles.footerContainerStyle}
          onTouchStart={() => {
            setShowPaymentType(false);
          }}
        >
          <Button
            onPress={onClose}
            label={i18n?.t('invoice_payment_component.btn_cancel') ?? 'Cancel'}
            variant="secondary"
            style={
              style?.cancelButtonStyle ?? {
                secondaryContainerStyle: {
                  flex: 1,
                  marginRight: 7.5,
                },
              }
            }
          />
          <Button
            isLoading={isAddingPayment || isUpdatingPayment}
            disabled={!formProps.isValid}
            onPress={() => {
              formProps.submitForm();
            }}
            label={i18n?.t('invoice_payment_component.btn_save') ?? 'Save'}
            style={
              style?.saveButtonStyle ?? {
                primaryContainerStyle: {
                  flex: 1,
                  marginLeft: 7.5,
                },
              }
            }
          />
        </View>
      </>
    );
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        containerStyle: {
          flex: 1,
          marginTop: _spaceTop,
        },
        contentContainerStyle: {
          paddingTop: 0,
          paddingHorizontal: 0,
          paddingBottom: 0,
          flex: 1,
        },
      }}
    >
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleStyle}>
          {paymentData
            ? i18n?.t('invoice_payment_component.lbl_edit_payment') ?? 'Edit payment'
            : i18n?.t('invoice_payment_component.lbl_add_payment') ?? 'Add payment'}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.closeButtonContainerStyle}
        >
          {closeIcon ?? <CloseIcon size={15} />}
        </TouchableOpacity>
      </View>

      <Formik
        innerRef={formikRef}
        initialValues={AddPaymentData.default(
          paymentData ? paymentData.provider : _paymentTypes[0].value,
          paymentData ? paymentData.amount.toFixed(2) : _maxAmount,
          paymentData?.reference,
          paymentData
            ? moment(paymentData.transactionDate).format(_dateFormat)
            : moment().format(_dateFormat)
        )}
        validationSchema={() => AddPaymentSchema(_maxAmount + 0.01, currencyOption)}
        onSubmit={handleSubmit}
      >
        {renderForm}
      </Formik>

      <DatePicker
        isVisible={isShowDatePicker}
        onClose={toggleDatePicker}
        onChange={(value) => {
          setTransactionDate(value);
          formikRef?.current.setFieldValue('transactionDate', moment(value).format(_dateFormat));
        }}
        pickedDate={transactionDate}
      />
    </BottomSheet>
  );
};

export default AddPaymentComponent;
