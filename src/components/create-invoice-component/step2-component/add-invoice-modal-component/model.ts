import { getAmountRawValue } from 'react-native-theme-component';
import * as Yup from 'yup';

export class CreateInvoiceItemData {
  constructor(
    readonly itemName: string,
    readonly amount: string,
    readonly quantity: string,
    readonly itemUOM?: string
  ) {}

  static init(
    itemName?: string,
    amount?: string,
    quantity?: string,
    itemUOM?: string
  ): CreateInvoiceItemData {
    return new CreateInvoiceItemData(itemName || '', amount || '', quantity || '1', itemUOM || '');
  }
}

export const CreateInvoiceItemSchema = (min = 0, max = 1000000000, currencyOption?: any) =>
  Yup.object().shape({
    itemName: Yup.string()
      .trim()
      .required('create_invoice_component.val_item_name_required')
      .min(2, 'create_invoice_component.val_min_item_name')
      .max(25, 'create_invoice_component.val_max_item_name'),
    amount: Yup.number()
      .required('create_invoice_component.val_price_required')
      .transform((data, originalValue) => {
        if (isNaN(data)) {
          return getAmountRawValue(originalValue, currencyOption);
        }
        return data;
      })
      .moreThan(min, `create_invoice_component.val_min_price%d${min}`)
      .lessThan(max, `create_invoice_component.val_max_price%d${max}`),
  });
