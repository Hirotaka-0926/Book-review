export interface User {
  email: string;
  password: string;
  name: string;
}

export interface Book {
  id?: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer?: string;
}
