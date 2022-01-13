import useMergeStyles from './theme';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SectionList, Text, View } from 'react-native';
import { InvoiceContext } from '../../../context/invoice-context';
import { InvoicePageComponentProps, InvoicePageComponentStyles } from './types';
import InvoiceItemShimmerComponent from '../../item-shimmer-component';
import EmptyInvoicesComponent from '../empty-invoice-component';
import ItemInvoiceComponent from '../../invoice-item-component';
import { AlertModal, ThemeContext } from 'react-native-theme-component';
import { isCloseToBottom } from '../../../utils/helper';
import { Invoice } from '../../../types';
import InvoiceActionSheet from '../../invoice-action-sheet';
import ErrorLoadInvoiceComponent from '../error-load-invoice-component';
import moment from 'moment';

const InvoicePageComponent = (props: InvoicePageComponentProps) => {
  const {
    status,
    params,
    style,
    indicatorColor,
    sectionDateFormat,
    onCreateInvoice,
    EmptyInvoice,
    InvoiceItemShimmer,
    InvoiceItem,
    onInvoiceDetail,
    onChaseInvoice,
    onShareInvoice,
    ErrorInvoice,
    ActionSheet,
  } = props;
  const { getInvoices, refreshInvoices, getInvoiceDataByStatus, deleteInvoice } =
    useContext(InvoiceContext);
  let _invoiceData = getInvoiceDataByStatus(status);
  const styles: InvoicePageComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const _dateFormat = sectionDateFormat ?? 'MMM YYYY';
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>(undefined);
  const [isConfirmDelete, setConfirmDelete] = useState(false);

  const toggleConfirmDelete = () => {
    if (isConfirmDelete) {
      setSelectedInvoice(undefined);
    }
    setConfirmDelete(!isConfirmDelete);
  };

  const _deleteInvoice = () => {
    if (selectedInvoice) {
      deleteInvoice(selectedInvoice.invoiceId, selectedInvoice.status[0].key);
      toggleConfirmDelete();
    }
  };

  useEffect(() => {
    if (!_invoiceData.paging && isEmpty(_invoiceData.data) && !_invoiceData.isLoading) {
      setTimeout(() => {
        fetchInvoices(1);
      }, 50);
    }
  }, [status, params]);

  useEffect(() => {
    if (params) {
      fetchInvoices(1);
    }
  }, [params]);

  const fetchInvoices = (pageNum: number) => {
    getInvoices({
      ...params,
      status,
      pageNum,
    });
  };

  const loadMoreInvoices = () => {
    if (_invoiceData.paging) {
      const { pageNumber, totalRecords, pageSize } = _invoiceData.paging;
      if (!_invoiceData.isLoading && pageNumber * pageSize < totalRecords) {
        fetchInvoices(pageNumber + 1);
      }
    }
  };

  if (!_invoiceData.isLoading && _invoiceData.error) {
    return <ErrorLoadInvoiceComponent status={status} {...ErrorInvoice} />;
  }

  if (!_invoiceData.paging || (_invoiceData.isLoading && isEmpty(_invoiceData.data))) {
    return (
      <FlatList
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={() => <InvoiceItemShimmerComponent {...InvoiceItemShimmer} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
      />
    );
  }

  if (isEmpty(_invoiceData.data)) {
    return (
      <EmptyInvoicesComponent
        {...EmptyInvoice}
        params={params}
        status={status}
        onCreateInvoice={onCreateInvoice}
      />
    );
  }

  return (
    <>
      <View style={styles.containerStyle}>
        <SectionList
          keyExtractor={(item) => item.invoiceId.toString()}
          sections={_invoiceData.groupedData}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={20}
          renderItem={({ item }) => (
            <ItemInvoiceComponent
              invoice={item}
              onPressed={() => {
                onInvoiceDetail(item.invoiceId);
              }}
              onMoreAction={() => {
                setSelectedInvoice(item);
              }}
              {...InvoiceItem?.props}
              style={InvoiceItem?.style}
            />
          )}
          renderSectionHeader={({ section: { date } }) => (
            <View style={styles.sectionContainerStyle}>
              <Text style={styles.sectionTextStyle}>{moment(date).format(_dateFormat)}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
          ListFooterComponent={() =>
            _invoiceData.isLoading ? (
              <View style={styles.loadMoreIndicatorStyle}>
                <ActivityIndicator color={indicatorColor ?? colors.primaryColor} />
              </View>
            ) : (
              <View />
            )
          }
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              loadMoreInvoices();
            }
          }}
          scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={_invoiceData.isRefreshing}
              onRefresh={() => {
                refreshInvoices({
                  ...params,
                  status,
                });
              }}
              tintColor={indicatorColor ?? colors.primaryColor}
            />
          }
        />
      </View>
      <InvoiceActionSheet
        isVisible={selectedInvoice !== undefined && !isConfirmDelete}
        status={selectedInvoice?.status[0].key ?? ''}
        subStatus={selectedInvoice?.subStatus}
        onShareInvoice={() => {
          if (selectedInvoice) {
            onShareInvoice(selectedInvoice);
          }
          setSelectedInvoice(undefined);
        }}
        onEditInvoice={() => {
          setSelectedInvoice(undefined);
        }}
        onDeleteInvoice={toggleConfirmDelete}
        onClose={() => {
          setSelectedInvoice(undefined);
        }}
        onChaseInvoice={() => {
          if (selectedInvoice) {
            onChaseInvoice(selectedInvoice);
          }
          setSelectedInvoice(undefined);
        }}
        style={ActionSheet?.style}
        {...ActionSheet?.props}
      />
      <AlertModal
        isVisible={isConfirmDelete}
        title={i18n?.t('invoice_component.lbl_delete_invoice') ?? 'Delete invoice'}
        cancelTitle={i18n?.t('invoice_component.btn_cancel') ?? 'Cancel'}
        confirmTitle={i18n?.t('invoice_component.btn_delete') ?? 'Delete'}
        onClose={toggleConfirmDelete}
        onCancel={toggleConfirmDelete}
        message={
          i18n?.t('invoice_component.msg_confirm_delete_invoice') ??
          'Are you sure? once deleted, you cannot undo this action.'
        }
        isShowClose={false}
        onConfirmed={() => {
          _deleteInvoice();
        }}
        style={
          style?.confirmAlertModalStyle ?? {
            cancelButtonStyle: {
              secondaryContainerStyle: {
                backgroundColor: 'white',
                flex: 1,
              },
            },
          }
        }
        timeOut
        timeLimit={500}
      />
    </>
  );
};

export default InvoicePageComponent;
