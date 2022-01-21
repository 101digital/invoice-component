import useMergeStyles from './theme';
import React, { useContext, useEffect, useState } from 'react';
import { InvoiceListComponentProps, InvoiceListComponentStyles } from './types';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency, showMessage, ThemeContext } from 'react-native-theme-component';
import InvoicePageComponent from './invoice-page-component';
import { Invoice, InvoiceStatusType } from '../../types';
import InvoiceItemShimmerComponent from '../item-shimmer-component';
import { TabBar, TabView } from 'react-native-tab-view';
import { AddInvoiceIcon, SearchIcon } from '../../assets';
import { InvoiceContext } from '../../context/invoice-context';
import { showChaseInvoice, showShareInvoice } from '../../utils/helper';

const initialLayout = { width: Dimensions.get('window').width };

const InvoiceListComponent = (_props: InvoiceListComponentProps) => {
  const {
    style,
    activeTabColor,
    inActiveTabColor,
    searchIcon,
    onInvoiceDetail,
    onSearchInvoice,
    createInvoiceIcon,
    onCreateInvoice,
    EmptyInvoice,
    InvoiceItem,
    InvoiceItemShimmer,
    ErrorInvoice,
    ActionSheet,
    onEditInvoice,
  } = _props;
  const styles: InvoiceListComponentStyles = useMergeStyles(style);
  const { i18n, colors, currencies } = useContext(ThemeContext);
  const {
    deletedInvoiceSuccess,
    isLoadingShareLink,
    getShareLink,
    shareLink,
    clearShareLink,
    clearErrors,
  } = useContext(InvoiceContext);
  const [index, setIndex] = useState(0);
  const _activeTabColor = activeTabColor ?? colors.primaryColor;
  const _inActiveTabColor = inActiveTabColor ?? colors.primaryTextColor;
  const _routes = [
    { key: 'first', title: i18n?.t('invoice_list_component.lbl_all_invoices') ?? 'All invoices' },
    { key: 'second', title: i18n?.t('invoice_list_component.lbl_due_invoices') ?? 'Due' },
    { key: 'third', title: i18n?.t('invoice_list_component.lbl_overdue_invoices') ?? 'Overdue' },
    { key: 'fouth', title: i18n?.t('invoice_list_component.lbl_paid_invoices') ?? 'Paid' },
  ];
  const [routes] = useState(_routes);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  useEffect(() => {
    if (deletedInvoiceSuccess) {
      showMessage({
        message: i18n?.t(
          'invoice_list_component.msg_invoice_delete_success' ?? 'Invoice deleted successfully'
        ),
        backgroundColor: '#44ac44',
      });
    }
  }, [deletedInvoiceSuccess]);

  useEffect(() => {
    if (shareLink && shareLink.showFrom === 'invoice-list-component') {
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
      getShareLink(invoice, false, 'invoice-list-component');
    }
  };

  const chaseInvoice = async (invoice: Invoice) => {
    if (!isLoadingShareLink) {
      getShareLink(invoice, true, 'invoice-list-component');
    }
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return (
          <InvoicePageComponent
            onInvoiceDetail={onInvoiceDetail}
            onCreateInvoice={onCreateInvoice}
            onEditInvoice={onEditInvoice}
            onShareInvoice={shareInvoice}
            onChaseInvoice={chaseInvoice}
            EmptyInvoice={EmptyInvoice}
            InvoiceItem={InvoiceItem}
            InvoiceItemShimmer={InvoiceItemShimmer}
            ErrorInvoice={ErrorInvoice}
            ActionSheet={ActionSheet}
          />
        );
      case 'second':
        return (
          <InvoicePageComponent
            status={InvoiceStatusType.due}
            onInvoiceDetail={onInvoiceDetail}
            onCreateInvoice={onCreateInvoice}
            onEditInvoice={onEditInvoice}
            onShareInvoice={shareInvoice}
            onChaseInvoice={chaseInvoice}
            EmptyInvoice={EmptyInvoice}
            InvoiceItem={InvoiceItem}
            InvoiceItemShimmer={InvoiceItemShimmer}
            ErrorInvoice={ErrorInvoice}
            ActionSheet={ActionSheet}
          />
        );
      case 'third':
        return (
          <InvoicePageComponent
            status={InvoiceStatusType.overDue}
            onInvoiceDetail={onInvoiceDetail}
            onCreateInvoice={onCreateInvoice}
            onEditInvoice={onEditInvoice}
            onShareInvoice={shareInvoice}
            onChaseInvoice={chaseInvoice}
            EmptyInvoice={EmptyInvoice}
            InvoiceItem={InvoiceItem}
            InvoiceItemShimmer={InvoiceItemShimmer}
            ErrorInvoice={ErrorInvoice}
            ActionSheet={ActionSheet}
          />
        );
      case 'fouth':
        return (
          <InvoicePageComponent
            status={InvoiceStatusType.paid}
            onInvoiceDetail={onInvoiceDetail}
            onCreateInvoice={onCreateInvoice}
            onEditInvoice={onEditInvoice}
            onShareInvoice={shareInvoice}
            onChaseInvoice={chaseInvoice}
            EmptyInvoice={EmptyInvoice}
            InvoiceItem={InvoiceItem}
            InvoiceItemShimmer={InvoiceItemShimmer}
            ErrorInvoice={ErrorInvoice}
            ActionSheet={ActionSheet}
          />
        );
      default:
        return null;
    }
  };

  const lazyPlaceholder = () => (
    <FlatList
      keyExtractor={(item) => item.toString()}
      showsVerticalScrollIndicator={false}
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      renderItem={() => <InvoiceItemShimmerComponent {...InvoiceItemShimmer} />}
    />
  );

  return (
    <View style={styles.containerStyle}>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <View style={styles.tabViewContainerStyle}>
            <View style={styles.tabViewContentContainerStyle}>
              <TabBar
                {...props}
                tabStyle={styles.tabContainerStyle}
                pressOpacity={1}
                renderLabel={({ route, focused }) => (
                  <Text
                    style={[
                      styles.tabTextStyle,
                      { color: focused ? _activeTabColor : _inActiveTabColor },
                    ]}
                  >
                    {route.title}
                  </Text>
                )}
                indicatorStyle={{
                  backgroundColor: _activeTabColor,
                }}
                style={styles.tabBarContainerStyle}
              />
              <TouchableOpacity
                onPress={onSearchInvoice}
                activeOpacity={0.8}
                style={styles.searchContainerStyle}
              >
                {searchIcon ?? <SearchIcon size={18} color={colors.primaryColor} />}
              </TouchableOpacity>
            </View>
          </View>
        )}
        initialLayout={initialLayout}
        renderScene={renderScene}
        lazy
        lazyPreloadDistance={2}
        renderLazyPlaceholder={lazyPlaceholder}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.createInvoiceButtonStyle}
        onPress={onCreateInvoice}
      >
        {createInvoiceIcon ?? <AddInvoiceIcon color={colors.primaryButtonColor} />}
      </TouchableOpacity>
    </View>
  );
};

export default InvoiceListComponent;
