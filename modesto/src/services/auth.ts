import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json",
  },
});

interface AuthPayload {
  name: string;
  email: string;
  password: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data; 
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (userData: AuthPayload) => {
  try {
    const response = await api.post("/signup", userData);
    return response.data; 
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
