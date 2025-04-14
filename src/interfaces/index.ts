import axios from "axios";

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
