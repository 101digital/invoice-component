import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LineItemComponentProps, LineItemComponentStyles } from './types';
import useMergeStyles from './theme';
import { CurrencyDisplay, formatCurrency, ThemeContext } from 'react-native-theme-component';
import { AddDeduct, DiscountType, Extension } from '../../../types';
import { getExtensionAmount, getTotalAmount } from '../../../utils/helper';
import { DeleteItemIcon, EditItemIcon } from '../../../assets';

const LineItemComponent = (props: LineItemComponentProps) => {
  const {
    style,
    data,
    currencyCode,
    addTagColor,
    deductTagColor,
    onDelete,
    onEdit,
    editIcon,
    deleteIcon,
  } = props;
  const styles: LineItemComponentStyles = useMergeStyles(style);
  const _addTagColor = addTagColor ?? '#fff0db';
  const _deductTagColor = deductTagColor ?? '#ccf3d6';
  const { currencies, colors } = useContext(ThemeContext);

  const defaultDiscountAmount = data?.extensions?.filter((x) => x.name !== 'tax') ?? [];
  const defaultTaxAmount = data?.extensions?.filter((x) => x.name === 'discount') ?? [];

  const price = () => {
    const subTotal = getTotalAmount([data]);
    const total =
      subTotal +
      (defaultTaxAmount.length !== 0 ? getExtensionAmount(subTotal, defaultTaxAmount[0]) : 0) -
      (defaultDiscountAmount.length !== 0
        ? getExtensionAmount(subTotal, defaultDiscountAmount[0])
        : 0);

    return formatCurrency(currencies, total, currencyCode);
  };

  const quantityDetail = () => {
    return `${data.quantity}${data.itemUOM ?? ''} x ${formatCurrency(
      currencies,
      data.amount,
      currencyCode,
      CurrencyDisplay.Symbol,
      false
    )}`;
  };

  const getTagDetail = (ext: Extension) => {
    let amount = '';
    if (ext.type === DiscountType.Percentage) {
      amount = `${formatCurrency(currencies, (1 * ext.value) / 100, currencyCode)} (${ext.value}%)`;
    }
    amount = `${formatCurrency(currencies, ext.value, currencyCode)}`;
    return ext.addDeduct === AddDeduct.deduct ? `-${amount}` : `+${amount}`;
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.itemNameStyle}>{data.itemName}</Text>
        <Text style={styles.itemPriceStyle}>{price()}</Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Text style={styles.itemQuantityStyle}>{quantityDetail()}</Text>
        {data.extensions?.map((ext) => (
          <View
            style={[
              styles.tagContainerStyle,
              {
                backgroundColor:
                  ext.addDeduct === AddDeduct.deduct ? _deductTagColor : _addTagColor,
              },
            ]}
          >
            <Text style={styles.tagValueStyle}>{getTagDetail(ext)}</Text>
          </View>
        ))}
        <View style={{ flex: 1 }} />
        <>
          {onEdit && (
            <TouchableOpacity activeOpacity={0.8} onPress={onEdit} style={styles.actionButtonStyle}>
              {editIcon ?? <EditItemIcon color={colors.primaryColor} />}
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onDelete}
              style={styles.actionButtonStyle}
            >
              {deleteIcon ?? <DeleteItemIcon />}
            </TouchableOpacity>
          )}
        </>
      </View>
    </View>
  );
};

LineItemComponent.defaultProps = {
  canEdit: true,
};

export default LineItemComponent;
