const baseUrl = process.env.VITE_API_URL;
import { User } from "../type/type";

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
  const testToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczNTE2MDYsImlhdCI6MTczNzI2NTIwNiwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiZGQyNmM1ZmYtMTFkMC00M2Q5LThkMzYtZTk4ZTRmZTUyNDQ3In0.Lf4Rvri6rMdX5l7JbGtk7WYgRJyRd1wOSzofpdO118g";
  const option = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${testToken}`,
    },
    body: formData,
  };
  const response = await fetch(`${baseUrl}/uploads`, option);
  return response;
};
