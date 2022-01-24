import useMergeStyles from './theme';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EmptyInvoicesProps, EmptyInvoicesStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyInvoiceIcon, PlusIcon } from '../../../assets';
import { InvoiceContext } from '../../../context/invoice-context';
import { useKeyboard } from '../../../utils/keyboard';
import { InvoiceStatusType } from '../../../types';

const EmptyInvoicesComponent = (props: EmptyInvoicesProps) => {
  const { style, onCreateInvoice, noInvoiceIcon, plusIcon, indicatorColor, status, params } = props;
  const styles: EmptyInvoicesStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const { getInvoiceDataByStatus, refreshInvoices } = useContext(InvoiceContext);
  const _invoiceData = getInvoiceDataByStatus(status);
  const [isSearch] = useState(status === InvoiceStatusType.search);
  const keyboardHeight = useKeyboard();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(keyboardHeight[0]);
  }, [keyboardHeight]);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={_invoiceData.isRefreshing}
            onRefresh={() => {
              refreshInvoices({
                status,
                ...params,
              });
            }}
            tintColor={indicatorColor ?? colors.primaryColor}
          />
        }
      >
        <View style={styles.contentContainerStyle}>
          {noInvoiceIcon ?? <EmptyInvoiceIcon size={96} />}
          <Text style={styles.titleTextStyle}>
            {isSearch
              ? i18n?.t('invoice_search_component.lbl_no_results') ?? 'No results'
              : i18n?.t('invoice_list_component.lbl_no_invoices') ?? 'No invoices'}
          </Text>
          {!isSearch && (
            <Text style={styles.messageTextStyle}>
              {i18n?.t('invoice_list_component.msg_no_invoices') ??
                'Use the Create invoice button to create an invoice'}
            </Text>
          )}
          {!isSearch && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCreateInvoice}
              style={styles.createButtonContainerStyle}
            >
              {plusIcon ?? <PlusIcon size={20} color={'#ffffff'} />}
              <Text style={styles.createButtonTextStyle}>
                {i18n?.t('invoice_list_component.btn_create_invoice') ?? 'Create invoice'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={{ height: height / 2 }} />
    </>
  );
};

export default EmptyInvoicesComponent;
