import axios, { HttpStatusCode } from "axios";
import { BookType, SearchBookType } from "../pages/BookManage";
import { CreateBookType } from "../pages/BookManage/addEditModel";
import { message } from "antd";

type ResponseType = {
  statusCode: HttpStatusCode;
  data: unknown;
  message: string;
};

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3001",
  timeout: 3000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    message.error(err.response.data.message);
    return Promise.reject(err.response.data as ResponseType);
  }
);

export const registerApi = (username: string, password: string) => {
  return axiosInstance.post("/user/registry", { username, password });
};

export const loginApi = (username: string, password: string) => {
  return axiosInstance.post("/user/login", { username, password });
};

export const searchBooksApi = (params?: SearchBookType) => {
  return axiosInstance.get<SearchBookType, BookType[]>("/book/list", {
    params,
  });
};

export const createBook = (data: CreateBookType) => {
  return axiosInstance.post<CreateBookType, BookType>("/book/add", data);
};
export const findBook = (id: number) => {
  return axiosInstance.get<number, BookType>(`/book/${id}`);
};

export const updateBook = (data: BookType) => {
  return axiosInstance.post<BookType, number>("/book/update", data);
};

export const deleteBookItem = (id: number) => {
  return axiosInstance.post<number, number>(`/book/delete/${id}`);
};
