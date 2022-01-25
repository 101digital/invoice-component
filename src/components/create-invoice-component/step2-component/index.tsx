import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Step2ComponentProps, Step2ComponentStyles } from './types';
import useMergeStyles from './theme';
import FooterComponent from '../footer-component';
import { AddItemIcon } from '../../../assets';
import { ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import { ItemInvoiceData } from '../../../types';
import { findIndex, isEmpty } from 'lodash';
import { getTotalAmount } from '../../../utils/helper';
import AddInvoiceModalComponent from './add-invoice-modal-component';
import LineItemComponent from '../line-item-component';

const Step2Component = (props: Step2ComponentProps) => {
  const {
    style,
    onPressedBack,
    addItemIcon,
    currencyCode,
    onNext,
    initItems,
    Footer,
    LineItem,
    AddInvoiceModal,
  } = props;
  const styles: Step2ComponentStyles = useMergeStyles(style);
  const [items, setItems] = useState<ItemInvoiceData[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { colors, i18n } = useContext(ThemeContext);
  const [isShowAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInvoiceData | undefined>(undefined);

  useEffect(() => {
    if (initItems) {
      setItems(initItems);
    }
  }, [initItems]);

  const toggleAddModal = () => {
    if (isShowAddModal) {
      setSelectedItem(undefined);
    }
    setShowAddModal(!isShowAddModal);
  };

  useEffect(() => {
    if (!isEmpty(items)) {
      setTotalPrice(getTotalAmount(items));
    } else {
      setTotalPrice(0);
    }
  }, [items]);

  const replaceAt = (index: number, value: ItemInvoiceData) => {
    const ret = items.slice(0);
    ret[index] = value;
    return ret;
  };

  return (
    <>
      <View style={styles.containerStyle}>
        <FlatList
          keyExtractor={(item) => item.id ?? Math.random().toString()}
          renderItem={({ item }) => {
            return (
              <LineItemComponent
                key={item.id}
                currencyCode={currencyCode}
                data={item}
                onEdit={() => {
                  setSelectedItem(item);
                  toggleAddModal();
                }}
                onDelete={() => {
                  setItems(items.filter((i) => i.id !== item.id));
                }}
                style={LineItem?.style}
                {...LineItem?.props}
              />
            );
          }}
          data={items}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          initialNumToRender={items.length}
          ListHeaderComponent={
            <Text style={styles.headerLabelStyle}>
              {isEmpty(items)
                ? i18n?.t('create_invoice_component.lbl_add_item_to_continue') ??
                  'Add an item to continue'
                : i18n?.t('create_invoice_component.lbl_items_added') ?? 'Items added'}
            </Text>
          }
          ListFooterComponent={
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addButtonContainerStyle}
              onPress={toggleAddModal}
            >
              {addItemIcon ?? <AddItemIcon size={14} color={colors.primaryColor} />}
              <Text style={styles.addButtonTitleStyle}>
                {i18n?.t('create_invoice_component.btn_add_item') ?? 'Add item'}
              </Text>
            </TouchableOpacity>
          }
        />
        <FooterComponent
          backButtonTitle={i18n?.t('create_invoice_component.btn_back') ?? 'Back'}
          amountLabel={i18n?.t('create_invoice_component.lbl_sub_total') ?? 'Sub total'}
          amountValue={useCurrencyFormat(totalPrice, currencyCode)}
          onBackPressed={() => {
            onPressedBack(items);
          }}
          onNextPressed={() => {
            onNext(items);
          }}
          canNext={!isEmpty(items)}
          style={Footer?.style}
        />
      </View>
      <AddInvoiceModalComponent
        currencyCode={currencyCode}
        isVisible={isShowAddModal}
        onClose={toggleAddModal}
        initData={selectedItem}
        onSubmit={(_item) => {
          var index = findIndex(items, (item) => item.id === _item.id);
          if (index !== -1) {
            setItems(replaceAt(index, _item));
          } else {
            setItems([...items, _item]);
          }
          toggleAddModal();
        }}
        style={AddInvoiceModal?.style}
        {...AddInvoiceModal?.props}
      />
    </>
  );
};

export default Step2Component;
