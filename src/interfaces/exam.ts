import { message } from "antd";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ExamAdd } from "../page/ExamList/ExamAddModal";

const examServiceInstance = axios.create({
  baseURL: "http://localhost:3002/",
  timeout: 3000,
});

// 获取本地存储 token
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
};
// 请求拦截器添加
examServiceInstance.interceptors.request.use(requestInterceptor);

// 获取最新的token 本地持久化
const responseIntercepor = (response: AxiosResponse) => {
  const newToken = response.headers["token"];
  if (newToken) {
    localStorage.setItem("token", newToken);
  }
  return response;
};

const responseErrorIntercepor = async (error: any) => {
  if (!error.response) {
    return Promise.reject(error);
  }

  const { data } = error.response;
  if (data.statusCode === 401) {
    message.error(data.message);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } else {
    return Promise.reject(error);
  }
};

// 响应拦截器添加
examServiceInstance.interceptors.response.use(
  responseIntercepor,
  responseErrorIntercepor
);

export async function examList() {
  return await examServiceInstance.get("/list");
}

export async function examAdd(values: ExamAdd) {
  return await examServiceInstance.post("/add", values);
}
