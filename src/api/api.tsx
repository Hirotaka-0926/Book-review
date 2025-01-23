const baseUrl = process.env.VITE_API_URL;
import { User, Book } from "../type/type";

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

export const getProfile = async (token: string) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${baseUrl}/users`, option);
  return response;
};

export const updateProfile = async (name: string, token: string) => {
  const option = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  };
  const response = await fetch(`${baseUrl}/users`, option);
  return response;
};

export const putNewBook = async (data: Book, token: string) => {
  const option = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    }),
  };
  const response = await fetch(`${baseUrl}/books`, option);

  return response;
};

export const getBook = async (token: string, id: string) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    id: id,
  };
  const response = await fetch(`${baseUrl}/books/${id}`, option);
  return response;
};
