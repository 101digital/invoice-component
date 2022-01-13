import React, { useContext } from 'react';
import { PaymentItemComponentProps, PaymentItemComponentStyles } from './types';
import useMergeStyles from './theme';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import moment from 'moment';
import { DeleteItemIcon, EditItemIcon } from '../../../assets';

const PaymentItemComponent = (props: PaymentItemComponentProps) => {
  const { style, payment, dateFormat, editIcon, deleteIcon, onDelete, onEdit, canChange } = props;
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';
  const styles: PaymentItemComponentStyles = useMergeStyles(style);
  const {} = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.paymentTypeStyle}>{payment.provider}</Text>
        <Text style={styles.amountStyle}>
          {useCurrencyFormat(payment.amount, payment.currency)}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Text style={styles.dateStyle}>{`Date: ${moment(payment.transactionDate).format(
          _dateFormat
        )}`}</Text>
        {canChange && (
          <>
            <TouchableOpacity
              onPress={onEdit}
              activeOpacity={0.8}
              style={styles.actionButtonContainerStyle}
            >
              {editIcon ?? <EditItemIcon color="#000000" />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              activeOpacity={0.8}
              style={styles.actionButtonContainerStyle}
            >
              {deleteIcon ?? <DeleteItemIcon />}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default PaymentItemComponent;
