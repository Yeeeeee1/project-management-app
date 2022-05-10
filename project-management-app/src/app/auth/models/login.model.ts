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
  name?: string;
  login: string;
  password: string;
}
export interface ILogin {
  token: string;
}
export interface IUpdateUser {
  id: string;
  login: string;
  password?: string;
  name?: string;
}
