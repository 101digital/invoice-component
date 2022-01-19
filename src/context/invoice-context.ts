import {
  InvoiceParam,
  InvoiceData,
  InvoiceStatusType,
  Invoice,
  Paging,
  ShareLink,
  InvoiceSubStatus,
  InvoiceSubStatusType,
  PaymentReference,
  PaymentItem,
  DocumentData,
  ItemInvoiceReference,
  Extension,
  BankAccountReference,
  DocumentReference,
} from './../types';
import { InvoiceService } from './../service/invoice-service';
import React, { useCallback, useMemo, useState } from 'react';
import { groupInvoices } from '../utils/helper';
import { find, isEmpty } from 'lodash';

const invoiceService = InvoiceService.instance();

const initInvoiceData: InvoiceData = {
  isLoading: false,
  isRefreshing: false,
  data: [],
  groupedData: [],
};

export interface InvoiceContextData {
  allInvoices: InvoiceData;
  dueInvoices: InvoiceData;
  overdueInvoices: InvoiceData;
  paidInvoices: InvoiceData;
  searchInvoices: InvoiceData;
  clearErrors: () => void;
  getInvoices: (params?: InvoiceParam) => void;
  refreshInvoices: (params?: InvoiceParam) => void;
  getInvoiceDataByStatus: (status?: InvoiceStatusType) => InvoiceData;
  deleteInvoice: (invoiceId: string, status?: InvoiceStatusType) => void;
  isDeletingInvoice: boolean;
  errorDeleteInvoice?: Error;
  deletedInvoiceSuccess: boolean;
  getShareLink: (invoice: Invoice, isChase: boolean, showFrom: string) => void;
  isLoadingShareLink: boolean;
  errorLoadShareLink?: Error;
  shareLink?: ShareLink;
  clearShareLink: () => void;
  getInvoiceDetail: (invoiceId: string) => void;
  setInvoiceDetail: (invoice: Invoice) => void;
  isLoadingInvoiceDetail: boolean;
  errorLoadInvoiceDetail?: Error;
  invoiceDetail?: Invoice;
  clearInvoiceDetail: () => void;
  updateInvoice: (
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
    status?: InvoiceStatusType,
    bankAccount?: BankAccountReference
  ) => Promise<Invoice | undefined>;
  updateInvoiceSubStatus: (invoice: Invoice) => void;
  isUpdatingInvoice: boolean;
  isUpdatedInvoiceSuccess: boolean;
  errorUpdateInvoice?: Error;
  clearSearchInvoices: () => void;
  isUpdatedSubStatusSuccess: boolean;
  addPayment: (params: PaymentReference) => void;
  isAddingPayment: boolean;
  errorAddPayment?: Error;
  isAddedPaymentSuccess: boolean;
  isLoadingPayments: boolean;
  getPaymentByInvoiceId: (invoiceId: string) => void;
  errorLoadPayment?: Error;
  payments: PaymentItem[];
  clearPayments: () => void;
  updatePayment: (paymentId: string, params: PaymentReference) => void;
  isUpdatingPayment: boolean;
  isUpdatedPaymentSuccess: boolean;
  errorUpdatePayment?: Error;
  deletePayment: (paymentId: string, invoiceId: string) => void;
  isDeletingPayment: boolean;
  isDeletedPaymentSuccess: boolean;
  errorDeletePayment?: Error;
  isUploadingDocument: boolean;
  uploadDocument: (data: DocumentData) => Promise<DocumentReference | undefined>;
  errorUploadDocument?: Error;
  getDocumentDetail: (documentId: string) => Promise<DocumentData | undefined>;
  documents: DocumentReference[];
  setDocuments: (documents: DocumentReference[]) => void;
  clearDocuments: () => void;
  createInvoice: (
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
  ) => Promise<Invoice | undefined>;
  isCreatingInvoice: boolean;
  isCreatedInvoiceSuccess: boolean;
  errorCreateInvoice?: Error;
}

export const invoiceDefaultValue: InvoiceContextData = {
  allInvoices: initInvoiceData,
  dueInvoices: initInvoiceData,
  overdueInvoices: initInvoiceData,
  paidInvoices: initInvoiceData,
  searchInvoices: initInvoiceData,
  clearErrors: () => null,
  getInvoices: () => null,
  refreshInvoices: () => null,
  getInvoiceDataByStatus: () => initInvoiceData,
  deleteInvoice: () => null,
  isDeletingInvoice: false,
  deletedInvoiceSuccess: false,
  getShareLink: () => null,
  isLoadingShareLink: false,
  clearShareLink: () => null,
  getInvoiceDetail: () => null,
  isLoadingInvoiceDetail: false,
  clearInvoiceDetail: () => null,
  updateInvoice: async () => undefined,
  isUpdatedInvoiceSuccess: false,
  isUpdatingInvoice: false,
  updateInvoiceSubStatus: () => null,
  clearSearchInvoices: () => null,
  isUpdatedSubStatusSuccess: false,
  addPayment: () => null,
  isAddingPayment: false,
  isAddedPaymentSuccess: false,
  isLoadingPayments: false,
  getPaymentByInvoiceId: () => null,
  clearPayments: () => null,
  payments: [],
  updatePayment: () => null,
  isUpdatedPaymentSuccess: false,
  isUpdatingPayment: false,
  deletePayment: () => null,
  isDeletingPayment: false,
  isDeletedPaymentSuccess: false,
  isUploadingDocument: false,
  uploadDocument: async () => undefined,
  getDocumentDetail: async () => undefined,
  documents: [],
  setDocuments: () => null,
  clearDocuments: () => null,
  createInvoice: async () => undefined,
  isCreatingInvoice: false,
  isCreatedInvoiceSuccess: false,
  setInvoiceDetail: () => null,
};

export const InvoiceContext = React.createContext<InvoiceContextData>(invoiceDefaultValue);

export function useInvoiceContextValue(): InvoiceContextData {
  const [_allInvoices, setAllInvoices] = useState<InvoiceData>(initInvoiceData);
  const [_dueInvoices, setDueInvoices] = useState<InvoiceData>(initInvoiceData);
  const [_overdueInvoices, setOverdueInvoices] = useState<InvoiceData>(initInvoiceData);
  const [_paidInvoices, setPaidInvoices] = useState<InvoiceData>(initInvoiceData);
  const [_searchIvoices, setSearchInvoices] = useState<InvoiceData>(initInvoiceData);
  const [_isDeletingInvoice, setDeletingInvoice] = useState(false);
  const [_errorDeleteInvoice, setErrorDeleteInvoice] = useState<Error | undefined>(undefined);
  const [_deletedInvoiceSuccess, setDeletedInvoiceSuccess] = useState(false);
  const [_isLoadingShareLink, setLoadingShareLink] = useState(false);
  const [_errorLoadShareLink, setErrorLoadShareLink] = useState<Error | undefined>(undefined);
  const [_shareLink, setShareLink] = useState<ShareLink | undefined>(undefined);
  const [_invoiceDetail, _setInvoiceDetail] = useState<Invoice | undefined>(undefined);
  const [_isLoadingInvoiceDetail, setLoadingInvoiceDetail] = useState(false);
  const [_errorLoadInvoiceDetail, setErrorLoadInvoiceDetail] = useState<Error | undefined>(
    undefined
  );
  const [_isUpdatingInvoice, setUpdatingInvoice] = useState(false);
  const [_errorUpdateInvoice, setErrorUpdateInvoice] = useState<Error | undefined>(undefined);
  const [_updatedInvoiceSuccess, setUpdatedInvoiceSuccess] = useState(false);
  const [_updatedSubStatusSuccess, setUpdatedSubStatusSuccess] = useState(false);

  const [_isAddingPayment, setAddingPayment] = useState(false);
  const [_errorAddPayment, setErrorAddPayment] = useState<Error | undefined>(undefined);
  const [_isAddedPaymentSuccess, setAddedPaymentSuccess] = useState(false);

  const [_isLoadingPayments, setLoadingPayments] = useState(false);
  const [_errorLoadPayments, setErrorLoadPayments] = useState<Error | undefined>(undefined);
  const [_payments, setPayments] = useState<PaymentItem[]>([]);

  const [_isUpdatingPayment, setUpdatingPayment] = useState(false);
  const [_errorUpdatePayment, setErrorUpdatePayment] = useState<Error | undefined>(undefined);
  const [_updatedPaymentSuccess, setUpdatedPaymentSuccess] = useState(false);

  const [_isDeletingPayment, setDeletingPayment] = useState(false);
  const [_errorDeletePayment, setErrorDeletePayment] = useState<Error | undefined>(undefined);
  const [_deletedPaymentSuccess, setDeletedPaymentSuccess] = useState(false);

  const [_isUploadingDocument, setUploadingDocument] = useState(false);
  const [_errorUploadDocument, setErrorUploadDocument] = useState<Error | undefined>(undefined);

  const [_documents, _setDocuments] = useState<DocumentReference[]>([]);

  const [_isCreatingInvoice, setCreatingInvoice] = useState(false);
  const [_errorCreateInvoice, setErrorCreateInvoice] = useState<Error | undefined>(undefined);
  const [_isCreatedInvoiceSuccess, setCreatedInvoiceSuccess] = useState(false);

  const clearSearchInvoices = useCallback(() => {
    setSearchInvoices({ ...initInvoiceData, status: InvoiceStatusType.search });
  }, []);

  const clearErrors = useCallback(async () => {
    if (_errorCreateInvoice) {
      setErrorCreateInvoice(undefined);
    }
    if (_errorUploadDocument) {
      setErrorUploadDocument(undefined);
    }
    if (_errorDeletePayment) {
      setErrorDeletePayment(undefined);
    }
    if (_errorUpdatePayment) {
      setErrorUpdatePayment(undefined);
    }
    if (_errorLoadPayments) {
      setErrorLoadPayments(undefined);
    }
    if (_errorAddPayment) {
      setErrorAddPayment(undefined);
    }
    if (_errorUpdateInvoice) {
      setErrorUpdateInvoice(undefined);
    }
    if (_errorLoadShareLink) {
      setErrorLoadShareLink(undefined);
    }
    if (_errorDeleteInvoice) {
      setErrorDeleteInvoice(undefined);
    }
    if (_errorLoadInvoiceDetail) {
      setErrorLoadInvoiceDetail(undefined);
    }
    if (_allInvoices.error) {
      setAllInvoices({
        ..._allInvoices,
        error: undefined,
      });
    }
    if (_dueInvoices) {
      setDueInvoices({
        ..._dueInvoices,
        error: undefined,
      });
    }
    if (_overdueInvoices.error) {
      setOverdueInvoices({
        ..._overdueInvoices,
        error: undefined,
      });
    }
    if (_paidInvoices.error) {
      setPaidInvoices({
        ..._paidInvoices,
        error: undefined,
      });
    }
    if (_searchIvoices.error) {
      setSearchInvoices({
        ..._searchIvoices,
        error: undefined,
      });
    }
  }, [
    _allInvoices,
    _dueInvoices,
    _overdueInvoices,
    _paidInvoices,
    _searchIvoices,
    _errorDeleteInvoice,
    _errorLoadInvoiceDetail,
    _errorLoadShareLink,
    _errorUpdateInvoice,
    _errorAddPayment,
    _errorLoadPayments,
    _errorUpdatePayment,
    _errorDeletePayment,
    _errorUploadDocument,
    _errorCreateInvoice,
  ]);

  const _setLoadingInvoice = (status?: InvoiceStatusType) => {
    switch (status) {
      case InvoiceStatusType.due:
        setDueInvoices({
          ..._dueInvoices,
          isLoading: true,
        });
        break;
      case InvoiceStatusType.overDue:
        setOverdueInvoices({
          ..._overdueInvoices,
          isLoading: true,
        });
        break;
      case InvoiceStatusType.paid:
        setPaidInvoices({
          ..._paidInvoices,
          isLoading: true,
        });
        break;
      case InvoiceStatusType.search:
        setSearchInvoices({
          ..._searchIvoices,
          isLoading: true,
        });
        break;
      default:
        setAllInvoices({
          ..._allInvoices,
          isLoading: true,
        });
        break;
    }
  };

  const _setErrorInvoice = (error: Error, status?: InvoiceStatusType) => {
    switch (status) {
      case InvoiceStatusType.due:
        setDueInvoices({
          ..._dueInvoices,
          isLoading: false,
          isRefreshing: false,
          error: error,
        });
        break;
      case InvoiceStatusType.overDue:
        setOverdueInvoices({
          ..._overdueInvoices,
          isLoading: false,
          isRefreshing: false,
          error: error,
        });
        break;
      case InvoiceStatusType.paid:
        setPaidInvoices({
          ..._paidInvoices,
          isLoading: false,
          isRefreshing: false,
          error: error,
        });
        break;
      case InvoiceStatusType.search:
        setSearchInvoices({
          ..._searchIvoices,
          isLoading: false,
          isRefreshing: false,
          error: error,
        });
        break;
      default:
        setAllInvoices({
          ..._allInvoices,
          isLoading: false,
          isRefreshing: false,
          error: error,
        });
        break;
    }
  };

  const _setRefreshingInvoice = (status?: InvoiceStatusType) => {
    switch (status) {
      case InvoiceStatusType.due:
        setDueInvoices({
          ..._dueInvoices,
          isRefreshing: true,
        });
        break;
      case InvoiceStatusType.overDue:
        setOverdueInvoices({
          ..._overdueInvoices,
          isRefreshing: true,
        });
        break;
      case InvoiceStatusType.paid:
        setPaidInvoices({
          ..._paidInvoices,
          isRefreshing: true,
        });
        break;
      case InvoiceStatusType.search:
        setSearchInvoices({
          ..._searchIvoices,
          isRefreshing: true,
        });
        break;
      default:
        setAllInvoices({
          ..._allInvoices,
          isRefreshing: true,
        });
        break;
    }
  };

  const _setInvoiceData = (data: Invoice[], paging: Paging, status?: InvoiceStatusType) => {
    switch (status) {
      case InvoiceStatusType.due:
        setDueInvoices({
          isRefreshing: false,
          isLoading: false,
          data,
          paging,
          groupedData: groupInvoices(data),
          status,
        });
        break;
      case InvoiceStatusType.overDue:
        setOverdueInvoices({
          isRefreshing: false,
          isLoading: false,
          data,
          paging,
          groupedData: groupInvoices(data),
          status,
        });
        break;
      case InvoiceStatusType.paid:
        setPaidInvoices({
          isRefreshing: false,
          isLoading: false,
          data,
          paging,
          groupedData: groupInvoices(data),
          status,
        });
        break;
      case InvoiceStatusType.search:
        setSearchInvoices({
          isRefreshing: false,
          isLoading: false,
          data,
          paging,
          groupedData: groupInvoices(data),
          status,
        });
        break;
      default:
        setAllInvoices({
          isRefreshing: false,
          isLoading: false,
          data,
          paging,
          groupedData: groupInvoices(data),
          status,
        });
        break;
    }
  };

  const getInvoices = useCallback(
    async (params?: InvoiceParam) => {
      try {
        const status = params?.status;
        const _status = status === InvoiceStatusType.search ? params?.searchStatus : status;
        _setLoadingInvoice(status);
        const { data, paging } = await invoiceService.getInvoices({ ...params, status: _status });
        let _invoices;
        if (paging.pageNumber === 1) {
          _invoices = data;
        } else {
          _invoices = [..._allInvoices.data, ...data];
        }
        _setInvoiceData(_invoices, paging, status);
      } catch (error) {
        _setErrorInvoice(error as Error, params?.status);
      }
    },
    [_allInvoices, _dueInvoices, _overdueInvoices, _paidInvoices, _searchIvoices]
  );

  const refreshInvoices = useCallback(
    async (params?: InvoiceParam) => {
      try {
        const status = params?.status;
        const _status = status === InvoiceStatusType.search ? params?.searchStatus : status;
        _setRefreshingInvoice(status);
        const { data, paging } = await invoiceService.getInvoices({
          ...params,
          status: _status,
          pageNum: 1,
        });
        _setInvoiceData(data, paging, status);
      } catch (error) {
        _setErrorInvoice(error as Error, params?.status);
      }
    },
    [_allInvoices, _dueInvoices, _overdueInvoices, _paidInvoices, _searchIvoices]
  );

  const deleteInvoice = useCallback(
    async (invoiceId: string, status?: InvoiceStatusType) => {
      try {
        setDeletingInvoice(true);
        await invoiceService.deleteInvoice(invoiceId);
        setDeletedInvoiceSuccess(true);
        _refreshInvoice(status);
        setTimeout(() => {
          setDeletedInvoiceSuccess(false);
        }, 100);
        setDeletingInvoice(false);
      } catch (error) {
        setDeletingInvoice(false);
        setErrorDeleteInvoice(error as Error);
      }
    },
    [_allInvoices, _dueInvoices, _overdueInvoices, _paidInvoices, _searchIvoices]
  );

  const _refreshInvoice = useCallback(
    (status?: InvoiceStatusType) => {
      refreshInvoices();
      if (status) {
        refreshInvoices({ status });
      }
    },
    [_allInvoices, _dueInvoices, _overdueInvoices, _paidInvoices, _searchIvoices]
  );

  const getInvoiceDataByStatus = useCallback(
    (status?: InvoiceStatusType) => {
      switch (status) {
        case InvoiceStatusType.due:
          return _dueInvoices;
        case InvoiceStatusType.overDue:
          return _overdueInvoices;
        case InvoiceStatusType.paid:
          return _paidInvoices;
        case InvoiceStatusType.search:
          return _searchIvoices;
        default:
          return _allInvoices;
      }
    },
    [_allInvoices, _dueInvoices, _overdueInvoices, _paidInvoices, _searchIvoices]
  );

  const getShareLink = useCallback(async (invoice: Invoice, isChase: boolean, showFrom: string) => {
    try {
      setLoadingShareLink(true);
      const link = await invoiceService.getShareLink(invoice.invoiceId);
      setTimeout(() => {
        setShareLink({
          link,
          isChase,
          invoice,
          showFrom,
        });
      }, 250);
      setLoadingShareLink(false);
    } catch (error) {
      setLoadingShareLink(false);
      setErrorLoadShareLink(error as Error);
    }
  }, []);

  const clearShareLink = useCallback(() => {
    setShareLink(undefined);
  }, []);

  const getInvoiceDetail = useCallback(async (invoiceId: string) => {
    try {
      setLoadingInvoiceDetail(true);
      const { data } = await invoiceService.getInvoiceDetail(invoiceId);
      _setInvoiceDetail(data);
      setLoadingInvoiceDetail(false);
    } catch (error) {
      setLoadingInvoiceDetail(false);
      setErrorLoadInvoiceDetail(error as Error);
    }
  }, []);

  const clearInvoiceDetail = useCallback(async () => {
    _setInvoiceDetail(undefined);
  }, []);

  const setInvoiceDetail = useCallback((invoice: Invoice) => {
    _setInvoiceDetail(invoice);
  }, []);

  const updateInvoice = useCallback(
    async (
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
      status?: InvoiceStatusType,
      bankAccount?: BankAccountReference
    ) => {
      try {
        setUpdatingInvoice(true);
        await invoiceService.updateInvoice(
          invoiceId,
          invoiceDate,
          dueDate,
          currency,
          items,
          documents,
          description,
          extensions,
          invoiceReference,
          customer,
          undefined,
          bankAccount
        );
        const { data } = await invoiceService.getInvoiceDetail(invoiceId);
        const updatedStatus = data.status[0].key;
        _refreshInvoice(InvoiceStatusType.all);
        _refreshInvoice(status);
        if (updatedStatus !== status) {
          _refreshInvoice(updatedStatus);
        }
        setUpdatedInvoiceSuccess(true);
        setTimeout(() => {
          setUpdatedInvoiceSuccess(false);
        }, 100);
        setUpdatingInvoice(false);
        return data;
      } catch (error) {
        setUpdatingInvoice(false);
        setErrorUpdateInvoice(error as Error);
      }
      return undefined;
    },
    []
  );

  const updateInvoiceSubStatus = useCallback(
    async (invoice: Invoice) => {
      try {
        setUpdatingInvoice(true);
        let subStatus: InvoiceSubStatus[] = invoice.subStatus ?? [];
        if (isEmpty(invoice.subStatus)) {
          subStatus = [{ key: InvoiceSubStatusType.sent, value: true }];
        } else {
          const isChased = find(
            invoice.subStatus,
            (s) => s.key === InvoiceSubStatusType.chased && s.value
          );
          if (!isChased) {
            subStatus = [...subStatus, { key: InvoiceSubStatusType.chased, value: true }];
          } else {
            return;
          }
        }
        const customerReference = invoice?.customer
          ? {
              id: invoice?.customer?.id,
            }
          : undefined;
        const status = invoice.status[0].key;
        await invoiceService.updateInvoice(
          invoice.invoiceId,
          invoice.invoiceDate,
          invoice.dueDate,
          invoice.currency,
          invoice.items,
          invoice.documents,
          invoice.description,
          invoice.extensions,
          invoice.invoiceReference,
          customerReference,
          subStatus
        );
        setUpdatedSubStatusSuccess(true);
        _refreshInvoice(status);
        if (_invoiceDetail) {
          _setInvoiceDetail({
            ..._invoiceDetail,
            subStatus,
          });
        }
        setTimeout(() => {
          setUpdatedSubStatusSuccess(false);
        }, 100);
        setUpdatingInvoice(false);
      } catch (error) {
        setUpdatingInvoice(true);
        setErrorUpdateInvoice(error as Error);
      }
    },
    [_invoiceDetail, _allInvoices, _dueInvoices, _overdueInvoices, _paidInvoices, _searchIvoices]
  );

  const addPayment = useCallback(async (params: PaymentReference) => {
    try {
      setAddingPayment(true);
      await invoiceService.addPayment(params);
      getInvoiceDetail(params.invoiceId);
      setAddedPaymentSuccess(true);
      setTimeout(() => {
        setAddedPaymentSuccess(false);
      }, 100);
      setAddingPayment(false);
    } catch (error) {
      setAddingPayment(false);
      setErrorAddPayment(error as Error);
    }
  }, []);

  const getPaymentByInvoiceId = useCallback(async (invoiceId: string) => {
    try {
      setLoadingPayments(true);
      const { data } = await invoiceService.getPaymentByInvoiceId(invoiceId);
      setPayments(data);
      setLoadingPayments(false);
    } catch (error) {
      setLoadingPayments(false);
      setErrorLoadPayments(error as Error);
    }
  }, []);

  const clearPayments = useCallback(() => {
    setPayments([]);
  }, []);

  const updatePayment = useCallback(async (paymentId: string, params: PaymentReference) => {
    try {
      setUpdatingPayment(true);
      await invoiceService.updatePayment(paymentId, params);
      getInvoiceDetail(params.invoiceId);
      setUpdatedPaymentSuccess(true);
      setTimeout(() => {
        setUpdatedPaymentSuccess(false);
      }, 100);
      setUpdatingPayment(false);
    } catch (error) {
      setUpdatingPayment(false);
      setErrorUpdatePayment(error as Error);
    }
  }, []);

  const deletePayment = useCallback(async (paymentId: string, invoiceId: string) => {
    try {
      setDeletingPayment(true);
      await invoiceService.deletePayment(invoiceId, paymentId);
      getInvoiceDetail(invoiceId);
      setDeletedPaymentSuccess(true);
      setTimeout(() => {
        setDeletedPaymentSuccess(false);
      }, 100);
      setDeletingPayment(false);
    } catch (error) {
      setDeletingPayment(false);
      setErrorDeletePayment(error as Error);
    }
  }, []);

  const uploadDocument = useCallback(async (data: DocumentData) => {
    try {
      setUploadingDocument(true);
      const resp = await invoiceService.uploadDocument(
        data.content,
        data.contentType,
        data.type,
        data.name
      );
      setUploadingDocument(false);
      return {
        documentId: resp.data.id,
        documentName: data.name,
      };
    } catch (error) {
      setUploadingDocument(false);
      setErrorUploadDocument(error as Error);
    }
    return undefined;
  }, []);

  const getDocumentDetail = useCallback(async (documentId: string) => {
    try {
      const { data } = await invoiceService.documentDetail(documentId);
      return data;
    } catch (error) {
      if (__DEV__) {
        console.log('Fetch document detail failed');
      }
    }
    return undefined;
  }, []);

  const setDocuments = useCallback((documents: DocumentReference[]) => {
    _setDocuments(documents);
  }, []);

  const clearDocuments = useCallback(() => {
    _setDocuments([]);
  }, []);

  const createInvoice = useCallback(
    async (
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
      try {
        setCreatingInvoice(true);
        const { data } = await invoiceService.createInvoice(
          invoiceDate,
          dueDate,
          currency,
          items,
          documents,
          description,
          extensions,
          invoiceReference,
          customer,
          bankAccount
        );
        const invoice: Invoice = data[0];
        _refreshInvoice(InvoiceStatusType.all);
        _refreshInvoice(invoice.status[0].key);
        setCreatingInvoice(false);
        setCreatedInvoiceSuccess(true);
        setTimeout(() => {
          setCreatedInvoiceSuccess(false);
        }, 100);
        return invoice;
      } catch (error) {
        setCreatingInvoice(false);
        setErrorCreateInvoice(error as Error);
      }
      return undefined;
    },
    []
  );

  return useMemo(
    () => ({
      allInvoices: _allInvoices,
      dueInvoices: _dueInvoices,
      overdueInvoices: _overdueInvoices,
      paidInvoices: _paidInvoices,
      searchInvoices: _searchIvoices,
      clearErrors,
      getInvoices,
      refreshInvoices,
      getInvoiceDataByStatus,
      deleteInvoice,
      isDeletingInvoice: _isDeletingInvoice,
      errorDeleteInvoice: _errorDeleteInvoice,
      deletedInvoiceSuccess: _deletedInvoiceSuccess,
      getShareLink,
      isLoadingShareLink: _isLoadingShareLink,
      errorLoadShareLink: _errorLoadShareLink,
      shareLink: _shareLink,
      clearShareLink,
      getInvoiceDetail,
      clearInvoiceDetail,
      isLoadingInvoiceDetail: _isLoadingInvoiceDetail,
      invoiceDetail: _invoiceDetail,
      errorLoadInvoiceDetail: _errorLoadInvoiceDetail,
      updateInvoice,
      isUpdatedInvoiceSuccess: _updatedInvoiceSuccess,
      errorUpdateInvoice: _errorUpdateInvoice,
      isUpdatingInvoice: _isUpdatingInvoice,
      updateInvoiceSubStatus,
      clearSearchInvoices,
      isUpdatedSubStatusSuccess: _updatedSubStatusSuccess,
      addPayment,
      isAddedPaymentSuccess: _isAddedPaymentSuccess,
      isAddingPayment: _isAddingPayment,
      errorAddPayment: _errorAddPayment,
      getPaymentByInvoiceId,
      isLoadingPayments: _isLoadingPayments,
      payments: _payments,
      errorLoadPayment: _errorLoadPayments,
      clearPayments,
      updatePayment,
      isUpdatedPaymentSuccess: _updatedPaymentSuccess,
      errorUpdatePayment: _errorUpdatePayment,
      isUpdatingPayment: _isUpdatingPayment,
      deletePayment,
      isDeletingPayment: _isDeletingPayment,
      isDeletedPaymentSuccess: _deletedPaymentSuccess,
      errorDeletePayment: _errorDeletePayment,
      uploadDocument,
      isUploadingDocument: _isUploadingDocument,
      errorUploadDocument: _errorUploadDocument,
      getDocumentDetail,
      documents: _documents,
      setDocuments,
      clearDocuments,
      createInvoice,
      isCreatingInvoice: _isCreatingInvoice,
      isCreatedInvoiceSuccess: _isCreatedInvoiceSuccess,
      errorCreateInvoice: _errorCreateInvoice,
      setInvoiceDetail,
    }),
    [
      _isCreatingInvoice,
      _isCreatedInvoiceSuccess,
      _errorCreateInvoice,
      _documents,
      _errorUploadDocument,
      _isUploadingDocument,
      _isDeletingPayment,
      _deletedPaymentSuccess,
      _errorDeletePayment,
      _updatedPaymentSuccess,
      _errorUpdatePayment,
      _isUpdatingPayment,
      _isLoadingPayments,
      _payments,
      _errorLoadPayments,
      _isAddedPaymentSuccess,
      _isAddingPayment,
      _errorAddPayment,
      _updatedInvoiceSuccess,
      _errorUpdateInvoice,
      _isUpdatingInvoice,
      _allInvoices,
      _dueInvoices,
      _overdueInvoices,
      _paidInvoices,
      _searchIvoices,
      _isDeletingInvoice,
      _errorDeleteInvoice,
      _deletedInvoiceSuccess,
      _isLoadingShareLink,
      _errorLoadShareLink,
      _shareLink,
      _isLoadingInvoiceDetail,
      _invoiceDetail,
      _errorLoadInvoiceDetail,
      _updatedSubStatusSuccess,
    ]
  );
}
