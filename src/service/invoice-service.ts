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
  documentClient: any;
  webTemplateName?: string;
  downloadTemplateName?: string;
  maxFilterAmount?: number;
  maxCreateAmount?: number;
  minAmount?: number;
  paymentTypes?: PaymentType[];
  defaultDueDate?: number;
  maxDocumentSize?: number;
  documentTypes?: string[];
};

export class InvoiceService {
  private static _instance: InvoiceService = new InvoiceService();
  public static defaultWebTemplateName = '101Pay-html-template-v1.0';
  public static defaultDownloadTemplate = '101Pay-pdf-template-v1.0';

  private _invoiceClient?: any;
  private _invoiceWebUrl?: string;
  private _documentClient?: any;
  private _webTemplateName = InvoiceService.defaultWebTemplateName; // Default value
  private _downloadTemplate = InvoiceService.defaultDownloadTemplate; // Default value
  private _maxFilterAmount = 10000;
  private _minAmount = 0;
  private _maxCreateAmount = 1000000000;
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
  private _defaultDueDate = 15;
  private _maxDocumentSize = 2097151;
  private _documentTypes = ['jpeg', 'jpg', 'png', 'heic'];

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
    this._documentClient = clients.documentClient;
    this._invoiceWebUrl = clients.invoiceWebUrl;
    this._webTemplateName = clients.webTemplateName ?? this._webTemplateName;
    this._downloadTemplate = clients.downloadTemplateName ?? this._downloadTemplate;
    this._paymentTypes = clients.paymentTypes ?? this._paymentTypes;
    this._defaultDueDate = clients.defaultDueDate ?? this._defaultDueDate;
    this._maxCreateAmount = clients.maxCreateAmount ?? this._maxCreateAmount;
    this._maxFilterAmount = clients.maxFilterAmount ?? this._maxFilterAmount;
    this._minAmount = clients.minAmount ?? this._minAmount;
    this._maxDocumentSize = clients.maxDocumentSize ?? this._maxDocumentSize;
    this._documentTypes = clients.documentTypes ?? this._documentTypes;
  };

  public setTemplates = (webTemplateName?: string, downloadTemplate?: string) => {
    this._webTemplateName = webTemplateName ?? this._webTemplateName;
    this._downloadTemplate = downloadTemplate ?? this._downloadTemplate;
  };

  public setMaxCreateAmount = (amount?: number) => {
    this._maxCreateAmount = amount ?? this._maxCreateAmount;
  };

  public setMaxFilterAmount = (amount?: number) => {
    this._maxFilterAmount = amount ?? this._maxFilterAmount;
  };

  public setMinAmount = (amount?: number) => {
    this._minAmount = amount ?? this._minAmount;
  };

  public getMaxMinAmount = () => ({
    maxCreateAmount: this._maxCreateAmount,
    minAmount: this._minAmount,
    maxFilterAmount: this._maxFilterAmount,
  });

  public setMaxDocumentSize = (size?: number) => {
    this._maxDocumentSize = size ?? this._maxDocumentSize;
  };

  public getMaxDocumentSize = () => this._maxDocumentSize;

  public setDocumentTypes = (types?: string[]) => {
    this._documentTypes = types ?? this._documentTypes;
  };

  public getDocumentTypes = () => this._documentTypes;

  public setPaymentTypes = (paymentTypes?: PaymentType[]) => {
    this._paymentTypes = paymentTypes ?? this._paymentTypes;
  };

  public getPaymentTypes = () => this._paymentTypes;

  public setDefaultDueDate = (dueDate?: number) => {
    this._defaultDueDate = dueDate ?? this._defaultDueDate;
  };

  public getDefaultDueDate = () => this._defaultDueDate;

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

  createInvoice = async (
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
    bankAccount?: BankAccountReference
  ) => {
    if (this._invoiceClient) {
      const body = {
        invoices: [
          {
            customer,
            invoiceReference,
            currency,
            invoiceDate,
            dueDate,
            items,
            documents,
            description,
            extensions,
            bankAccount,
          },
        ],
      };
      const response = await this._invoiceClient.post('invoices', body, {
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

  uploadDocument = async (content: string, contentType: string, type: string, name: string) => {
    if (this._documentClient) {
      const response = await this._documentClient.post('documents', {
        content,
        type,
        contentType,
        name,
      });
      return response.data;
    } else {
      throw new Error('Document Client is not registered');
    }
  };

  documentDetail = async (documentId: string) => {
    if (this._documentClient) {
      const response = await this._documentClient.get(`documents/${documentId}`);
      return response.data;
    } else {
      throw new Error('Document Client is not registered');
    }
  };
}
