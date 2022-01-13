import {
  BankAccountReference,
  DocumentReference,
  Extension,
  InvoiceParam,
  InvoiceSubStatus,
  ItemInvoiceReference,
  PaymentReference,
  PaymentType,
} from '../types';

type InvoiceClient = {
  invoiceClient: any;
  invoiceWebUrl: string;
  webTemplateName?: string;
  downloadTemplateName?: string;
  maxAmount?: number;
  minAmount?: number;
  paymentTypes?: PaymentType[];
};

export class InvoiceService {
  private static _instance: InvoiceService = new InvoiceService();
  public static defaultWebTemplateName = '101Pay-html-template-v1.0';
  public static defaultDownloadTemplate = '101Pay-pdf-template-v1.0';

  private _invoiceClient?: any;
  private _invoiceWebUrl?: string;
  private _webTemplateName = InvoiceService.defaultWebTemplateName; // Default value
  private _downloadTemplate = InvoiceService.defaultDownloadTemplate; // Default value
  private _maxAmount = 10000;
  private _minAmount = 0;
  private _paymentTypes = [
    {
      label: 'Cash',
      value: 'Cash',
    },
    {
      label: 'Bank Transfer',
      value: 'Bank Transfer',
    },
    {
      label: 'Cheque',
      value: 'Cheque',
    },
    {
      label: 'Gift Certificate',
      value: 'Gift Certificate',
    },
    {
      label: 'POS - Visa',
      value: 'POS - Visa',
    },
    {
      label: 'POS - Mastercard',
      value: 'POS - Mastercard',
    },
    {
      label: 'POS - AMEX',
      value: 'POS - AMEX',
    },
    {
      label: 'POS - Other CC/DC',
      value: 'POS - Other CC/DC',
    },
    {
      label: 'POS - Voucher',
      value: 'POS - Voucher',
    },
  ];

  constructor() {
    if (InvoiceService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use InvoiceService.getInstance() instead of new.'
      );
    }
    InvoiceService._instance = this;
  }

  public static instance(): InvoiceService {
    return InvoiceService._instance;
  }

  public initClients = (clients: InvoiceClient) => {
    this._invoiceClient = clients.invoiceClient;
    this._invoiceWebUrl = clients.invoiceWebUrl;
    this._webTemplateName = clients.webTemplateName ?? this._webTemplateName;
    this._downloadTemplate = clients.downloadTemplateName ?? this._downloadTemplate;
    this._paymentTypes = clients.paymentTypes ?? this._paymentTypes;
  };

  public setTemplates = (webTemplateName?: string, downloadTemplate?: string) => {
    this._webTemplateName = webTemplateName ?? this._webTemplateName;
    this._downloadTemplate = downloadTemplate ?? this._downloadTemplate;
  };

  public setMaxMinAmount = (maxAmount?: number, minAmount?: number) => {
    this._maxAmount = maxAmount ?? this._maxAmount;
    this._minAmount = minAmount ?? this._minAmount;
  };

  public getMaxMinAmount = () => ({
    maxAmount: this._maxAmount,
    minAmount: this._minAmount,
  });

  public setPaymentTypes = (paymentTypes?: PaymentType[]) => {
    this._paymentTypes = paymentTypes ?? this._paymentTypes;
  };

  public getPaymentTypes = () => this._paymentTypes;

  getInvoices = async (params?: InvoiceParam) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.get('invoices', {
        params: {
          ...params,
          pageNum: params?.pageNum || 1,
          pageSize: params?.pageSize || 10,
          fromDate: params?.fromDate,
          toDate: params?.toDate,
          ordering: params?.ordering || 'DESCENDING',
          sortBy: params?.sortBy || 'CREATED_DATE',
          dateType: params?.dateType || 'INVOICE_DATE',
          searchStatus: undefined,
        },
      });
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  deleteInvoice = async (invoiceId: string) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.delete(`invoices/${invoiceId}`);
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  getShareLink = async (invoiceId: string) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.get(`invoices/${invoiceId}/share`, {
        params: {
          templateName: this._webTemplateName,
        },
      });
      const { data } = response.data;
      return `${this._invoiceWebUrl}/invoices?sharingKey=${data.sharingKey}&templateName=${this._webTemplateName}&downloadTemplateName=${this._downloadTemplate}`;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  getInvoiceDetail = async (invoiceId: string) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.get(`invoices/${invoiceId}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  updateInvoice = async (
    invoiceId: string,
    invoiceDate: string,
    dueDate: string,
    currency: string,
    items: ItemInvoiceReference[],
    documents: DocumentReference[],
    description: string,
    extensions: Extension[],
    invoiceReference?: string,
    customer?: {
      id: string;
    },
    subStatus?: InvoiceSubStatus[],
    bankAccount?: BankAccountReference
  ) => {
    if (this._invoiceClient) {
      const body = {
        customer,
        invoiceReference,
        currency,
        invoiceDate,
        dueDate,
        items,
        documents,
        description,
        extensions,
        subStatus,
        bankAccount,
      };
      const response = await this._invoiceClient.put(`invoices/${invoiceId}`, body, {
        headers: {
          'Operation-Mode': 'SYNC',
        },
      });

      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  addPayment = async (params: PaymentReference) => {
    if (this._invoiceClient) {
      const body = {
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        provider: params.provider,
        providerReference: params.providerReference,
        reconciled: params.reconciled,
        reference: params.reference,
        status: params.status,
        transactionDate: params.transactionDate,
      };
      const response = await this._invoiceClient.post(
        `invoices/${params.invoiceId}/payments`,
        body,
        {
          headers: {
            'Operation-Mode': 'SYNC',
          },
        }
      );
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  getPaymentByInvoiceId = async (invoiceId: string) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.get(`invoices/${invoiceId}/payments`, {
        headers: {
          'Operation-Mode': 'SYNC',
          Accept: 'application/json',
        },
      });
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  updatePayment = async (paymentId: string, params: PaymentReference) => {
    if (this._invoiceClient) {
      const body = {
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        provider: params.provider,
        providerReference: params.providerReference,
        reconciled: params.reconciled,
        reference: params.reference,
        status: params.status,
        transactionDate: params.transactionDate,
      };

      const response = await this._invoiceClient.put(
        `invoices/${params.invoiceId}/payments/${paymentId}`,
        body,
        {
          headers: {
            'Operation-Mode': 'SYNC',
          },
        }
      );
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };

  deletePayment = async (invoiceId: string, paymentId: string) => {
    if (this._invoiceClient) {
      const response = await this._invoiceClient.delete(
        `invoices/${invoiceId}/payments/${paymentId}`
      );
      return response.data;
    } else {
      throw new Error('Invoice Client is not registered');
    }
  };
}
