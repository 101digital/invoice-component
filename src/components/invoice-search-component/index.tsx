import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { InvoiceSearchComponentProps, InvoiceSearchComponentStyles } from './types';
import useMergeStyles from './theme';
import SearchHeaderComponent from './search-header-component';
import InvoicePageComponent from '../invoice-list-component/invoice-page-component';
import { Invoice, InvoiceParam, InvoiceStatusType } from '../../types';
import { InvoiceContext } from '../../context/invoice-context';
import { formatCurrency, showMessage, ThemeContext } from 'react-native-theme-component';
import { showChaseInvoice, showShareInvoice } from '../../utils/helper';

const InvoiceSearchComponent = (props: InvoiceSearchComponentProps) => {
  const {
    style,
    onBackPressed,
    onInvoiceDetail,
    currencyCode,
    SearchBox,
    FilterBar,
    FilterModal,
    EmptyInvoice,
    InvoiceItem,
    InvoiceItemShimmer,
    ErrorInvoice,
    onEditInvoice,
  } = props;
  const styles: InvoiceSearchComponentStyles = useMergeStyles(style);
  const {
    clearSearchInvoices,
    deletedInvoiceSuccess,
    refreshInvoices,
    isLoadingShareLink,
    getShareLink,
    shareLink,
    clearShareLink,
    isUpdatedSubStatusSuccess,
    isAddedPaymentSuccess,
    isUpdatedInvoiceSuccess,
  } = useContext(InvoiceContext);
  const { i18n, currencies } = useContext(ThemeContext);
  const [params, setParams] = useState<InvoiceParam>({ keyword: '' });

  useEffect(() => {
    if (deletedInvoiceSuccess) {
      refreshInvoices({ ...params, status: InvoiceStatusType.search });
      showMessage({
        message: i18n?.t(
          'invoice_list_component.msg_invoice_delete_success' ?? 'Invoice deleted successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [deletedInvoiceSuccess]);

  useEffect(() => {
    if (isAddedPaymentSuccess || isUpdatedSubStatusSuccess || isUpdatedInvoiceSuccess) {
      refreshInvoices({ ...params, status: InvoiceStatusType.search });
    }
  }, [isAddedPaymentSuccess, isUpdatedSubStatusSuccess, isUpdatedInvoiceSuccess]);

  useEffect(() => {
    return () => {
      clearSearchInvoices();
    };
  }, []);

  useEffect(() => {
    if (shareLink && shareLink.showFrom === 'invoice-search-component') {
      if (shareLink.isChase) {
        showChaseInvoice(
          shareLink,
          clearShareLink,
          (amount, code) => formatCurrency(currencies, amount, code),
          undefined,
          i18n
        );
      } else {
        showShareInvoice(shareLink, clearShareLink, undefined, i18n);
      }
    }
  }, [shareLink]);

  const shareInvoice = async (invoice: Invoice) => {
    if (!isLoadingShareLink) {
      getShareLink(invoice, false, 'invoice-search-component');
    }
  };

  const chaseInvoice = async (invoice: Invoice) => {
    if (!isLoadingShareLink) {
      getShareLink(invoice, true, 'invoice-search-component');
    }
  };

  return (
    <View style={styles.containerStyle}>
      <SearchHeaderComponent
        params={params}
        currencyCode={currencyCode}
        onBackPressed={onBackPressed}
        onSearch={setParams}
        style={SearchBox?.style}
        {...SearchBox?.props}
        FilterBar={FilterBar}
        FilterModal={FilterModal}
      />
      <InvoicePageComponent
        params={params}
        status={InvoiceStatusType.search}
        onInvoiceDetail={onInvoiceDetail}
        onCreateInvoice={() => {}}
        onShareInvoice={shareInvoice}
        onChaseInvoice={chaseInvoice}
        EmptyInvoice={EmptyInvoice}
        InvoiceItem={InvoiceItem}
        InvoiceItemShimmer={InvoiceItemShimmer}
        ErrorInvoice={ErrorInvoice}
        onEditInvoice={onEditInvoice}
      />
    </View>
  );
};

export default InvoiceSearchComponent;
