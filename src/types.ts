export interface InvoiceParam {
  pageNum?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  fromTotalAmount?: number;
  toTotalAmount?: number;
  status?: InvoiceStatusType;
  keyword?: string;
  dateType?: InvoiceDateType;
  sortBy?: InvoiceSortType;
  ordering?: OrderingType;
  customerId?: string;
  searchStatus?: InvoiceStatusType;
}

export enum InvoiceStatusType {
  paid = 'Paid',
  due = 'Due',
  overDue = 'Overdue',
  search = 'Search',
  all = 'All',
}

export enum InvoiceSubStatusType {
  sent = 'Sent',
  chased = 'Chased',
  viewed = 'Viewed',
}

export enum InvoiceDateType {
  invoiceDate = 'INVOICE_DATE',
  dueDate = 'DUE_DATE',
}

export enum InvoiceSortType {
  invoiceDate = 'INVOICE_DATE',
  status = 'STATUS',
  totalAmount = 'TOTAL_AMOUNT',
  dueAmount = 'DUE_AMOUNT',
  dueDate = 'DUE_DATE',
}

export enum OrderingType {
  descending = 'DESCENDING',
  ascending = 'ASCENDING',
}

export interface Invoice {
  balanceAmount: number;
  createdAt: string;
  viewedAt: string;
  invoiceId: string;
  invoiceNumber: string;
  accountingId: string;
  type: string;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  chargeDate: string;
  status: InvoiceStatus[];
  numberOfDocuments?: number;
  documents: DocumentReference[];
  paymentId: string;
  paymentStatus: string;
  items: ItemInvoiceReference[];
  description: string;
  invoiceReference?: string;
  invoiceSubTotal: number;
  totalAmount: number;
  totalDiscount: number;
  totalPaid: number;
  totalTax: number;
  extensions: Extension[];
  version?: string;
  customer?: Customer;
  merchant: MerchantReference;
  bankAccount: BankAccountReference;
  subStatus?: InvoiceSubStatus[];
}

export interface MerchantReference {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  contact: {
    email: string;
    mobileNumber: string;
  };
}

export interface InvoiceStatus {
  key: InvoiceStatusType;
  value: string;
}

export interface InvoiceSubStatus {
  key: InvoiceSubStatusType;
  value: boolean;
}

export interface DocumentReference {
  documentId: string;
  documentName: string;
  documentUrl?: string;
}

export interface BankAccountReference {
  bankId: string;
  sortCode: string;
  accountNumber: string;
  accountName: string;
}

export interface ItemInvoiceReference {
  itemReference?: string;
  description: string;
  quantity: number;
  amount?: number;
  rate: number;
  orderIndex?: number;
  itemName: string;
  itemUOM?: string;
  extensions?: Extension[];
}
export interface Extension {
  addDeduct: AddDeduct;
  value: number;
  type: DiscountType;
  name: string;
}

export enum AddDeduct {
  add = 'ADD',
  deduct = 'DEDUCT',
}

export enum DiscountType {
  Percentage = 'PERCENTAGE',
  Fixed = 'FIXED_VALUE',
}

export interface InvoiceData {
  isLoading: boolean;
  isRefreshing: boolean;
  data: Invoice[];
  paging?: Paging;
  groupedData: any[];
  error?: Error;
  status?: string;
}

export interface Paging {
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
}

export interface ShareLink {
  invoice: Invoice;
  link: string;
  isChase: boolean;
  showFrom: string;
}

export interface FilterTagName {
  id: string;
  value: string;
}

export interface PaymentReference {
  invoiceId: string;
  amount: number;
  currency: string;
  description: string;
  provider: string;
  providerReference: string;
  reconciled: boolean;
  reference: string;
  status: string;
  transactionDate: string;
}

export interface PaymentItem {
  amount: number;
  currency: string;
  description: string;
  invoiceId: string;
  invoiceNumber: string;
  paymentId: string;
  provider: string;
  providerReference: string;
  reference: string;
  status: string;
  transactionDate: string;
}

export interface PaymentType {
  label: string;
  value: string;
}
