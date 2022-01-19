# invoice-component

Manage user's invoice

## Features

- Display all invoice data
- Search and filter invoice
- Create/Edit/Delete invoice
- Make an invoice payment
- Share/send reminder

## List of Components

- [InvoiceListComponent](src/components/invoice-list-component)
- [CreateInvoiceComponent](src/components/create-invoice-component)
- [InvoiceDetailComponent](src/components/invoice-detail-component)
- [InvoicePaymentComponent](src/components/invoice-payment-component)
- [InvoiceSearchComponent](src/components/invoice-search-component)
- [InvoiceAttachmentComponent](src/components/invoice-attachment-component)
- [MoneyBoxComponent](src/components/item-shimmer-component)
- [InvoiceActionSheet](src/components/invoice-action-sheet)

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

CustomerService.instance().initClients({
  invoiceClient: createAuthorizedApiClient(invoice, true),
  invoiceWebUrl: pay101Web,
  documentClient: createAuthorizedApiClient(document),
});
```

You can init some default values from `initClients` or set them later.

```javascript
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
