import React, { useContext, useRef } from 'react';
import { AddReferenceModalProps, AddReferenceModalStyles } from './types';
import useMergeStyles from './theme';
import { AlertModal, InputField, ThemeContext } from 'react-native-theme-component';
import { Formik, FormikProps } from 'formik';
import { AddReferenceData } from './model';
import { View } from 'react-native';

const AddReferenceModal = (props: AddReferenceModalProps) => {
  const { style, isVisible, onClose, activeBorderColor, referenceNumber, onSubmit } = props;
  const styles: AddReferenceModalStyles = useMergeStyles(style);
  const formikRef: any = useRef(null);
  const _activeBorderColor = activeBorderColor ?? '#E6E6E6';
  const { i18n } = useContext(ThemeContext);

  const handleSubmit = (values: AddReferenceData) => {
    onSubmit(values.reference);
  };

  const renderForm = (_: FormikProps<AddReferenceData>) => {
    return (
      <View style={styles.inputValueContainerStyle}>
        <InputField
          name={'reference'}
          returnKeyType="done"
          activeBorderColor={_activeBorderColor}
          placeholder={
            i18n?.t('create_invoice_component.plh_enter_reference') ?? 'Enter reference number'
          }
          textAlignVertical="center"
        />
      </View>
    );
  };

  return (
    <AlertModal
      isVisible={isVisible}
      title={i18n?.t('create_invoice_component.lbl_add_reference') ?? 'Add reference number'}
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
      confirmTitle={i18n?.t('create_invoice_component.btn_add_reference') ?? 'OK'}
      avoidKeyboard
      onConfirmed={() => {
        formikRef?.current?.submitForm();
      }}
    >
      <Formik
        innerRef={formikRef}
        initialValues={AddReferenceData.init(referenceNumber)}
        onSubmit={handleSubmit}
      >
        {renderForm}
      </Formik>
    </AlertModal>
  );
};

export default AddReferenceModal;
