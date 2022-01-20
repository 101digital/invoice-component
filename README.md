# invoice-component

Manage user's invoice

## Table Of Content

- [Features](#features)
- [List of Components](#list-of-components)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Init API Service](#init-api-service)
  - [Init Component Provider](#init-component-provider)
  - [Assets And Multiple Languages](#assets-and-multiple-languages)
- [API Reference](#api-reference)
  - [InvoiceService](#invoiceservice)
  - [InvoiceContext](#invoicecontext)
- [InvoiceActionSheetComponent](#invoiceactionsheetcomponent)
- [CreateInvoiceComponent](#createinvoicecomponent)
- [InvoiceAttachmentComponent](#invoiceattachmentcomponent)
- [InvoiceDetailComponent](#invoicedetailcomponent)
- [InvoiceListComponent](#invoicelistcomponent)
- [InvoicePaymentComponent](#invoicepaymentcomponent)
- [InvoiceSearchComponent](#invoicesearchcomponent)

## Features

- Display all invoice data
- Search and filter invoice
- Create/Edit/Delete invoice
- Make a payment
- Share/send reminder

## List of Components

- [InvoiceListComponent](src/components/invoice-list-component)
- [CreateInvoiceComponent](src/components/create-invoice-component)
- [InvoiceDetailComponent](src/components/invoice-detail-component)
- [InvoicePaymentComponent](src/components/invoice-payment-component)
- [InvoiceSearchComponent](src/components/invoice-search-component)
- [InvoiceAttachmentComponent](src/components/invoice-attachment-component)
- [InvoiceActionSheetComponent](src/components/invoice-action-sheet)
- [MoneyBoxComponent](src/components/money-box-component)

## Installation

Open a Terminal in your project's folder and run the command to install latest version

```sh
yarn add https://github.com/101digital/invoice-component.git
```

You can install specific [version](https://github.com/101digital/invoice-component/tags) by add `#version` in the end of repository url, example

```sh
yarn add https://github.com/101digital/invoice-component.git#1.0.1
```

This component have some dependencies packages, please make sure you installed them before using this component

- [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)
- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
- [react-native-pager-view](https://github.com/callstack/react-native-pager-view)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [react-native-share](https://github.com/react-native-share/react-native-share)
- [react-native-tab-view](https://github.com/satya164/react-native-tab-view)

## Quick Start

### Init API Service

- `InvoiceService` should be initiated from `App.ts`

```javascript
import { InvoiceService } from 'invoice-component';

InvoiceService.instance().initClients({
  invoiceClient: createAuthorizedApiClient(invoice, true),
  invoiceWebUrl: pay101Web,
  documentClient: createAuthorizedApiClient(document),
});
```

You can init some other values from `initClients` or set them later.

```javascript
type InvoiceClient = {
  webTemplateName?: string,
  downloadTemplateName?: string,
  maxFilterAmount?: number,
  maxCreateAmount?: number,
  minAmount?: number,
  paymentTypes?: PaymentType[],
  defaultDueDate?: number,
  maxDocumentSize?: number,
  documentTypes?: string[],
};
```

### Init Component Provider

- Wrapped the app with `InvoiceProvider`

```javascript
import { InvoiceProvider } from 'invoice-component';

const App = () => {
  return (
    <View>
      <InvoiceProvider>{/* YOUR APP COMPONENTS */}</InvoiceProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props into each component

- In order to do multiple languages, you need to configurate `i18n` for [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git). And then, you have to copy and paste all fields and values in [texts](src/invoice-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.

## API Reference

### InvoiceService

The `InvoiceService` manages all requests to BE for invoice services and document service. In addition, you can set/get some values used for handling business. To access the function/values of `InvoiceService`, get the invoice service's instance, like that `InvoiceService.instance()`

<b>The functions to connect to API</b>

- `getInvoices(params?: InvoiceParam)`: get all invoice by params. You can use to filter invoices also
- `deleteInvoice(invoiceId: string)`: delete an invoice by invoice's id
- `getShareLink(invoiceId: string)`: get share link of an invoice by invoice's id. You can change template by function `setTemplates`
- `getInvoiceDetail(invoiceId: string)`: get invoice details by invoice's id
- `updateInvoice(invoiceId: string, invoiceDate: string, dueDate: string, currency: string, items: ItemInvoiceReference[], documents: DocumentReference[], description: string, extensions: Extension[], invoiceReference?: string, customer?: { id: string; }, subStatus?: InvoiceSubStatus[], bankAccount?: BankAccountReference)`: Update an invoice by invoice's id
- `createInvoice(invoiceDate: string, dueDate: string, currency: string, items: ItemInvoiceReference[], documents: DocumentReference[], description: string, extensions: Extension[], invoiceReference?: string, customer?: { id: string; }, subStatus?: InvoiceSubStatus[], bankAccount?: BankAccountReference)`: Create new invoice
- `addPayment(params: PaymentReference)`: Add new payment for an invoice
- `getPaymentByInvoiceId(invoiceId: string)`: Get all payment history of an invoice by invoice's id
- `updatePayment(paymentId: string, params: PaymentReference)`: Update a payment
- `deletePayment(invoiceId: string, paymentId: string)`: Delete a payment by invoice's id and payment's id
- `uploadDocument(content: string, contentType: string, type: string, name: string)`: Upload new document, the document data should be base64 format
- `documentDetail(documentId: string)`: Get document data by document's id

<b>The functions to change the default values</b>

| Name                 | Default value                                                                                                            | Set                | Get                |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------- | :----------------- | :----------------- |
| webTemplateName      | 101Pay-html-template-v1.0                                                                                                | setTemplates       |                    |
| downloadTemplateName | 101Pay-pdf-template-v1.0                                                                                                 | setTemplates       |                    |
| maxFilterAmount      | 10000                                                                                                                    | setMaxFilterAmount | getMaxMinAmount    |
| maxCreateAmount      | 1000000000                                                                                                               | setMaxCreateAmount | getMaxMinAmount    |
| minAmount            | 0                                                                                                                        | setMinAmount       | getMaxMinAmount    |
| paymentTypes         | Cash, Bank Transfer, Cheque, Gift Certificate,POS - Visa, POS - Mastercard, POS - AMEX, POS - Other CC/DC, POS - Voucher | getPaymentTypes    | setPaymentTypes    |
| defaultDueDate       | 15                                                                                                                       | setDefaultDueDate  | getDefaultDueDate  |
| maxDocumentSize      | 2097151                                                                                                                  | setMaxDocumentSize | getMaxDocumentSize |
| documentTypes        | 'jpeg', 'jpg', 'png', 'heic'                                                                                             | setDocumentTypes   | getDocumentTypes   |

### InvoiceContext

The `InvoiceContext` get access to current states of invoice component. You can see them in [InvoiceContextData](src/context/invoice-context.ts)

## InvoiceActionSheetComponent

The component show bottom sheet modal with options: `Edit invoice`, `Delete invoice`, `Share invoice`. You need pass and invoice model into this component and base on invoice's status, the button `Edit invoice`, `Delete invoice` can be enabled or disabled

- Props, styles and component can be found [here](src/components/action-button-component/types.ts)

- Example

```javascript
import { InvoiceActionSheetComponent, Invoice } from 'invoice-component';

const InvoiceListScreen = ({ navigation }: SelectBankScreenProps) => {
  const [invoice, setInvoice] = (useState < Invoice) | (undefined > undefined);
  return (
    <InvoiceActionSheetComponent
      isVisible={invoice !== undefined && !isConfirmDelete}
      status={invoice?.status[0].key ?? ''}
      subStatus={invoice?.subStatus}
      onShareInvoice={() => {
        // handle share invoice
      }}
      onEditInvoice={() => {
        // handle edit invoice
      }}
      onDeleteInvoice={() => {
        // handle delete invoice
      }}
      onClose={() => {
        setInvoice(undefined);
      }}
      onChaseInvoice={() => {
        // handle chase invoice
      }}
    />
  );
};
```

## CreateInvoiceComponent

The component to create/edit invoice with user's input information

- Props, styles and component can be found [here](src/components/create-invoice-component/types.ts)

- Example

```javascript
import {
  CreateInvoiceComponent,
  CreateInvoiceComponentRefs,
  BankAccountReference,
} from 'invoice-component';

const InvoiceCreateComponentScreen = ({ route, navigation }: InvoiceCreateComponentScreenProps) => {
  const invoiceId = route.params?.invoiceId;
  const createComponentRefs = useRef<CreateInvoiceComponentRefs>();
  const { getDefaultWallet } = useContext(WalletContext);
  const { colors } = useContext(ThemeContext);

  const getBankDetail = (): BankAccountReference | undefined => {
    const defaultWallet = getDefaultWallet();
    if (defaultWallet) {
      return {
        bankId: defaultWallet.bankAccount.bankCode,
        sortCode: defaultWallet.bankAccount.bankBranchId ?? '',
        accountNumber: defaultWallet.bankAccount.accountNumber,
        accountName: defaultWallet.bankAccount.accountHolderName,
      };
    }
    return undefined;
  };

  return (
    <CreateInvoiceComponent
      invoiceId={invoiceId}
      ref={createComponentRefs} // this ref can be used to update the customer information
      bankAccount={getBankDetail()} // this is optional. You can pass bank's information to this props
      currencyCode='EUR'
      onGoBack={() => {
        navigation.goBack();
      }}
      onSearchCustomer={() => {
        navigation.navigate(Route.CUSTOMER_LIST_COMPONENT, {
          onSelectedCustomer: (customer) => {
            createComponentRefs?.current?.updateCustomer({
              id: customer.id,
              name: customer.name,
              dueDatePeriod: customer.dueDatePeriod,
            });
          },
          editable: false,
        });
      }}
      onAttachDocument={() => {
        // handle to attachment screen
      }}
      onCreatedInvoice={(invoice) => {
        // callback when creating successfully
      }}
      onUpdatedInvoice={(invoice) => {
        // callback when updating successfully
      }}
    />
  );
};
```

## InvoiceAttachmentComponent

Attach the documents into the invoice. Support select image from camera and gallery

- Props, styles and component can be found [here](src/components/invoice-attachment-component/types.ts)

- Example

```javascript
import { InvoiceAttachmentComponent } from 'invoice-component';

const InvoiceAttachmentComponentScreen = ({ route }: InvoiceAttachmentComponentScreenProps) => {
  const { editable } = route.params;

  return <InvoiceAttachmentComponent editable={editable} />;
};
```

## InvoiceDetailComponent

Display details of an invoice

- Props, styles and component can be found [here](src/components/invoice-detail-component/types.ts)

- Example

```javascript
import { InvoiceDetailComponent, Invoice } from 'invoice-component';

const InvoiceDetailComponentScreen = ({ navigation, route }: InvoiceDetailComponentScreenProps) => {
  const { invoiceId } = route.params;
  const invoice = route.params.invoice;

  return (
    <InvoiceDetailComponent
      invoiceId={invoiceId}
      invoice={invoice} // if pass all details, the InvoiceDetailComponent won't refresh
      onBackPressed={() => {
        navigation.goBack();
      }}
      onViewAttachments={() => {
        // handle view invoice atatchments
      }}
      onViewPayments={(_invoice) => {
        // handle view payment history
      }}
    />
  );
};
```

## InvoiceListComponent

Display all invoice by invoice's status and grouped by invoice date

- Props, styles and component can be found [here](src/components/invoice-list-component/types.ts)

- Example

```javascript
import { InvoiceListComponent } from 'invoice-component';

const InvoiceListComponentScreen = ({ navigation }: InvoiceListComponentScreenProps) => {
  return (
    <InvoiceListComponent
      onInvoiceDetail={(invoiceId) => {
        // handle view invoice details
      }}
      onSearchInvoice={() => {
        // handle to search invoice
      }}
      onCreateInvoice={() => {
        // handle to create invoice
      }}
      onEditInvoice={(invoiceId) => {
        // handle to edit invoice
      }}
    />
  );
};
```

## InvoicePaymentComponent

Add new payment for an invoice, view payment history

- Props, styles and component can be found [here](src/components/invoice-payment-component/types.ts)

- Example

```javascript
import { InvoicePaymentComponent, Invoice } from 'invoice-component';

const InvoicePaymentComponentScreen = ({ route }: InvoicePaymentComponentScreenProps) => {
  const { invoice } = route.params;

  return <InvoicePaymentComponent invoice={invoice} />;
};
```

## InvoiceSearchComponent

Search and filter invoice

- Props, styles and component can be found [here](src/components/invoice-search-component/types.ts)

- Example

```javascript
import { InvoiceSearchComponent } from 'invoice-component';

const InvoiceSearchComponentScreen = ({ navigation }: InvoiceSearchComponentScreenProps) => {
  return (
    <InvoiceSearchComponent
      currencyCode='EUR'
      onBackPressed={navigation.goBack}
      onInvoiceDetail={(invoiceId) => {
        // handle to invoice detail
      }}
      onEditInvoice={(invoiceId) => {
        // handle to edit invoice
      }}
    />
  );
};
```
