import React, { ReactNode } from 'react';
import { InvoiceContext, useInvoiceContextValue } from './invoice-context';

export type InvoiceProviderProps = {
  children: ReactNode;
};

const InvoiceProvider = (props: InvoiceProviderProps) => {
  const { children } = props;
  const invoiceContextData = useInvoiceContextValue();

  return <InvoiceContext.Provider value={invoiceContextData}>{children}</InvoiceContext.Provider>;
};

export default InvoiceProvider;
