import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", { name, username, password });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
      console.error(err);
      // throw err.response?.data || { message: err.message };
    }
  };

   const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", { 
        username :username,
         password: password });

       


      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
        // setUserData({ username: response.data.username, name: response.data.name });
      }
    } catch (err) {
      throw err;
      console.error(err);
      // throw err.response?.data || { message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, handleRegister, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
