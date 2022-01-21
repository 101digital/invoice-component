import React, { useContext, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  BottomSheet,
  getAmountRawValue,
  InputField,
  ThemeContext,
  useCurrencyFormat,
  useCurrencyOption,
} from 'react-native-theme-component';
import { isIphoneX } from '../../../../utils/helper';
import { AddInvoiceModalComponentProps, AddInvoiceModalComponentStyles } from './types';
import useMergeStyles from './theme';
import { CloseIcon, MinusIcon, Plus2Icon } from '../../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FooterComponent from '../../footer-component';
import { Formik, FormikProps } from 'formik';
import { CreateInvoiceItemData, CreateInvoiceItemSchema } from './model';
import { isEmpty, uniqueId } from 'lodash';
import { InvoiceService } from '../../../../service/invoice-service';

const AddInvoiceModalComponent = (props: AddInvoiceModalComponentProps) => {
  const {
    topSpacer,
    style,
    isVisible,
    onClose,
    closeIcon,
    currencyCode,
    activeBorderColor,
    minusIcon,
    plusIcon,
    onSubmit,
    initData,
  } = props;
  const _spaceTop = topSpacer ?? (isIphoneX() ? 60 : 50);
  const styles: AddInvoiceModalComponentStyles = useMergeStyles(style);
  const { maxCreateAmount, minAmount } = InvoiceService.instance().getMaxMinAmount();
  const formikRef: any = useRef(null);
  const currencyOption = useCurrencyOption(currencyCode, true, false);
  const { i18n } = useContext(ThemeContext);
  const _activeBorderColor = activeBorderColor ?? '#E6E6E6';

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, [isVisible]);

  const handleQuantityNumber = (text: string) => {
    const sanitizedNumber = text === '0' || text === '' ? '1' : parseInt(text, 10).toString();
    formikRef?.current?.setFieldValue('quantity', sanitizedNumber);
  };

  const handleSubmit = (values: CreateInvoiceItemData) => {
    const { itemName, itemUOM, amount, quantity } = values;
    if (itemName && amount) {
      const itemData = {
        id: initData?.id || uniqueId(),
        itemName,
        amount: getAmountRawValue(amount, currencyOption),
        quantity: parseInt(quantity, 10),
        itemUOM,
      };
      onSubmit(itemData);
    }
  };

  const renderForm = (formProps: FormikProps<CreateInvoiceItemData>) => {
    return (
      <>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          enableAutomaticScroll={false}
          enableResetScrollToCoords={false}
          showsVerticalScrollIndicator={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          extraScrollHeight={-100}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Text style={styles.labelTextStyle}>
            {i18n?.t('create_invoice_component.lbl_item_name') ?? 'Item name'}
          </Text>
          <InputField
            name={'itemName'}
            activeBorderColor={_activeBorderColor}
            textAlignVertical='center'
            formatError={(e) => i18n?.t(e) ?? 'Invalid name'}
            placeholder={i18n?.t('create_invoice_component.plh_enter_name') ?? 'Enter name'}
          />
          <Text style={styles.labelTextStyle}>
            {(i18n?.t('create_invoice_component.lbl_unit_price') ?? 'Unit price (%s)').replace(
              '%s',
              currencyCode
            )}
          </Text>
          <InputField
            type={'money'}
            name={'amount'}
            keyboardType='decimal-pad'
            returnKeyType='done'
            activeBorderColor={_activeBorderColor}
            placeholder={i18n?.t('create_invoice_component.plh_enter_price') ?? 'Enter price'}
            formatError={(e) => {
              if (!i18n) {
                return 'Invalid amount';
              }
              if (e.includes('%d')) {
                const index = e.indexOf('%d');
                const key = e.substring(0, index);
                const value = e.substring(index + 2);
                return `${i18n.t(key)} ${value}`;
              }
              return i18n.t(e);
            }}
            textAlignVertical='center'
            options={currencyOption}
            maxLength={14}
          />
          <Text style={styles.labelTextStyle}>
            {i18n?.t('create_invoice_component.lbl_item_uom_optional') ?? 'Item UOM (Optional)'}
          </Text>
          <InputField
            name={'itemUOM'}
            activeBorderColor={_activeBorderColor}
            textAlignVertical='center'
            placeholder={
              i18n?.t('create_invoice_component.plh_enter_unit_measurement') ??
              'Enter the unit of measurement'
            }
          />
          <View style={styles.quantityContainerStyle}>
            <Text style={styles.labelTextStyle}>
              {i18n?.t('create_invoice_component.lbl_quantity') ?? 'Quantity'}
            </Text>
            <InputField
              name='quantity'
              keyboardType='number-pad'
              activeBorderColor={_activeBorderColor}
              onBlur={() => handleQuantityNumber(formProps.values.quantity)}
              returnKeyType='done'
              style={{
                textInputStyle: {
                  flex: 1,
                  textAlign: 'center',
                },
              }}
              prefixIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.quantityActionButtonStyle}
                  onPress={() => {
                    const _quantity = parseInt(formProps.values.quantity, 10);
                    if (_quantity > 1) {
                      formProps.setFieldValue('quantity', (_quantity - 1).toString());
                    }
                  }}
                >
                  {minusIcon ?? (
                    <MinusIcon
                      size={15}
                      color={formProps.values.quantity === '1' ? '#bfbfbf' : '#000'}
                    />
                  )}
                </TouchableOpacity>
              }
              suffixIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.quantityActionButtonStyle}
                  onPress={() => {
                    const _quantity = parseInt(formProps.values.quantity, 10);
                    formProps.setFieldValue('quantity', (_quantity + 1).toString());
                  }}
                >
                  {plusIcon ?? <Plus2Icon size={15} color='#000' />}
                </TouchableOpacity>
              }
            />
          </View>
        </KeyboardAwareScrollView>
        <FooterComponent
          amountLabel={i18n?.t('create_invoice_component.lbl_total_amount') ?? 'Total amount'}
          amountValue={
            isEmpty(formProps.values.amount)
              ? useCurrencyFormat(0, currencyCode)
              : useCurrencyFormat(
                  getAmountRawValue(formProps.values.amount, currencyOption) *
                    parseInt(formProps.values.quantity, 10),
                  currencyCode
                )
          }
          onBackPressed={onClose}
          onNextPressed={() => {
            formProps.submitForm();
          }}
          nextButtonTitle={i18n?.t('create_invoice_component.btn_add') ?? 'Add'}
          canNext={formProps.isValid}
        />
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
          {i18n?.t('create_invoice_component.lbl_add_item_modal') ?? 'Add item'}
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
        initialValues={CreateInvoiceItemData.init(
          initData?.itemName,
          initData?.amount?.toFixed(2),
          initData?.quantity?.toString(),
          initData?.itemUOM
        )}
        validationSchema={CreateInvoiceItemSchema(minAmount, maxCreateAmount, currencyOption)}
        onSubmit={handleSubmit}
      >
        {renderForm}
      </Formik>
    </BottomSheet>
  );
};

export default AddInvoiceModalComponent;
