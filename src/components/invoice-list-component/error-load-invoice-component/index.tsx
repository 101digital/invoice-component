import useMergeStyles from './theme';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ErrorLoadInvoiceComponentProps, ErrorLoadInvoiceComponentStyles } from './types';
import { DangerIcon } from '../../../assets';
import { ThemeContext } from 'react-native-theme-component';
import { InvoiceContext } from '../../../context/invoice-context';

const ErrorLoadInvoiceComponent = (props: ErrorLoadInvoiceComponentProps) => {
  const { style, errorIcon, status } = props;
  const styles: ErrorLoadInvoiceComponentStyles = useMergeStyles(style);
  const { clearErrors, getInvoiceDataByStatus, getInvoices } = useContext(InvoiceContext);
  const _invoiceData = getInvoiceDataByStatus(status);
  const errorId = (_invoiceData.error as any)?.response?.data?.errors?.[0]?.code;
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      {errorIcon ?? <DangerIcon size={74} />}
      <Text style={styles.errorTitleStyle}>
        {i18n?.t('invoice_list_component.msg_load_invoice_error') ?? 'Error loading invoices'}
      </Text>
      {errorId && <Text style={styles.errorMessageStyle}>{`(Error: ${errorId})`}</Text>}
      <TouchableOpacity
        style={styles.retryButtonContainerStyle}
        onPress={() => {
          clearErrors();
          getInvoices({ status });
        }}
      >
        <Text style={styles.retryTextStyle}>
          {i18n?.t('invoice_list_component.btn_retry') ?? 'Try again'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorLoadInvoiceComponent;
