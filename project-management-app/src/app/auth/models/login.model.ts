export interface ILoginForm {
  id: string;
  formControlName: string;
  type: string;
  messageError: {
    email?: string;
    required?: string;
    regEx?: string;
  };
}
