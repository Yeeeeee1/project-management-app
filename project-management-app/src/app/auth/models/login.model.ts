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
export interface IUser {
 login: string;
  password: string;
}
export interface ILogin {
  token: string;
}
