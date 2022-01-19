export class AddReferenceData {
  constructor(readonly reference: string) {}

  static init(reference?: string): AddReferenceData {
    return new AddReferenceData(reference || '');
  }
}
