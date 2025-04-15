import axios from "axios";
import { RegisterUser } from "../page/Register";

const userServiceInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 3000,
});

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
