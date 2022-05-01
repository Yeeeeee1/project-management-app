export interface IEditForm {
  id: string;
  label: string;
  formControlName: string;
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
