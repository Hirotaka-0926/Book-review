const baseUrl = process.env.VITE_API_URL;
import { User } from "../type/type";
import { Book } from "../type/type";

export const signUp = async (data: User) => {
  const header = {
    method: "POST",
    body: JSON.stringify(data),
  };
  const response = await fetch(`${baseUrl}/users`, header);
  return response;
};

export const logIn = async (email: string, password: string) => {
  const header = {
    method: "POST",
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${baseUrl}/signin`, header);

  return response;
};

export const uploadIcon = async (icon: File, token: string) => {
  const formData = new FormData();
  formData.append("icon", icon);
  const option = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  const response = await fetch(`${baseUrl}/uploads`, option);
  return response;
};

export const getBooks = async (count: number) => {
  const response = await fetch(`${baseUrl}/public/books?offset=${count}`);
  return response;
};
