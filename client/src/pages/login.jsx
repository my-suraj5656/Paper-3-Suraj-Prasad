import React from "react";
import { useForm } from "react-hook-form";
import "../assets/css/login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import { apiKey } from "../App";

function Login() {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const loginschema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("*Email is mandatory"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .required("*Password is mandatory"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginschema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${apiKey}/api/user/login`,
        data
      );
      const result = res.data;
      console.log(result);
      
      setToken(result.data.token, result.data.id, result.data.role);

      alert(result.message);
      reset();
      navigate("/event");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-center">Login Form</h2>

        <form className="App" onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}

          <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
        </form>
      </div>
    </>
  );
}

export default Login;
