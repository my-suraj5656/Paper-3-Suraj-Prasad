import React, { use } from "react";
import { useForm } from "react-hook-form";
import "../assets/css/login.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const signupSchema = yup.object().shape({
    fullname: yup.string().required("*Full name is mandatory"),
    phone: yup
      .string()
      .required("*Phone is mandatory")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("*Email is mandatory"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .required("*Password is mandatory"),
    role: yup.string().required("A user role is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signup",
        data
      );
      alert(res.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center">Signup Form</h2>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("fullname")} placeholder="fullname" />
        {errors.fullname && (
          <span style={{ color: "red" }}>{errors.fullname.message}</span>
        )}

        <input type="text" {...register("phone")} placeholder="phone" />
        {errors.phone && (
          <span style={{ color: "red" }}>{errors.phone.message}</span>
        )}

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

        <div className="d-flex gap-2 justify-content-center">
          <label>
            <input type="radio" value="user" {...register("role")} />
            user
          </label>

          <label>
            <input type="radio" value="organizer" {...register("role")} />
            organizer
          </label>
        </div>
        {errors.role && (
          <span style={{ color: "red" }}>{errors.role.message}</span>
        )}

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </div>
  );
}

export default Login;
