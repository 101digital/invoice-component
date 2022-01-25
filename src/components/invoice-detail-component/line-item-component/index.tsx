import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { LineItemComponentProps, LineItemComponentStyles } from './types';
import useMergeStyles from './theme';
import { formatCurrency, ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import { AddDeduct, DiscountType, Extension } from '../../../types';

const LineItemComponent = (props: LineItemComponentProps) => {
  const { style, lineItem, currencyCode, addTagColor, deductTagColor } = props;
  const styles: LineItemComponentStyles = useMergeStyles(style);
  const _addTagColor = addTagColor ?? '#fff0db';
  const _deductTagColor = deductTagColor ?? '#ccf3d6';
  const { currencies } = useContext(ThemeContext);

  const quantityDetail = () => {
    if (lineItem.itemUOM) {
      return `${lineItem.quantity} ${lineItem.itemUOM} x ${lineItem.rate.toFixed(2)}`;
    }
    return `${lineItem.quantity} x ${lineItem.rate.toFixed(2)}`;
  };

  const getTagDetail = (ext: Extension) => {
    let amount = '';
    if (ext.type === DiscountType.Percentage) {
      amount = `${formatCurrency(currencies, (lineItem.rate * ext.value) / 100, currencyCode)} (${
        ext.value
      }%)`;
    }
    amount = `${formatCurrency(currencies, ext.value, currencyCode)}`;
    return ext.addDeduct === AddDeduct.deduct ? `-${amount}` : `+${amount}`;
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.itemNameStyle}>{lineItem.itemName}</Text>
        <Text style={styles.itemPriceStyle}>
          {useCurrencyFormat(lineItem.amount ?? 0, currencyCode)}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Text style={styles.itemQuantityStyle}>{quantityDetail()}</Text>
        {lineItem.extensions?.map((ext) => (
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
      </View>
    </View>
  );
};

export default LineItemComponent;
