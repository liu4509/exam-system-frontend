import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { RegisterUser } from "../page/Register";
import { UpdatePassword } from "../page/UpdatePassword";
import { message } from "antd";

const userServiceInstance = axios.create({
  baseURL: "http://localhost:3001/",
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
// 拦截器添加
userServiceInstance.interceptors.request.use(requestInterceptor);

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

userServiceInstance.interceptors.response.use(
  responseIntercepor,
  responseErrorIntercepor
);

export async function login(username: string, password: string) {
  return await userServiceInstance.post("/login", {
    username,
    password,
  });
}

export async function registerCaptcha(email: string) {
  return await userServiceInstance.get("/register-captcha", {
    params: {
      address: email,
      ttl: 130,
    },
  });
}
export async function register(registerUser: RegisterUser) {
  return await userServiceInstance.post("/register", registerUser);
}

export async function forgotCaptcha(email: string) {
  return await userServiceInstance.get("/forgot_password/captcha", {
    params: {
      address: email,
      ttl: 130,
    },
  });
}
export async function forgotPassword(updatePassword: UpdatePassword) {
  return await userServiceInstance.post("/forgot_password", updatePassword);
}
