export interface IRegForm {
  id: string;
  formControlName: string;
  name?: string;
  type: string;
  messageError: {
    email?: string;
    required?: string;
    regEx?: string;
    confirm?: string;
    minLength?: string;
    maxLength?: string;
  };
}
