declare interface IProductCard {
  src: string;
  alt: string;
  title: string | undefined;
  description: string | undefined;
  like: boolean;
}

declare interface ICard {
  cardData: IProductCard | IFormCardStore;
}

declare interface IIcon {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  color?: string;
}

declare interface IFormFieldsRef {
  inputName: React.RefObject<HTMLInputElement> | undefined;
  inputBirthday: React.RefObject<HTMLInputElement> | undefined;
  inputFile: React.RefObject<HTMLInputElement> | undefined;
  inputCountry: React.RefObject<HTMLSelectElement> | undefined;
  inputMale: React.RefObject<HTMLInputElement> | undefined;
  inputFemale: React.RefObject<HTMLInputElement> | undefined;
  inputNotification: React.RefObject<HTMLInputElement> | undefined;
}

declare interface IFormFields {
  inputName: string | undefined;
  inputBirthday: string | undefined;
  inputFile: string | undefined;
  inputCountry: string | undefined;
  inputMale: boolean | null | undefined;
  inputFemale: boolean | null | undefined;
  inputNotification: boolean | null | undefined;
}

declare interface IFormCardStore extends IFormFields {
  fixedFilePath: string | ArrayBuffer | null;
}

declare interface IFormWarnings {
  inputBirthday: string;
  inputName: string;
  inputFile: string;
}

declare interface IFormState {
  fields: IFormFields;
  fixedFilePath: string | ArrayBuffer | null;
  cardsStore: IFormCardStore[];
  warnings: IFormWarnings;
  isValid: boolean;
  // isDisable: boolean;
}

declare type CardType = 'product' | 'form';
