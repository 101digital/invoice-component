import * as Yup from 'yup';

export class CreateInvoiceStepOneData {
  constructor(
    readonly description?: string,
    readonly customerName?: string,
    readonly customerId?: string,
    readonly invoiceDate?: string,
    readonly invoiceDueDate?: string,
    readonly dueAfter?: number
  ) {}

  static init(
    description?: string,
    customerName?: string,
    customerId?: string
  ): CreateInvoiceStepOneData {
    return new CreateInvoiceStepOneData(description ?? '', customerName ?? '', customerId ?? '');
  }
}

export const CreateInvoiceStepOneSchema = Yup.object().shape({
  description: Yup.string()
    .min(3, 'create_invoice_component.val_min_description')
    .max(250, 'create_invoice_component.val_max_description'),
});
