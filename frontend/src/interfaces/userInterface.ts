export interface User {
  id: string;
  token: string;
  username: string;
}
export interface Editor {
  _id: string;
  username: string;
  pass: string;
  email: string;
  external: boolean;
}
export interface Admin {
  id: string;
  username: string;
  admin: boolean;
}
