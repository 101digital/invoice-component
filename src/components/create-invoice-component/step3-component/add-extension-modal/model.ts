import { getAmountRawValue } from 'react-native-theme-component';
import * as Yup from 'yup';

export class AddExtensionData {
  constructor(readonly value: string) {}

  static init(initValue?: string): AddExtensionData {
    return new AddExtensionData(initValue || '');
  }
}

export const AddPercentageScheme = (isDiscount: boolean) =>
  Yup.object().shape({
    value: Yup.number()
      .typeError(
        isDiscount
          ? 'create_invoice_component.val_discount_invalid'
          : 'create_invoice_component.val_vat_invalid'
      )
      .moreThan(
        0,
        isDiscount
          ? 'create_invoice_component.val_min_invoice_discount'
          : 'create_invoice_component.val_min_invoice_vat'
      )
      .lessThan(
        100.00000001,
        isDiscount
          ? 'create_invoice_component.val_max_invoice_discount'
          : 'create_invoice_component.val_max_invoice_vat'
      ),
  });

export const AddFixedScheme = (totalAmount: number, currencyOption: any, isDiscount: boolean) =>
  Yup.object().shape({
    value: Yup.number()
      .transform((data, originalValue) => {
        if (isNaN(data)) {
          return getAmountRawValue(originalValue, currencyOption);
        }
        return data;
      })
      .moreThan(
        0,
        isDiscount
          ? 'create_invoice_component.val_min_invoice_discount'
          : 'create_invoice_component.val_min_invoice_vat'
      )
      .lessThan(
        totalAmount + 0.0000001,
        isDiscount
          ? 'create_invoice_component.val_max_invoice_discount_fixed'
          : 'create_invoice_component.val_max_invoice_vat_fixed'
      ),
  });
