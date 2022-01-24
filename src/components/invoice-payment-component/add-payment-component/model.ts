import { getAmountRawValue } from 'react-native-theme-component';
import * as Yup from 'yup';

export class AddPaymentData {
  constructor(
    readonly paymentType: string,
    readonly amount: number,
    readonly reference: string,
    readonly transactionDate: string
  ) {}

  static default(
    paymentType: string,
    totalDue: any,
    reference?: string,
    transactionDate?: string
  ): AddPaymentData {
    return new AddPaymentData(paymentType, totalDue, reference || '', transactionDate || '');
  }
}

export const AddPaymentSchema = (initialAmount: number, currencyOption?: any) =>
  Yup.object().shape({
    amount: Yup.number()
      .required('invoice_payment_component.val_amount_required')
      .transform((data, originalValue) => {
        if (isNaN(data)) {
          return getAmountRawValue(originalValue, currencyOption);
        }
        return data;
      })
      .moreThan(0, 'invoice_payment_component.val_valid_amount')
      .lessThan(initialAmount, 'invoice_payment_component.val_valid_amount'),
  });
