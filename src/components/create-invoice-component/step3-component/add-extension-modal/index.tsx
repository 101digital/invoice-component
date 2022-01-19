import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  AlertModal,
  getAmountRawValue,
  InputField,
  ThemeContext,
  useCurrencyOption,
} from 'react-native-theme-component';
import { AddExtensionModalProps, AddExtensionModalStyles } from './types';
import useMergeStyles from './theme';
import { Formik, FormikProps } from 'formik';
import { AddExtensionData, AddFixedScheme, AddPercentageScheme } from './model';
import { AddDeduct, DiscountType } from '../../../../types';

const AddExtensionModal = (props: AddExtensionModalProps) => {
  const {
    isVisible,
    onClose,
    title,
    style,
    activeBorderColor,
    currencyCode,
    maxAmount,
    onSubmit,
    type,
    initData,
  } = props;
  const { i18n } = useContext(ThemeContext);
  const styles: AddExtensionModalStyles = useMergeStyles(style);
  const _activeBorderColor = activeBorderColor ?? '#E6E6E6';
  const [activeType, setActiveType] = useState<number>(0);
  const currencyOption = useCurrencyOption(currencyCode, true, false);
  const formikRef: any = useRef(null);

  useEffect(() => {
    if (initData) {
      setActiveType(initData.type === DiscountType.Percentage ? 0 : 1);
    }
  }, [initData]);

  useEffect(() => {
    formikRef?.current?.setFieldError('value', undefined);
  }, [activeType]);

  const handleSubmit = ({ value }: AddExtensionData) => {
    onSubmit(
      value
        ? {
            addDeduct: type === 'tax' ? AddDeduct.add : AddDeduct.deduct,
            value: activeType === 0 ? parseFloat(value) : getAmountRawValue(value, currencyOption),
            type: activeType === 0 ? DiscountType.Percentage : DiscountType.Fixed,
            name: type,
          }
        : undefined
    );
  };

  const getInitValue = () => {
    if (!initData?.value) {
      return undefined;
    }
    return activeType === 0
      ? initData.value.toString()
      : parseFloat(initData.value.toString()).toFixed(2);
  };

  const renderForm = (_: FormikProps<AddExtensionData>) => {
    const plh =
      type === 'discount'
        ? i18n?.t('create_invoice_component.plh_enter_discount') ?? 'Enter discount (%)'
        : i18n?.t('create_invoice_component.plh_enter_tax') ?? 'Enter tax (%)';
    return (
      <View style={styles.inputValueContainerStyle}>
        <InputField
          type={activeType === 0 ? 'custom' : 'money'}
          name={'value'}
          keyboardType={activeType === 0 ? 'numeric' : 'number-pad'}
          returnKeyType="done"
          activeBorderColor={_activeBorderColor}
          placeholder={activeType === 0 ? plh : currencyCode}
          formatError={(e) => i18n?.t(e)}
          textAlignVertical="center"
          options={activeType === 0 ? undefined : currencyOption}
        />
      </View>
    );
  };

  return (
    <AlertModal
      isVisible={isVisible}
      title={title}
      onClose={onClose}
      onCancel={onClose}
      isShowLeftIcon={false}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        containerStyle: styles.containerStyle,
        titleTextStyle: styles.headerTitleStyle,
        cancelButtonStyle: styles.cancelButtonStyle,
        confirmButtonStyle: styles.confirmButtonStyle,
        headerStyle: styles.headerStyle,
        closeButtonStyle: styles.closeButtonStyle,
      }}
      cancelTitle={i18n?.t('create_invoice_component.btn_cancel') ?? 'Cancel'}
      confirmTitle={
        type === 'discount'
          ? i18n?.t('create_invoice_component.btn_add_discount') ?? 'OK'
          : i18n?.t('create_invoice_component.btn_add_tax') ?? 'OK'
      }
      avoidKeyboard
      onConfirmed={() => {
        formikRef?.current?.submitForm();
      }}
    >
      <View style={styles.typeContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={
            activeType === 0 ? styles.activeTypeContainerStyle : styles.inActiveTypeContainerStyle
          }
          onPress={() => {
            if (activeType === 1) {
              setActiveType(0);
            }
          }}
        >
          <Text
            style={activeType === 0 ? styles.activeTypeTextStyle : styles.inActiveTypeTextStyle}
          >
            {i18n?.t('create_invoice_component.lbl_percentage') ?? 'Percentage'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={
            activeType === 1 ? styles.activeTypeContainerStyle : styles.inActiveTypeContainerStyle
          }
          onPress={() => {
            if (activeType === 0) {
              setActiveType(1);
            }
          }}
        >
          <Text
            style={activeType === 1 ? styles.activeTypeTextStyle : styles.inActiveTypeTextStyle}
          >
            {i18n?.t('create_invoice_component.lbl_fixed_value') ?? 'Fixed value'}
          </Text>
        </TouchableOpacity>
      </View>

      <Formik
        innerRef={formikRef}
        initialValues={AddExtensionData.init(getInitValue())}
        validationSchema={
          activeType === 0
            ? AddPercentageScheme(type === 'discount')
            : AddFixedScheme(maxAmount, currencyOption, type === 'discount')
        }
        onSubmit={handleSubmit}
      >
        {renderForm}
      </Formik>
    </AlertModal>
  );
};

export default AddExtensionModal;
